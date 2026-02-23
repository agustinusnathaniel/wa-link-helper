'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/lib/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
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
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { Textarea } from '@/lib/components/ui/textarea';
import { countryCodeOptions } from '@/lib/pages/home/utils';
import { cn } from '@/lib/styles/utils';

const formSchema = z.object({
  country_code: z.string().min(1),
  phone_number: z.string().min(1),
  text: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

const Home: NextPage = () => {
  const [isCountryCodePopoverOpen, setIsCountryCodePopoverOpen] =
    React.useState<boolean>(false);

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
    const parsedPhoneNumber = parsePhoneNumber(phoneNumber, {
      regionCode: countryCode,
    });
    const encodedText = text?.length ? encodeURIComponent(text) : '';
    const message = encodedText ? `?text=${encodedText}` : '';

    return `https://wa.me/${encodeURIComponent(parsedPhoneNumber.number?.e164 ?? '')}${message}`;
  }, [countryCode, phoneNumber, text]);

  const { isValid } = form.formState;

  const handleSubmit = () => {
    navigator.clipboard.writeText(generatedLink);
    toast('Copied Link', {
      description: generatedLink,
    });
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center">
      <Card className="w-full md:w-[80%]">
        <CardHeader>
          <CardTitle className="font-bold text-2xl md:text-3xl">
            WhatsApp Link Helper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="grid gap-6 text-start"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="country_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>

                    <Popover
                      onOpenChange={setIsCountryCodePopoverOpen}
                      open={isCountryCodePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                            role="combobox"
                            variant="outline"
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

                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Search country code..." />
                          <CommandEmpty>No Country Found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
                              {countryCodeOptions?.map((option) => (
                                <CommandItem
                                  key={option.label}
                                  onSelect={() => {
                                    form.setValue('country_code', option.value);
                                    setIsCountryCodePopoverOpen(false);
                                  }}
                                  value={option.label}
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
                            </ScrollArea>
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={!isValid} type="submit">
                Copy Link
              </Button>
            </form>
          </Form>

          <Button
            asChild
            className="w-full text-wrap break-all"
            disabled={!isValid}
            hidden={!isValid}
            variant="link"
          >
            <a href={generatedLink} rel="noopener noreferrer" target="_blank">
              {isValid ? generatedLink : null}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
