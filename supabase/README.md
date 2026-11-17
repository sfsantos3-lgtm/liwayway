# Liwayway backend setup

This project uses Supabase Auth and PostgreSQL with Row Level Security (RLS).

## Data boundaries

- Authentication credentials are handled by Supabase Auth. The application never stores raw passwords.
- Journal entries, initial assessments, post-counseling assessments, and appointment notes stay in PostgreSQL.
- Do not sync journal content or assessment answers to Google Sheets.
- Only low-sensitivity administrative submissions (for example, contact inquiries or event registrations after the privacy notice is approved) may be considered for a Sheets workflow.
- Professional/admin access is not enabled by this initial migration. Verify staff accounts and define assigned-client permissions before enabling those roles.
- Never put a Supabase service-role key in browser code or a public environment variable.

## Initial setup

1. Create a Supabase project in the Liwayway workspace.
2. Apply `migrations/202611180001_initial_schema.sql` in the Supabase SQL editor.
3. Add these Vercel Preview environment variables for the Liwayway project:
   - `LIWAYWAY_SUPABASE_URL`
   - `LIWAYWAY_SUPABASE_ANON_KEY`
4. The URL and anon/public key may be exposed to the browser only with RLS enabled. The service-role key must remain server-only and is not needed for the user-owned journal and appointment flows.
5. Enable email confirmation and configure the allowed redirect URL for the current Vercel preview domain.
6. Test sign-up, email confirmation, login, journal create/read/update/delete, and appointment request using a dedicated test account.

## Before real client use

The current schema is a user-owned testing foundation, not a clinical records system. Before collecting real client information, complete the privacy notice, informed-consent wording, data retention/deletion procedure, breach response, access audit, verified professional assignment, and professional/admin authorization policies. Do not collect sensitive responses in the preview until those safeguards are reviewed.
