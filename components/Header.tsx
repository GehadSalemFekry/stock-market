"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white">
      <nav className="flex justify-between items-center py-4 mx-auto max-w-7xl px-4">
        <h1 className="text-xl font-medium text-gray-800">
          <Link href="/">Stock Market</Link>
        </h1>
        <div className="flex items-center">
          {session ? (
            <>
              <p className="text-gray-700 text-sm mr-4">
                <Link href="/transaction-history">Transactions</Link>
              </p>
              <p className="text-gray-700 text-sm mr-4">
                <Link href="/dashboard">Wallet</Link>
              </p>
              <p className="text-gray-700 text-sm mr-4">Signed in as {session.user?.email}</p>
              <button
                onClick={() => signOut()}
                className="flex items-center bg-gray-200 text-gray-800 text-sm py-2 px-4 rounded-full ml-2 hover:bg-gray-300"
              >
                <BsPersonFill className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <p className="border border-gray-300 text-gray-700 text-sm font-medium rounded-full py-2 px-4 mx-2 hover:bg-gray-100 cursor-pointer">
                <Link href="/login">Log in</Link>
              </p>
              <p className="bg-gray-200 text-gray-800 text-sm font-medium rounded-full py-2 px-4 mx-2 hover:bg-gray-300 cursor-pointer">
                <Link href="/register">Register</Link>
              </p>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
