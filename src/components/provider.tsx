'use client';

import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '~/components/ui/tooltip';
import { AppShell } from './app-shell';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <AppShell>{children}</AppShell>
      <Toaster
        position="top-center"
        containerStyle={{
          fontSize: 14,
          lineHeight: 20,
        }}
      />
    </TooltipProvider>
  );
};
