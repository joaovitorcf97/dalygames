import { GameCard } from '@/components/GameCard';
import { Container } from '@/components/container';
import { Input } from '@/components/input';
import { GameProp } from '@/utils/types/games';

async function getGamesData(title: string) {
  try {
    const decodedTitle = decodeURI(title);
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodedTitle}`
    );
    return response.json();
  } catch (error) {
    throw new Error('Erro ao buscar o jogo');
  }
}

export default async function Search({
  params: { title },
}: {
  params: { title: string };
}) {
  const games: GameProp[] = await getGamesData(title);
  return (
    <main className="w-full text-black">
      <Container>
        <Input />

        <h1 className="font-bold text-xl mt-8 mb-5">Veja o que encontramos</h1>

        {!games && <p>Esse jogo não foi encontrado!...</p>}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {games && games.map((item) => <GameCard key={item.id} data={item} />)}
        </section>
      </Container>
    </main>
  );
}
