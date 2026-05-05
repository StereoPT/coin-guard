export const CountType = {
  MONEY: "MONEY",
  NUMBER: "NUMBER",
} as const;

export type CountType = (typeof CountType)[keyof typeof CountType];
