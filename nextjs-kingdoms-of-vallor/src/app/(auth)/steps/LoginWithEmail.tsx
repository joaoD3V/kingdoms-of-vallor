import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Swords } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoginWrapper } from '../components/LoginWrapper';

type LoginWithEmailProps = {
  onReturn: () => void;
  onRegisterWithEmail: () => void;
};

const authFormSchema = z.object({
  entry: z.string(),
  password: z.string(),
});

type AuthFormSchema = z.infer<typeof authFormSchema>;

export function LoginWithEmail({
  onReturn,
  onRegisterWithEmail,
}: LoginWithEmailProps) {
  const { register, handleSubmit, formState } = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
  });

  const { isSubmitting } = formState;

  async function handleAuth({ entry, password }: AuthFormSchema) {
    console.log({ entry, password });

    // try {
    //   await signIn('resend', { email, redirect: false });
    //   toast.success('Enviamos um link de login para o seu email.');
    // } catch {
    //   toast.error(
    //     'Não conseguimos enviar um email pra você. Tente novamente mais tarde.'
    //   );
    // }
  }

  return (
    <LoginWrapper>
      <button onClick={onReturn} className="mt-7 flex w-max items-center gap-1">
        <ChevronLeft className="h-6 w-6" strokeWidth={1.5} /> Voltar
      </button>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleAuth)}>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">
            Nome de usuário ou email:
          </label>
          <input
            {...register('entry')}
            className="h-9 max-h-9 w-full rounded px-2 text-betume"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Senha:</label>
          <input
            {...register('password')}
            type="password"
            className="h-9 max-h-9 w-full rounded px-2 text-betume"
          />
        </div>

        <button
          type="submit"
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded border border-white/80 bg-betume text-xl font-medium uppercase text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-80"
          disabled={isSubmitting}
        >
          <Swords className="h-6 w-6" strokeWidth={1.5} />
          Entrar
        </button>
      </form>

      <div className="mx-auto mt-1 h-px w-5/6 bg-white/60" />

      <button
        onClick={onRegisterWithEmail}
        className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded border border-white/80 bg-grass text-xl font-medium uppercase text-white transition-colors hover:bg-grass/80"
      >
        Criar Conta
      </button>
    </LoginWrapper>
  );
}
