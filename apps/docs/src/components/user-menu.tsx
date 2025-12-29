"use client";

import {Button, Popover} from "@heroui/react";

import {Iconify} from "@/components/iconify";
import {useInstantDBAuth} from "@/lib/auth";
import {authClient} from "@/lib/auth-client";

export function UserMenu() {
  const {isLoading, user} = useInstantDBAuth();

  if (!user || isLoading) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const getDisplayName = (email: string | null | undefined) => {
    if (!email) return "User";
    const username = email.split("@")[0];

    if (!username) return "User";

    return username
      .replace(/[._]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayName = getDisplayName(user?.email);

  return (
    <Popover>
      <Popover.Trigger>
        <Button
          isIconOnly
          aria-label="User menu"
          className="h-[34px] w-[34px] rounded-full bg-linear-to-br from-blue-400 to-purple-500"
          size="sm"
          variant="secondary"
        />
      </Popover.Trigger>
      <Popover.Content placement="bottom end">
        <Popover.Dialog className="w-[240px] p-4">
          <div className="mb-4 flex items-start gap-3 border-b border-border pb-4">
            <Iconify className="text-primary text-2xl" icon="mdi:account-circle" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-muted">{user?.email}</p>
            </div>
          </div>

          <button
            className="hover:bg-default-100 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
            onClick={handleSignOut}
          >
            <Iconify className="text-lg text-muted" icon="mdi:logout" />
            <span>Sign out</span>
          </button>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
