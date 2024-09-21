'use client';

import { ReviewData } from '@/types/review';
import ReviewItemDeleteButton from './review-item-delete-button';
import { formatDate } from '@/utils/format-date';

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div className="flex flex-col gap-1 py-4">
      <div className="text-sm">{author}</div>
      <div className="bg-[rgb(240,240,240)] py-3 px-2 rounded-md">
        {content}
      </div>
      <div className="flex gap-3 text-gray-400 text-sm">
        <div>{formatDate(createdAt)}</div>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
}
