import { AuthManager } from './components/AuthManager';

export default function AuthPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-auth bg-cover bg-bottom bg-no-repeat">
      <AuthManager />
    </main>
  );
}
