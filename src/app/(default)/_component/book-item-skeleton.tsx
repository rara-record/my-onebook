export const BookItemSkeleton = () => {
  return (
    <div className="flex gap-4 py-5 px-5 border-b border-gray-30 animate-pulse">
      <div className="w-20 h-[105px] bg-slate-200"></div>
      <div className="flex-1">
        <div className="w-full h-5 bg-slate-200"></div>
        <div className="w-full h-5 bg-slate-200"></div>
        <br />
        <div className="w-full h-5 bg-slate-200"></div>
      </div>
    </div>
  );
};
