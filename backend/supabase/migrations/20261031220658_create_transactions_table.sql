create table transactions (
  id uuid primary key default gen_random_uuid(),
  amount_in_cents bigint not null
    check (amount_in_cents > 0),
  description text,
  transaction_date date not null
);