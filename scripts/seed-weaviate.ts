import weaviate from "weaviate-client";
import fs from "fs";
import pdf from "pdf-parse";
import "dotenv/config";

const chunkText = (text: string, chunkSize = 100) => {
  const words = text.split(" ");
  const chunks: { content: string; chunkIndex: number; documentId: string }[] =
    [];

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    chunks.push({
      content: chunk,
      chunkIndex: i,
      documentId: "talent-protocol-docs",
    });
  }

  return chunks;
};

export const seedWeaviate = async () => {
  const client = await weaviate.connectToLocal({
    host: "weaviate",
    port: 8080,
  });

  const dataBuffer = fs.readFileSync("../data/talent-protocol-docs.pdf");

  const data = await pdf(dataBuffer);
  console.log(data.text);
  const chunks = chunkText(data.text);
  console.log(chunks);

  try {
    await client.collections.create({
      name: "PDFSection",
      vectorizers: weaviate.configure.vectorizer.text2VecCohere({
        model: "embed-multilingual-v3.0",
        sourceProperties: ["content"],
      }),
      generative: weaviate.configure.generative.openAI(),
      properties: [
        {
          name: "content",
          dataType: "text",
        },
        {
          name: "chunkIndex",
          dataType: "int",
        },
        {
          name: "documentId",
          dataType: "text",
        },
      ],
    });
    console.log("Collection created successfully");
  } catch (error) {
    console.error("Error creating collection:", error);
  }

  const myCollection = client.collections.get("PDFSection");
  const response = await myCollection.data.insertMany(chunks);

  if (response.hasErrors) {
    console.error(response.errors);
  }
};
