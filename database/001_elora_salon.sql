-- Élora: run in a dedicated Supabase project after reviewing policies.
-- Does NOT create any real staff account. Grant the role manually to an existing Auth user.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.salon_admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.salon_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  phone text NOT NULL,
  email text,
  service_id text NOT NULL CHECK (service_id IN ('haircut','haircolor','keratin','bridal','facial','nails','spa','skintreatment')),
  staff_id text NOT NULL DEFAULT 'any',
  preferred_date date NOT NULL,
  preferred_time text NOT NULL CHECK (preferred_time IN ('10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00')),
  note text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.salon_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS salon_appointments_date_idx ON public.salon_appointments(preferred_date,preferred_time);
CREATE INDEX IF NOT EXISTS salon_appointments_status_idx ON public.salon_appointments(status);
ALTER TABLE public.salon_admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salon_enquiries ENABLE ROW LEVEL SECURITY;

-- Membership lookup cannot list other administrators.
DROP POLICY IF EXISTS salon_admin_self ON public.salon_admin_users;
CREATE POLICY salon_admin_self ON public.salon_admin_users FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
-- An authenticated user may view/update appointment and enquiry rows ONLY if present in membership table.
DROP POLICY IF EXISTS salon_appointments_admin_read ON public.salon_appointments;
CREATE POLICY salon_appointments_admin_read ON public.salon_appointments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.salon_admin_users AS a WHERE a.user_id = (SELECT auth.uid()))
);
DROP POLICY IF EXISTS salon_appointments_admin_update ON public.salon_appointments;
CREATE POLICY salon_appointments_admin_update ON public.salon_appointments FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.salon_admin_users AS a WHERE a.user_id = (SELECT auth.uid()))
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.salon_admin_users AS a WHERE a.user_id = (SELECT auth.uid()))
);
DROP POLICY IF EXISTS salon_enquiries_admin_read ON public.salon_enquiries;
CREATE POLICY salon_enquiries_admin_read ON public.salon_enquiries FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.salon_admin_users AS a WHERE a.user_id = (SELECT auth.uid()))
);

-- No anon INSERT/SELECT/UPDATE/DELETE policy: public booking goes only through server-side validated APIs.
GRANT SELECT ON public.salon_admin_users TO authenticated;
GRANT SELECT, UPDATE ON public.salon_appointments TO authenticated;
GRANT SELECT ON public.salon_enquiries TO authenticated;
-- One-time bootstrap (run separately, replacing the UUID with your existing auth.users.id):
-- INSERT INTO public.salon_admin_users(user_id) VALUES ('YOUR-AUTH-USER-UUID') ON CONFLICT DO NOTHING;
NOTIFY pgrst, 'reload schema';
