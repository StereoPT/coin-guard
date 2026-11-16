import type { BankParser } from "./types";

export const caParser: BankParser = async (buffer) => {
  const fileContents = buffer;

  console.log(fileContents);

  return [];
};
