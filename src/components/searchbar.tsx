'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Searchbar = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onchangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search) {
      setSearch('');
      router.replace('/');
    }

    if (q === search) return;

    router.push(`search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-3 mb-5">
      <input
        className="flex-1 px-4 py-4 border border-gray-300 rounded-md"
        value={search}
        onChange={onchangeSearch}
        onKeyDown={onKeyDown}
      />

      <button
        type="button"
        className="w-20 rounded-md border-none bg-[rgb(37,147,255)] text-white cursor-pointer"
        onClick={onSubmit}
      >
        검색
      </button>
    </div>
  );
};
