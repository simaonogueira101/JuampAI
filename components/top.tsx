import type { FC } from "hono/jsx";
import { Layout } from "./layout";

export const Top: FC<{ messages: string[] }> = (props: {
  messages: string[];
}) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>
    </Layout>
  );
};
