import weaviate from "weaviate-client";
import { configure, vectorizer } from "weaviate-client";
import fs from "fs";
// pdf-parse package is not maintained and has some issues with TypeScript compatibility
// @ts-ignore
import pdf from 'pdf-parse/lib/pdf-parse'
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
  const client = await weaviate.connectToLocal();

  const test = await client
    .collections
    .get("PDFSection")
    .query
    .hybrid(
      "How can I obtain an API key for Talent Protocol? \n\nKeywords: Talent Protocol, API key, obtain, access",
      {
        limit: 2,
      }
    )
  
  console.log(test.objects)

  // const dataBuffer = fs.readFileSync("./data/talent-protocol-docs.pdf");

  // const data = await pdf(dataBuffer);
  // console.log(data.text);
  // const chunks = chunkText(data.text);
  // console.log(chunks);

  // try {
  //   const collections = await client.collections.listAll();
  //   const collectionExists = collections.some(
  //     (collection: any) => collection.name === "PDFSection"
  //   );

  //   if (collectionExists) {
  //     await client.collections.delete("PDFSection");
  //     console.log("Existing collection deleted successfully");
  //   }

  //   await client.collections.create({
  //     name: "PDFSection",
  //     vectorizers: vectorizer.text2VecOpenAI(),
  //     generative: configure.generative.openAI(),
  //     properties: [
  //       {
  //         name: "content",
  //         dataType: "text",
  //       },
  //       {
  //         name: "chunkIndex",
  //         dataType: "int",
  //       },
  //       {
  //         name: "documentId",
  //         dataType: "text",
  //       },
  //     ],
  //   });
  //   console.log("Collection created successfully");
    
  // } catch (error) {
  //   console.error("Error managing collections:", error);
  // }

  // const myCollection = client.collections.get("PDFSection");
  // const response = await myCollection.data.insertMany(chunks);

  // if (response.hasErrors) {
  //   console.error("Errors: ", response.errors);
  // }
};
