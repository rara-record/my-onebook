import { createReviewAction } from '@/actions/create-review.action';

export default async function ReviewEditor({
  bookId,
}: {
  bookId: string;
}) {
  return (
    <section className="flex flex-col">
      <form
        action={createReviewAction}
        className="flex flex-col gap-2"
      >
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
