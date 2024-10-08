import { Metadata } from 'next';
import BookDetail from '../_component/book-detail';
import ReviewEditor from '../_component/review-editor';
import ReviewList from '../_component/review-list';
import { BookData } from '@/types/book';

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${params.id}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    throw new Error(
      `book details fetch failed: ${response.statusText}`
    );
  }

  const data: BookData = await response.json();

  return {
    title: `${data.title} - 한입 북스`,
    description: `${data.description}`,
    openGraph: {
      title: `${data.id} - 한입 북스`,
      description: `${data.description}`,
      images: ['/thumbnail.png'],
    },
  };
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    throw new Error(
      `book details fetch failed: ${response.statusText}`
    );
  }

  const books: BookData[] = await response.json();

  return books.map((book) => book.id.toString());
}

export default function Page({ params }: Props) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
