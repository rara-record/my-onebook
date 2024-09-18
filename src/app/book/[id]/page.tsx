import BookDetail from '../_component/book-detail';
import ReviewEditor from '../_component/review-editor';
import ReviewList from '../_component/review-list';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-3">
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
