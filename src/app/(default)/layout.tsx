import { Searchbar } from '@/components/searchbar';
import { Suspense } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div>오류가 발생했습니다..</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
