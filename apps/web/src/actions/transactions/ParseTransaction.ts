"use server";

import { TransformCategories } from "@/actions/etl/TransformCategories";
import { TransformDescriptions } from "@/actions/etl/TransformDescriptions";
import { ParseTransactionFile } from "@coin-guard/parser";

export const ParseTransaction = async (formValues: FormData) => {
  try {
    const file = formValues.get("file") as File;

    const processedData = await ParseTransactionFile(file);

    // ***** ***** ***** ETL Process ***** ***** ***** //

    const enhancedTransactions_description =
      await TransformDescriptions(processedData);
    const enhancedTransactions_final = await TransformCategories(
      enhancedTransactions_description,
    );

    // ***** ***** ***** ETL Process ***** ***** ***** //

    return enhancedTransactions_final;
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: error logging
    console.error("Failed to process CSV file:", error);
    throw new Error("Failed to process CSV file!");
  }
};
