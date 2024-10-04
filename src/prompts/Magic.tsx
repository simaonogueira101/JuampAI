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
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { WeaviateHybridRetriever } from "./Retriever";

interface Message {
  sender: 'ai' | 'human';
  content: string;
}

async function makeMagicHappen(apiKey: string, messages: Message[]) {
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
    "by a semantic and vector search engine without the chat " +
    "history. After the question, include the most relevant " +
    "keywords. Do NOT answer the question, just reformulate it " +
    "if needed and otherwise return it as is.";

  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const retriever = new WeaviateHybridRetriever({verbose: false});

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt: contextualizeQPrompt,
  });

  const systemPrompt =
    "You are Talent Protocol's Developer Relations AI Assistant. " +
    "Your name is JuampAI. You have access to TP's docs here: " +
    "https://docs.talentprotocol.com/docs." +
    "Use the following pieces of retrieved context to answer " +
    "the question. If you don't know the answer, say that you " +
    "don't know. You MUST return the answer in Markdown, especially " +
    "if if includes code snippets. Make use of paragraphs and bullet " +
    "points to improve readability. " +
    "\n\n" +
    "{context}";

    const chatHistory = messages.map((msg) => {
      if (msg.sender === 'human') {
        return new HumanMessage(msg.content);
      } else {
        return new AIMessage(msg.content);
      }
    });

  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chat_history"),
  ]);

  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt: qaPrompt,
  });

  const ragChain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: questionAnswerChain,
  });

  const response = await ragChain.invoke({
    input: messages[messages.length - 1].content,
    chat_history: chatHistory,
  });

  return response;
}

export default makeMagicHappen;
