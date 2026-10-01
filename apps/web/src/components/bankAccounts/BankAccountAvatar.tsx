import { getInitials } from "@/lib/initials";
import { Avatar, AvatarBadge, AvatarFallback } from "@coin-guard/ui";

type BankAccountAvatarProps = {
  name: string;
  alias?: string | null;
  isDefault?: boolean;
  size?: "default" | "sm" | "lg";
};

export const BankAccountAvatar = ({
  name,
  alias,
  isDefault,
  size = "default",
}: BankAccountAvatarProps) => {
  const fallback = alias?.trim() || getInitials(name);

  return (
    <Avatar size={size}>
      <AvatarFallback className="font-bold text-xs">
        {fallback}
      </AvatarFallback>
      {isDefault && <AvatarBadge />}
    </Avatar>
  );
};
