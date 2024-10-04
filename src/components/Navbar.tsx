import { FC } from 'hono/jsx';

export const Navbar: FC = () => {
  return (
    <nav>
      <a href="/" data-navigo>Home</a>
      <a href="/config" data-navigo>Config</a>
    </nav>
  );
};
