import { Hono } from "hono";
import sequelize from "../database";
import weaviate from "weaviate-client";

const app = new Hono();

app.get('*', (c) => {
  return c.html(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        
        <title>JuampAI</title>
        <script src="https://cdn.tailwindcss.com"></script>
        
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <script type="module" src="/src/client.tsx"></script>
        )}
      </head>

      <body>
        <div id="root"></div>
      </body>
    </html>
  )
})

const connectDB = async () => {
  let retries = 5;
  await new Promise((res) => setTimeout(res, 3000)); // wait 3 seconds before trying to connect
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await sequelize.sync();
      console.log("Models have been synchronized.");
      break;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds
    }
  }
};

const connectWeaviate = async () => {
  let retries = 5;
  await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds before trying to connect
  while (retries) {
    try {
      const client = await weaviate.connectToLocal({
        host: "weaviate",
        port: 8080,
      });
      console.log("Connected to the weaviate.");
      break;
    } catch (error) {
      console.error("Unable to connect to the weaviate:", error);
      console.log(error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds
    }
  }
};

const start = async () => {
  // await connectDB();
  // await connectWeaviate();
};

start();

export default app;