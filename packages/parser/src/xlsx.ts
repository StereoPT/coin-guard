import type { SheetData } from "read-excel-file/node";

type Cell = SheetData[number][number] | undefined;

const cellToString = (cell: Cell) => (cell == null ? "" : String(cell).trim());

export const rowsToObjects = <T>(rows: SheetData): T[] => {
  const [headerRow = [], ...dataRows] = rows;
  const headers = headerRow.map(cellToString);

  return dataRows.map((row) =>
    Object.fromEntries(
      headers.map((header, index) => [header, cellToString(row[index])]),
    ),
  ) as T[];
};
