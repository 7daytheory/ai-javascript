# ai-javascript
Build AI Agents with Javascript

## Successfully generate employee data with AI and then upload them to a MongoDB database

### Create Search Index
```bash
{
  "fields": [
    {
      "numDimensions": 1536,
      "path": "embedding",
      "similarity": "cosine",
      "type": "vector"
    }
  ]
}
```

```bash
npm init -y //init package

npm i -D typescript ts-node @types/express @types/node //download typescript libraries

npx i tsc --init //setup typescript config

npm i langchain @langchain/langgraph @langchain/mongodb @langchain/langgraph-checkpoint-mongodb @langchain/anthropic dotenv express mongodb zod
```
