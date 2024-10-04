import { FC } from 'hono/jsx';
import Chat from '../components/Chat';
import Sources from '../components/Sources';
import DataSourceInfo from '../components/DataSourceInfo';

export const Assistant: FC = () => {
  return (
    <div className="flex-grow p-4 flex">
      <div className="flex flex-grow h-full space-x-4">
        <div className="w-2/3">
          <Chat />
        </div>
        <div className="w-1/3 space-y-4">
          <DataSourceInfo />
          <Sources />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
