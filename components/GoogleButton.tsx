"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (!callbackUrl) {
    callbackUrl = "/dashboard";
  }

  return (
    <button
      onClick={() => signIn("google", { callbackUrl })}
      className="flex items-center justify-center w-full px-4 py-2 my-4 text-sm font-medium text-gray-800 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300"
    >
      <FcGoogle size={20} className="mr-2" />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
