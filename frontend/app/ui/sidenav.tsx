"use client";

import Link from "next/link";

export default function SideNav() {
  return (
    <div className="flex flex-col">
      <Link href="/">Home</Link>
      <Link href="/expenses">Expenses</Link>
    </div>
  );
}
