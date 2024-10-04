import { FC } from 'hono/jsx';

export const Navbar: FC = () => {
  return (
    <nav className="bg-gray-800 p-4 flex flex-row items-center justify-between">
      <div className="flex items-center">
        <a href="/" data-navigo className="text-white font-bold hover:text-gray-400">
          DevRel Assistant
        </a>
      </div>
      {/* TODO: Enable if necessary. */}
      {/* <div className="flex space-x-4">
        <a href="/" data-navigo className="text-gray-300 hover:text-white hover:underline">
          Assistant
        </a>
        <a href="/config" data-navigo className="text-gray-300 hover:text-white hover:underline">
          Config
        </a>
      </div> */}
    </nav>
  );
};
