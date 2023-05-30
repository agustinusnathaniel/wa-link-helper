'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/lib/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import { Input } from '@/lib/components/ui/input';
import { useToast } from '@/lib/components/ui/use-toast';

const formSchema = z.object({
  country_code: z.string().min(1),
  phone_number: z.string().min(1),
  text: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

const Home: NextPage = () => {
  const { toast } = useToast();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country_code: '62',
      phone_number: '',
      text: '',
    },
  });

  const [countryCode, phoneNumber, text] = form.watch([
    'country_code',
    'phone_number',
    'text',
  ]);

  const generatedLink = React.useMemo(() => {
    const number = `${countryCode}${phoneNumber?.replace(/^0+/, '')}`;
    const encodedText = text?.length ? encodeURIComponent(text) : '';
    const message = encodedText ? `?text=${encodedText}` : '';

    return `https://wa.me/${number}${message}`;
  }, [countryCode, phoneNumber, text]);

  const { isValid } = form.formState;

  const handleSubmit = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: 'Copied Link',
      description: generatedLink,
    });
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-2xl md:text-3xl">WhatsApp Link Tools</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid w-60 gap-6 text-start"
        >
          <FormField
            control={form.control}
            name="country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text (optional)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isValid}>
            Copy Link
          </Button>
        </form>
      </Form>

      <Button variant="link" asChild disabled={!isValid} hidden={!isValid}>
        <a href={generatedLink} target="_blank" rel="noopener noreferrer">
          {isValid ? generatedLink : null}
        </a>
      </Button>
    </div>
  );
};

export default Home;
