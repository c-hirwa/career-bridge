"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (err) {
      // fail silently for now
      console.error('Sign out error', err);
    }
  };

  return (
    <button
      onClick={onSignOut}
      className="ml-4 rounded-md px-3 py-1 bg-gray-200 text-sm text-gray-800 hover:bg-gray-300"
      aria-label="Sign out"
    >
      Sign out
    </button>
  );
}
