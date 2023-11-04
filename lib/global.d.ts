import type { Database as DB } from "@/lib/supabase.types";

declare global {
  type Database = DB;
  type Profile = DB["public"]["Tables"]["profiles"]["Row"];
}
