import TransactionsList from "@/src/components/TransactionsList";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Manage transactions",
};

export default async function Transactions() {
  return (
    <div>
      <h1>Transactions</h1>

      <Suspense>
        <TransactionsList />
      </Suspense>
    </div>
  );
}
