"use client";

import Link from "next/link";
import { BASE_PATH, TRANSACTIONS_PATH } from "../lib/paths";

export default function SideNav() {
  return (
    <div className="flex flex-col">
      <Link href={BASE_PATH}>Home</Link>
      <Link href={TRANSACTIONS_PATH}>Transactions</Link>
    </div>
  );
}
