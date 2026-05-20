import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jkacuyhaczxuvtjpqgig.supabase.co';
const supabaseKey = 'sb_publishable_QYv0W8rRSKCf6JWrUvo84g_mRbZJ_cd';

export const supabase = createClient(supabaseUrl, supabaseKey);
