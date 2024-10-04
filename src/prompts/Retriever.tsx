import {
  BaseRetriever,
  type BaseRetrieverInput,
} from "@langchain/core/retrievers";
import type { CallbackManagerForRetrieverRun } from "@langchain/core/callbacks/manager";
import { Document } from "@langchain/core/documents";
import weaviate, { Metadata } from "weaviate-client";

export interface WeaviateHybridRetrieverInput extends BaseRetrieverInput {}

export class WeaviateHybridRetriever extends BaseRetriever {
  lc_namespace = ["langchain", "retrievers"];

  constructor(fields?: WeaviateHybridRetrieverInput) {
    super(fields);
  }

  async _getRelevantDocuments(
    query: string,
    runManager?: CallbackManagerForRetrieverRun
  ): Promise<Document[]> {
    const client = await weaviate.connectToLocal();

    const queryWeaviate = await client
      .collections
      .get("PDFSection")
      .query
      .hybrid( 
        query,
        {limit: 5}
      )

    const documents: Document<Record<string, any>>[] | PromiseLike<Document<Record<string, any>>[]> | Document<Partial<Metadata>>[] = [];

    queryWeaviate.objects.forEach(document => {
      documents.push(
        new Document({
          pageContent: document.properties.content as string,
          metadata: document.metadata,
        })
      );
    });

    return documents;
  }
}