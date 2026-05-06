"use client";

import { useRouter } from "next/navigation";
import { EchoAboutEchoPopover } from "@/components/shell/EchoAboutEchoPopover";
import { EchoAppPageHeader } from "@/components/shell/EchoAppPageHeader";
import { EchoThemeToggle } from "@/components/theme/EchoThemeToggle";
import { useEchoAuth } from "@/hooks/useEchoAuth";
import { readEchoBrandFooterAttribution } from "@/lib/echo/readEchoBrandFooterAttribution";

export const EchoProfilePageClient = () => {
  const { user, signOutUser } = useEchoAuth();
  const router = useRouter();

  const onSignOut = () => {
    void (async () => {
      await signOutUser();
      router.replace("/");
    })();
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <EchoAppPageHeader
        title="Profile"
        description="Your account on Project ECHO."
        trailing={
          <>
            <EchoAboutEchoPopover variant="surface" />
            <EchoThemeToggle variant="surface" />
          </>
        }
      />
      <div className="mt-6 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6">
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-on-surface-variant">Display name</dt>
            <dd className="text-on-surface">{user?.displayName ?? "—"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-on-surface-variant">Email</dt>
            <dd className="text-on-surface">{user?.email ?? "—"}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={onSignOut}
          className="mt-6 rounded-full border border-outline px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-surface-container-low"
        >
          Sign out
        </button>
      </div>
      <p className="mt-8 text-center text-[10px] leading-snug text-on-surface-variant md:text-left">
        {readEchoBrandFooterAttribution()}
      </p>
    </div>
  );
};
