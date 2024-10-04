import { FC } from 'hono/jsx';

export const Layout: FC = (props) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {props.children}
    </div>
  );
};
