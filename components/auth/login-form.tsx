
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";

import { CardWrapper } from "@/components/auth/card-wrapper";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";

export const LoginForm = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="Welcom back"
      backButtonHref="/auth/register"
      backButtonLabel="Create an account"
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(() => {})}
          className="space-y-6"
          >
            <div className="space-y-4">
              <FormField 
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        placeholder="johdoe@example.com"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
      </Form>
    </CardWrapper>
  );
};
