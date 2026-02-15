import { getMeQuery } from '@/query/Auth.queries';
import queryClient from '@/query/client';
import { Outlet, redirect } from 'react-router';

export async function loader({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie") ?? undefined;

  try {
    const user = await queryClient.ensureQueryData(getMeQuery(cookie));
    if (user?.id) return redirect("/");
    return null;
  } catch {
    return null;
  }
}

const AuthLayout = () => {
  return (
    <div className="auth-pages flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;