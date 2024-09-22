import { BookData } from '@/types/book';
import Image from 'next/image';

export default async function BookDetail({
  bookId,
}: {
  bookId: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    throw new Error(
      `book details fetch failed: ${response.statusText}`
    );
  }

  const bookDetail: BookData = await response.json();

  const {
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = bookDetail;

  return (
    <section className="flex flex-col gap-3">
      <div
        className="flex justify-center px-5 py-5 bg-center bg-no-repeat bg-cover relative before:content-[' ']
        before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:bg-opacity-70"
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <figure className="w-[269px] h-[350px] relative">
          <Image
            src={coverImgUrl}
            fill
            priority
            sizes="269px"
            alt={`책 제목: ${title}, 저자: ${author}`}
            className="z-[1] object-cover"
          />
        </figure>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">{title}</h2>
        <h4>{subTitle}</h4>
        <p className="text-gray-400">
          {author} | {publisher}
        </p>
        <div className="bg-gray-100 px-4 py-4 leading-[1.3] whitespace-pre-line rounded-md">
          {description}
        </div>
      </div>
    </section>
  );
}
