import { createClient } from '@supabase/supabase-js';

// Get these from Supabase dashboard
const SUPABASE_URL = 'https://lfsgqnqkxednuhzwflaw.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmc2dxbnFreGVkbnVoendmbGF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Nzc4OTE5NywiZXhwIjoyMDgzMzY1MTk3fQ.-g2Ekzg0gGYCxpJJSLLpccoCET6nS2ecLoVFGVrDN2c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
