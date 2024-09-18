import { revalidatePath } from 'next/cache';

export default async function ReviewEditor({
  bookId,
}: {
  bookId: string;
}) {
  const createReview = async (FormData: FormData) => {
    'use server';

    const bookId = FormData.get('bookId')?.toString();
    const content = FormData.get('content')?.toString();
    const author = FormData.get('author')?.toString();

    if (!bookId || !content || !author) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review`,
        {
          method: 'POST',
          body: JSON.stringify({ bookId, content, author }),
        }
      );

      revalidatePath(`/book/${bookId}`);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <section className="flex flex-col">
      <form action={createReview} className="flex flex-col gap-2">
        <input name="bookId" defaultValue={bookId} hidden />
        <textarea
          required
          name="content"
          placeholder="리뷰 내용"
          className="w-full h-[100px] resize-y px-3 py-3 border border-gray-300 rounded-md"
        />
        <div className="flex justify-end gap-2">
          <input
            required
            name="author"
            placeholder="작성자"
            className="px-2 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-20 px-2 py-2 border-none text-white text-sm  cursor-pointer rounded-md bg-[rgb(37,147,255)]"
          >
            작성 하기
          </button>
        </div>
      </form>
    </section>
  );
}
