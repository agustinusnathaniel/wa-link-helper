/* eslint-disable react/no-array-index-key */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/lib/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/lib/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import { Input } from '@/lib/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover';
import { useToast } from '@/lib/components/ui/use-toast';
import {
  countryCodeOptions,
  getPhoneCountryCode,
} from '@/lib/pages/home/utils';
import { cn } from '@/lib/utils';

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
      country_code: 'ID',
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
    const phoneCountryCode = getPhoneCountryCode(countryCode);
    const number = `${phoneCountryCode}${phoneNumber?.replace(/^0+/, '')}`;
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

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? countryCodeOptions?.find(
                              (option) => option.value === field.value
                            )?.label
                          : 'Select Country'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-min-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search country code..." />
                      <CommandEmpty>No Country Found.</CommandEmpty>
                      <CommandGroup>
                        {countryCodeOptions?.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.label}
                            onSelect={() =>
                              form.setValue('country_code', option.value)
                            }
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                option.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
