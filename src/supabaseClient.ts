// src/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fyhasmtflxnpfaegesrj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5aGFzbXRmbHhucGZhZWdlc3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NzgzNzIsImV4cCI6MjA2NzM1NDM3Mn0.OIvIWGEBU3nsmZClMtXJYX59tyGSl00IS7luskh_HHg";

export const supabase = createClient(supabaseUrl, supabaseKey);

// // src/supabaseClient.ts
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://jlgkfjzksnqicvtvrhos.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ2tmanprc25xaWN2dHZyaG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NDA0NzQsImV4cCI6MjA1OTMxNjQ3NH0.FCYQdS3vOS_UlUmn4uvCqcq2t2hAKf9KhkmaAlc86cQ'

// export const supabase = createClient(supabaseUrl, supabaseKey)
