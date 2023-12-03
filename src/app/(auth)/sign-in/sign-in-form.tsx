'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
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
import { credentialSchema, TCredentialProps } from '~/lib/validators/user';

export const SignInForm = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirect = useSearchParams().get('callbackUrl') ?? '/home';

  const form = useForm<TCredentialProps>({
    resolver: zodResolver(credentialSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = async ({ email, password }: TCredentialProps) => {
    setPending(true);
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setPending(false);
    if (!response?.ok) {
      toast.error('Email ou mot de passe incorrect');
      return;
    }
    toast.success(`Authentification réussie`);
    router.replace(redirect);
  };

  return (
    <Form {...form}>
      <div className="mb-6 space-y-1">
        <h2 className="title">Connectez-vous</h2>
        <p className="desc">Pour avoir accès à votre compte</p>
      </div>
      <form
        autoComplete="off"
        className="flex flex-col gap-y-6"
        onSubmit={form.handleSubmit(submitHandler)}
      >
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
          Se connecter
        </Button>
      </form>
    </Form>
  );
};
