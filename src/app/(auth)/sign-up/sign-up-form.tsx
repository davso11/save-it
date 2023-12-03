'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { newUserSchema, TNewUserProps } from '~/lib/validators/user';
import { createUser } from '~/actions';

export const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<TNewUserProps>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const submitHandler = async (data: TNewUserProps) => {
    setPending(true);
    const response = await createUser(data);
    setPending(false);

    if (response.ok) {
      toast.success('Inscription effectuée');
      setTimeout(() => {
        router.push('/sign-in');
      }, 1000);
    } else if (response.name === 'DuplicateEmailError') {
      toast.error(response.message);
    } else {
      toast.error('Erreur interne du serveur');
    }
  };

  return (
    <Form {...form}>
      <div className="mb-6 space-y-1">
        <h2 className="title">Inscrivez-vous</h2>
        <p className="desc">C'est ici que tout commence</p>
      </div>
      <form
        autoComplete="off"
        className="flex flex-col gap-y-6"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-x-4 gap-y-6 sm:flex-row">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-[1.5]">
                <FormLabel required>Nom</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-[2.5]">
                <FormLabel required>Prénoms</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Mot de passe</FormLabel>
              <FormControl>
                <div className="flex gap-x-2">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    disabled={pending}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="shrink-0"
                    onClick={() => setShowPassword((c) => !c)}
                    disabled={pending}
                  >
                    {showPassword ? (
                      <Eye
                        size={20}
                        className="cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        size={20}
                        className="cursor-pointer"
                      />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-2 self-start"
          disabled={pending}
        >
          S'inscrire
        </Button>
      </form>
    </Form>
  );
};
