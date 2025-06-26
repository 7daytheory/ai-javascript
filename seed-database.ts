import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers"; // Ensure type safety, make sure to return json
import { MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb"; // Crete embeddings and save into mongodb
import { z } from "zod"; //More type safety
import "dotend/config"; //.env file
import { Employee, EmployeeSchema } from "./employeeSchema"; 

const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string);

const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7, //0 is most strict - 1 is more creative
})