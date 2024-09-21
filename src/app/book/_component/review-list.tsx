import { ReviewData } from '@/types/review';
import ReviewItem from './review-item';

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
