import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: { username: string };
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
};

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary",
        sizeClasses[size],
        className,
      )}
    >
      {initial}
    </div>
  );
}
