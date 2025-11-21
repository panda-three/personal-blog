import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('缺少 SUPABASE_URL 或 SUPABASE_ANON_KEY 环境变量');
  }
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
    },
  });
}
