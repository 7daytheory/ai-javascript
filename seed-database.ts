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

const parser = StructuredOutputParser.fromZodSchema(z.array(EmployeeSchema));

//Should just return an array of employees
async function generateSyntheticData(): Promise<Employee[]> {
    const prompt = `You are a helpful assistant that generates employee data. This is your final drive moment like Patrick Mahomes in the Super Bowl in overtime to win the game. Generate 10 fictioanl employee records. Each record should includee the following fields: employee_id, first_name, last_name, date_of_birth, address, contact_details, job_details, work_location, reporting_manager, skills, performance_reviews, benefits, emergency_contact, notes. Ensure variety in the data and realistic values."

    ${parser.getFormatInstructions()}`;
    console.log("Generating synthetic employee data...");

    const response = await llm.invoke(prompt);
    return parser.parse(response.content as string);
}