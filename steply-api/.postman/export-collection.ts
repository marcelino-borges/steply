import * as dotenv from "dotenv";
import { join, resolve } from "path";
import { writeFileSync } from "fs";
import assert from "assert";
import prettier from "prettier";

dotenv.config({ path: resolve(__dirname, "../.env") });

const POSTMAN_API_URL = process.env.POSTMAN_COLLECTION_URL;

const getCollectionById = async () => {
  assert(!!POSTMAN_API_URL, "POSTMAN_API_URL env not found for Postman export");

  const res = await fetch(POSTMAN_API_URL);

  if (!res.ok) {
    const msg = await res.text();
    throw new Error("Error fetching collection from Postman API: " + msg);
  }

  const result = await res.json();

  assert(result && result.collection, "Collection not found.");

  return JSON.stringify(result.collection);
};

const saveCollectionToFileSystem = async () => {
  const json = await getCollectionById();

  const jsonPath = resolve(join(__dirname, "../.postman/collection.json"));

  const prettierConfigFilePath = resolve("./.prettierrc");
  const prettierConfig = prettier.resolveConfig(prettierConfigFilePath);
  const formattedContent = await prettier.format(json, {
    ...prettierConfig,
    filepath: jsonPath,
  });

  writeFileSync(jsonPath, formattedContent);

  console.log(`Collection atualizada com sucesso em ${jsonPath}`);
};

saveCollectionToFileSystem();
