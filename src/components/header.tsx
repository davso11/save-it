'use client';

import Link from 'next/link';
import { BookMarked, LogOut, User2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { getNameFirstLetters } from '~/lib/utils';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export const Header = () => {
  const { data: session } = useSession();

  const logoutHandler = async () => {
    await toast.promise(
      signOut({
        callbackUrl: '/sign-in',
      }),
      {
        loading: 'Déconnexion en cours...',
        success: 'Vous êtes déconnecté(e)',
        error: 'Erreur survenue',
      },
    );
  };

  return (
    <header>
      <nav className="flex justify-between py-6">
        {/* LOGO */}
        <Link
          href="/home"
          className="flex items-center gap-x-1"
        >
          <BookMarked strokeWidth={2.5} />
          <h1 className="logo-title">SaveIt</h1>
        </Link>

        {/* AUTH BUTTON */}
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                pill
                size="icon"
                variant="secondary"
              >
                {session.user.name
                  ? getNameFirstLetters(...session.user.name.split(' '))
                  : ''}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>
                {session.user.name ? session.user.name : 'Mon compte'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutHandler}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </nav>
    </header>
  );
};
