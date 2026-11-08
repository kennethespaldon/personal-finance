import { createClient } from "@supabase/supabase-js";
import { type Database } from "../types/database.types.ts";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SECRET_KEY);

export default supabase;