import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rtcelvlqxeemkfgokxbl.supabase.co'
const supabaseKey = 'sb_publishable_s36o4UaJBTD6DOUQ2BkRAA_mdjegT_A'

export const supabase = createClient(supabaseUrl, supabaseKey)