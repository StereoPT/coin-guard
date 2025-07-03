import os
import pandas as pd
import numpy as np


def main():
    try:
        """Main function"""
        transactions_csv_file = f"./transactions/transaction.csv"
        df = pd.read_csv(transactions_csv_file, sep=";")

        # Trim Headers
        df.columns = df.columns.str.strip()

        # Remove Last Line
        df = df[:-1]

        # Remove & Rename Columns
        df.dropna(axis=1, how="all", inplace=True)
        df.drop(columns=["Data mov.", "Categoria", "Saldo disponível"], inplace=True)
        column_mapping = {
            "Data valor": "date",
            "Descrição": "description",
            "Débito": "debit",
            "Crédito": "credit",
            "Saldo contabilístico": "balance",
        }
        df.rename(columns=column_mapping, inplace=True)

        # Data Cleanup
        df["description"] = df["description"].str.strip().str.lower()

        df["amount"] = df["credit"].fillna(df["debit"])
        df["type"] = np.where(df["credit"].notna(), "CREDIT", "DEBIT")
        df.drop(columns=["credit", "debit"], inplace=True)

        df["amount"] = (
            df["amount"]
            .str.replace(".", "")
            .str.replace(",", ".")
            .astype("double")
            .round(2)
        )
        df["balance"] = (
            df["balance"]
            .str.replace(".", "")
            .str.replace(",", ".")
            .astype("double")
            .round(2)
        )
        df["date"] = pd.to_datetime(df["date"], format="%d-%m-%Y", utc=True)
        df["date"] = df["date"].dt.strftime("%Y-%m-%dT%H:%M:%SZ")

        # For Tests:
        # df.to_csv(transactions_csv_file, sep=";", index=False)
        df.to_json("./transactions/transaction.json", orient="records", indent=2)

        print("DONE")
    except:
        print("ERROR")


if __name__ == "__main__":
    main()
