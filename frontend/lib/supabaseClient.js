import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzxonclmawrcpghvhvhf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6eG9uY2xtYXdyY3BnaHZodmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NTM2MzgsImV4cCI6MjA2MjQyOTYzOH0.fGI7yo3_3RQtwhR4_XRvVyafYAe9ktjNjtRTpo0kWf0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
