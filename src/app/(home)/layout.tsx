import { Header } from '~/components/header';
import { Main } from '~/components/main';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default HomeLayout;
