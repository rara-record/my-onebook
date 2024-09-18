import { BookData } from '@/types/book';
import Link from 'next/link';

export const BookItem = ({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) => {
  return (
    <Link
      href={`book/${id}`}
      className="flex gap-4 py-5 px-5 border-b border-gray-300"
    >
      <img src={coverImgUrl} alt={title} className="w-20" />
      <div>
        <h2 className="font-bold">{title}</h2>
        <h4>{subTitle}</h4>
        <br />
        <p className="text-gray-400">
          {author} | {publisher}
        </p>
      </div>
    </Link>
  );
};
