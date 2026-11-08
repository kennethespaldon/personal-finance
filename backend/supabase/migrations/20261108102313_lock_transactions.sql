-- Only the backend (secret key -> service_role) may access transactions.
-- The publishable key (anon/authenticated) is public, so it gets no access.

alter table public.transactions enable row level security;

revoke all on table public.transactions from anon, authenticated;

grant select, insert, update, delete on table public.transactions to service_role;
