import { Avatar, AvatarFallback } from "@coin-guard/ui";

type BankAccountAvatarProps = {
  alias: string;
  size?: "default" | "sm" | "lg";
};

export const BankAccountAvatar = ({
  alias,
  size = "default",
}: BankAccountAvatarProps) => {
  return (
    <Avatar size={size}>
      <AvatarFallback className="font-bold text-xs">{alias}</AvatarFallback>
    </Avatar>
  );
};
