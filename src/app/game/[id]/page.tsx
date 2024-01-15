import { GameCard } from '@/components/GameCard';
import { Container } from '@/components/container';
import { Label } from '@/components/label';
import { GameProp } from '@/utils/types/games';
import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const game: GameProp = await getGameData(params.id);

  return {
    title: `${game.title} - Daly Games`,
    description: `${game.description.slice(0, 100)}...`,
    keywords: [...game.categories, ...game.platforms],
    openGraph: {
      title: game.title,
      images: [`${process.env.PROJECT_URL}${game.image_url}`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
      },
    },
  };
}

async function getGameData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
    );
    return response.json();
  } catch (error) {
    throw new Error('Erro ao buscar o jogo');
  }
}

async function getDalyGame() {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      {
        cache: 'no-cache',
      }
    );

    return response.json();
  } catch (error) {
    throw new Error('Erro ao buscar o jogo do dia');
  }
}

export default async function Game({
  params: { id },
}: {
  params: { id: string };
}) {
  const game: GameProp = await getGameData(id);
  const sortedGame: GameProp = await getDalyGame();

  if (!game) {
    redirect(`/`);
  }

  return (
    <main className="w-full text-black">
      <Suspense fallback={<h1>Loading</h1>}>
        <div className="bg-black h-80 sm:h-96 w-full relative">
          <Image
            src={game.image_url}
            alt={game.title}
            priority={true}
            quality={100}
            fill={true}
            className="max-h-96 object-cover rounded-lg opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
        </div>

        <Container>
          <h1 className="font-bold text-xl my-4 ">{game.title}</h1>
          <p className="text-sm text-zinc-800"> {game.description}</p>

          <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
          <div className="flex gap-2 flex-wrap">
            {game.categories.map((category, index) => (
              <Label key={index} name={category} />
            ))}
          </div>

          <h2 className="font-bold text-lg mt-7 mb-2">Plataforma</h2>
          <div className="flex gap-2 flex-wrap">
            {game.platforms.map((platform, index) => (
              <Label key={index} name={platform} />
            ))}
          </div>

          <p className="mt-7 mb-2">
            <strong>Data de lançamento</strong>
            {game.release}
          </p>

          <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado</h2>
          <div className="flex">
            <div className="flex-grow">
              <GameCard data={sortedGame} />
            </div>
          </div>
        </Container>
      </Suspense>
    </main>
  );
}
