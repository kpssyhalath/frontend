import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://lxqvpmtoxbinhqodramo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4cXZwbXRveGJpbmhxb2RyYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxMjg3NzEsImV4cCI6MjAzMjcwNDc3MX0.yR3e5lyOBAPnmC2h0PeRLuKzjxmLCoNyCkHYBUmPnyo"
);
