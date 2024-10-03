import type { FC } from "hono/jsx";

import { Layout } from "./layout";
import { useState } from "hono/jsx";

export const Top: FC<{ messages: string[] }> = (props: {
  messages: string[];
}) => {
  const [content, setContent] = useState("teste");
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Hello Hono! {content}</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>
    </Layout>
  );
};
