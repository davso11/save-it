import { BookMarked } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Main } from '~/components/main';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <>
      <div className="flex cursor-default items-center gap-x-1 py-6">
        <BookMarked strokeWidth={2.5} />
        <h1 className="logo-title">SaveIt</h1>
      </div>
      <Main>{children}</Main>
    </>
  );
};

export default AuthLayout;
