import TransactionForm from "@/src/components/TransactionForm";
import TransactionsList from "@/src/components/TransactionsList";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Manage transactions",
};

export default async function Transactions() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-2xl font-semibold">Transactions</h1>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr]">
        <section aria-labelledby="log-transaction-heading">
          <h2 id="log-transaction-heading" className="mb-4 text-lg font-medium">
            Log a transaction
          </h2>
          <TransactionForm />
        </section>

        {/* Reserved for the recent-transactions list. */}
        <section aria-labelledby="recent-transactions-heading">
          <h2
            id="recent-transactions-heading"
            className="mb-4 text-lg font-medium"
          >
            Recent transactions
          </h2>
          <Suspense>
            <TransactionsList />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
