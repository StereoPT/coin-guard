'use server';

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import prisma from '@/lib/prisma';

const handlePython = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileContents = buffer
    .toString('latin1')
    .split('\n')
    .slice(6)
    .join('\n');

  const filePath = path.join('.', 'transactions', 'transaction.csv');
  fs.writeFileSync(filePath, fileContents);

  const pythonOut = execSync(`python3 src/lib/main.py`);
  if (pythonOut.toString().trim() !== 'DONE') {
    throw new Error('Something went wrong!');
  }

  fs.rmSync(filePath);
};

const handleJsonImport = async () => {
  const filePath = path.join('.', 'transactions', 'transaction.json');

  const data = fs.readFileSync(filePath, 'utf8');
  const transactions = JSON.parse(data);

  await prisma.transaction.createMany({ data: transactions });

  fs.rmSync(filePath);
};

export const ImportTransaction = async (formValues: FormData) => {
  try {
    const file = formValues.get('file') as File;

    if (!file) {
      throw new Error('No file uploaded!');
    }

    await handlePython(file);
    await handleJsonImport();

    return true;
  } catch (error) {
    console.error('Failed to process CSV file:', error);
    throw new Error('Failed to process CSV file!');
  }
};
