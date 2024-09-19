import { ReviewData } from '@/types/review';

export default async function ReviewList({
  bookId,
}: {
  bookId: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(`review fetch failed: ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

const ReviewItem = ({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) => {
  return (
    <div className="flex flex-col gap-1 py-4">
      <div className="text-sm">{author}</div>
      <div className="bg-[rgb(240,240,240)] py-3 px-2 rounded-md">
        {content}
      </div>
      <div className="flex gap-3 text-gray-400 text-sm">
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div className="cursor-pointer">삭제하기</div>
      </div>
    </div>
  );
};
