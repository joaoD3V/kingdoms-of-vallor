import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Swords } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoginWrapper } from '../components/LoginWrapper';

type RegisterWithEmailProps = {
  onReturn: () => void;
};

const registerFormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type registerFormSchema = z.infer<typeof registerFormSchema>;

export function RegisterWithEmail({ onReturn }: RegisterWithEmailProps) {
  const { register, handleSubmit, formState } = useForm<registerFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { isSubmitting } = formState;

  async function handleRegister({
    username,
    email,
    password,
  }: registerFormSchema) {
    console.log({ username, email, password });
  }

  return (
    <LoginWrapper>
      <button onClick={onReturn} className="mt-7 flex w-max items-center gap-1">
        <ChevronLeft className="h-6 w-6" strokeWidth={1.5} /> Voltar
      </button>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Nome de usuário:</label>
          <input
            {...register('username')}
            className="h-9 max-h-9 w-full rounded px-2 text-betume"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium">Email:</label>
          <input
            {...register('email')}
            type="email"
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
    </LoginWrapper>
  );
}
