import Image from 'next/image';
import { ReactNode } from 'react';

type LoginWrapperProps = {
  children: ReactNode;
};

export function LoginWrapper({ children }: LoginWrapperProps) {
  return (
    <div className="relative ml-20 mt-12 flex w-[284px] flex-col items-center justify-start rounded-2xl border border-white/25 bg-betume/90 p-3 pb-8 shadow-xl lg:min-h-[400px] 2xl:min-h-[482px]">
      <Image
        src="/img/logo.png"
        alt="Logo Kingdoms of Vallor"
        width={1000}
        height={1000}
        quality={100}
        className="absolute -top-[100px] h-[150px] w-[150px]"
      />
      <Image
        src="/img/auth-warrior.png"
        alt="Imagem de um guerreiro medieval"
        width={5000}
        height={5000}
        quality={100}
        className="absolute -left-[200px] -top-[50px] z-10 h-[499px] w-[234px]"
      />

      <div className="flex w-full flex-col gap-5 px-3 text-white">
        {children}
      </div>
    </div>
  );
}
