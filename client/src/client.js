import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tslsjnmdnlctukoilrux.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbHNqbm1kbmxjdHVrb2lscnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3NzQ4NjMsImV4cCI6MjAxNzM1MDg2M30.Ci7NPuCsGwxmYNs-T6iXkg8LIscqHNAficA86MqlPOg';
export const supabase = createClient(supabaseUrl, supabaseKey)