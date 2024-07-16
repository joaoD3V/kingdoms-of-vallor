import { Mail } from 'lucide-react';
import Image from 'next/image';

import discordLogo from '@/assets/discord-logo.svg';
import googleLogo from '@/assets/google-logo.svg';

import { LoginWrapper } from '../components/LoginWrapper';

type LoginButtonsProps = {
  onLoginWithEmail: () => void;
};

export function LoginButtons({ onLoginWithEmail }: LoginButtonsProps) {
  function showAlert() {
    window.alert(
      'Login social em desenvolvimento. Por favor, faça login com email e senha por enquanto.'
    );
  }

  return (
    <LoginWrapper>
      <button
        onClick={showAlert}
        className="mt-20 flex h-12 w-full items-center justify-center gap-2 rounded border border-white/80 bg-white text-base font-medium text-betume transition-colors hover:bg-white/85"
      >
        <Image src={googleLogo} alt="Logo do Google" className="h-6 w-6" />{' '}
        Entrar com o Google
      </button>

      <button
        onClick={showAlert}
        className="flex h-12 w-full items-center justify-center gap-2 rounded border border-white/80 bg-[#5866F2] text-base font-medium text-white transition-colors hover:bg-[#5866F2]/85"
      >
        <Image src={discordLogo} alt="Logo do Discord" className="h-6 w-6" />{' '}
        Entrar com o Discord
      </button>

      <button
        onClick={onLoginWithEmail}
        className="flex h-12 w-full items-center justify-center gap-2 rounded border border-white/80 bg-betume text-base font-medium transition-colors hover:bg-black"
      >
        <Mail className="h-6 w-6" strokeWidth={1.5} /> Entrar com o Email
      </button>
    </LoginWrapper>
  );
}
