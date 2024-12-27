import { ReactNode } from 'react';

import Header from './components/Header';

type Props = {
  children: ReactNode;
};

export default function PrimaryLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
