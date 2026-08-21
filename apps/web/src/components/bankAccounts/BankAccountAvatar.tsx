import { Avatar, AvatarBadge, AvatarFallback } from "@coin-guard/ui";

type BankAccountAvatarProps = {
  alias: string;
  isDefault?: boolean;
  size?: "default" | "sm" | "lg";
};

export const BankAccountAvatar = ({
  alias,
  isDefault,
  size = "default",
}: BankAccountAvatarProps) => {
  return (
    <Avatar size={size}>
      <AvatarFallback className="font-bold text-xs">{alias}</AvatarFallback>
      {isDefault && <AvatarBadge />}
    </Avatar>
  );
};
