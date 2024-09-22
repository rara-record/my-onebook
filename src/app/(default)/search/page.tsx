import { Metadata } from 'next';
import { Suspense } from 'react';
import { delay } from '@/utils/delay';
import { BookData } from '@/types/book';
import { BookItem } from '@/components/book-item';
import { BookListSkeleton } from '../_component/book-list-skeleton';

type Props = {
  searchParams: { q?: string };
};

// 동적 정보(예: 현재 경로 매개변수, 외부 데이터 또는 상위 세그먼트의 metadata)에 의존하는 동적 메타데이터는
// generateMetadata 함수를 내보내어 설정할 수 있으며,
// 이 함수는 Metadata 객체를 반환합니다.
export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q} : 검색 결과`,
    description: `${searchParams.q} 에 대한 도서 검색 결과 입니다.`,
    openGraph: {
      title: `${searchParams.q} : 검색 결과`,
      description: `${searchParams.q} 에 대한 도서 검색 결과 입니다.`,
      images: ['/thumbnail.png'],
    },
  };
}

// async 지워주기
export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return <SearchResult q={searchParams.q || ''} />;
}

// 비동기 컴포넌트가 아니라면, loading 컴포넌트를 사용할 수 없음
const SearchResult = async ({ q }: { q: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  const data: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  return (
    <div>
      {data.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};
