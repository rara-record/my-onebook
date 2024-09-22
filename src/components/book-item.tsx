import { BookData } from '@/types/book';
import Link from 'next/link';
import Image from 'next/image';

type Props = BookData & { blurredImage: string };

export const BookItem = ({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
  blurredImage,
}: Props) => {
  return (
    <Link
      href={`book/${id}`}
      scroll={false}
      className="flex gap-4 py-5 px-5 border-b border-gray-300"
    >
      <figure className="relative w-20 h-[105px] flex-shrink-0">
        <Image
          src={coverImgUrl}
          fill
          sizes="80px"
          placeholder="blur"
          blurDataURL={blurredImage}
          alt={`책 제목: ${title}, 저자: ${author}`}
          className="object-cover"
        />
      </figure>
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
