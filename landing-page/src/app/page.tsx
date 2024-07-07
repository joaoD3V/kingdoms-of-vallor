import { IconBrandDiscordFilled } from '@tabler/icons-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start">
      <div className="my-10 min-h-[100px] w-[370px] rounded-lg border-2 border-white bg-[#CBBA98] p-8 text-justify text-xl text-black shadow-[20px] md:w-[659px] lg:my-20">
        <Image
          src="/img/logo.png"
          width={1000}
          height={1000}
          quality={100}
          alt="Logo Kingdoms of Vallor"
          className="mx-auto h-[250px] w-[250px]"
        />

        <p className="mt-5 text-xl text-black lg:mt-10">
          <strong>Vallor</strong> é um mundo medieval repleto de conflitos{' '}
          <strong className="italic underline underline-offset-4">
            - e mistério -
          </strong>
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Capítulo 1: O Despertar das Sombras
        </h2>
        <p className="mt-2">
          Uma escuridão antiga começou a se espalhar pelas terras. Você deve
          investigar a origem desta ameaça e proteger suas aldeias do caos.
          Explore as áreas afetadas e prepare suas tropas para enfrentar as
          criaturas sombrias que infestam as aldeias vizinhas.
        </p>
        <p className="mt-5 text-lg italic">
          Em um canto esquecido do reino, uma antiga ameaça desperta. Os rumores
          falam de uma sombra que se espalha pelas terras, trazendo caos e
          destruição.
        </p>
        <p className="mx-auto my-10 w-max border border-black p-2 font-bold">
          Vallor precisa da sua ajuda!
        </p>

        <p className="mt-10">
          Você será o rei de um pequeno reino. Seu objetivo é expandir suas
          terras, construir um poderoso exército e dominar outros territórios,
          enfrentando inimigos e fazendo alianças.
        </p>
        <p className="mt-4">
          <span className="underline underline-offset-4">
            <strong>Kingdoms of Vallor</strong> está em desenvolvimento
          </span>{' '}
          . Junte-se ao nosso servidor Discord e fique por dentro das novidades!
        </p>

        <a
          href="https://discord.gg/ZpSqGJVTB9"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-10 flex w-full items-center gap-2 rounded border-2 border-white bg-[#AE1E00] px-6 py-4 text-lg font-bold text-white transition-all hover:opacity-80 lg:w-max lg:text-xl"
        >
          <IconBrandDiscordFilled className="h-6 w-6 lg:h-8 lg:w-8" /> Entrar no
          Servidor Discord
        </a>
      </div>
    </main>
  );
}
