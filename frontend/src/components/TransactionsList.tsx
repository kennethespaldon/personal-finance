import type { Transaction } from "@/src/types/transaction";
import { API_URL } from "@/src/lib/config";

export default async function TransactionsList() {
  const response = await fetch(`${API_URL}/api/transactions`, {
    method: "GET",
    redirect: "manual",
    headers: {
      "x-vercel-protection-bypass":
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions (status ${response.status})`);
  }

  const transactions: Transaction[] = await response.json();

  return (
    <div>
      {...transactions.map((t: Transaction) => {
        const amountInDollars = t.amount_in_cents / 100;

        return (
          <div key={t.id} className="flex gap-4">
            <div>${amountInDollars}</div>
            <div>{t.description}</div>
            <div>{t.transaction_date}</div>
          </div>
        );
      })}
    </div>
  );
}
