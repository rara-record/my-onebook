import { BookData } from '@/types/book';
import Link from 'next/link';
import Image from 'next/image';

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
      scroll={false}
      className="flex gap-4 py-5 px-5 border-b border-gray-300"
    >
      <div className="relative w-20 h-[105px]">
        <Image
          src={coverImgUrl}
          fill
          sizes="80px"
          alt={`도서 ${title}의 이미지`}
          className="object-contain"
        />
      </div>
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
