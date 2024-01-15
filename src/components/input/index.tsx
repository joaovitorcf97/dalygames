'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export function Input() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (search === '') return;

    router.push(`/game/search/${search}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
    >
      <input
        type="text"
        placeholder="Digite o nome do jogo"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="bg-slate-200 w-11/12 outline-none"
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  );
}
