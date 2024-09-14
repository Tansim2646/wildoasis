/*
  SUPABASE CLIENT WILL BE CREATED FROM HERE AND EXPORTED IN THE OTHER COMPONENTS
*/
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export default supabase;
