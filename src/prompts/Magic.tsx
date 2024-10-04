import { ChatOpenAI } from "@langchain/openai";
import { WeaviateStore } from "@langchain/weaviate";
import { OpenAIEmbeddings } from "@langchain/openai";
import weaviate from "weaviate-ts-client";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

async function makeMagicHappen(apiKey: string, inputQuestion: string) {
  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0,
    apiKey,
  });

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey,
  });

  const weaviateClient = (weaviate as any).client({
    scheme: "http",
    host: "localhost:8080",
  });

  const vectorStore = new WeaviateStore(embeddings, {
    client: weaviateClient,
    indexName: "PDFSection",
    textKey: "content",
    metadataKeys: ["content"],
  });

  const contextualizeQSystemPrompt =
    "Given a chat history and the latest user question " +
    "which might reference context in the chat history, " +
    "formulate a standalone question which can be understood " +
    "without the chat history. Do NOT answer the question, " +
    "just reformulate it if needed and otherwise return it as is.";

  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const retriever = vectorStore.asRetriever({
    k: 4,
  });

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt: contextualizeQPrompt,
  });

  const systemPrompt =
    "You are an assistant for question-answering tasks. " +
    "Use the following pieces of retrieved context to answer " +
    "the question. If you don't know the answer, say that you " +
    "don't know. Use three sentences maximum and keep the " +
    "answer concise." +
    "\n\n" +
    "{context}";

  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt: qaPrompt,
  });

  const ragChain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: questionAnswerChain,
  });

  const response = await ragChain.invoke({ input: inputQuestion });

  return response;
}

export default makeMagicHappen;
