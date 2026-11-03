# Élora Beauty & Hair Salon — React Website + Admin

A complete **React + Vite** salon website designed after the supplied Élora visual reference. Public pages use soft blush/pearl surfaces, rose-pink calls-to-action, photographic cards, layered glassmorphism and Framer Motion reveals. Admin uses a charcoal sidebar and glassy blush-white cards.

## Run it locally (Windows / VS Code)

1. Extract ZIP; open **Elora-Luxury-Salon-React** (the folder containing `package.json`) in VS Code.
2. Use Terminal → New Terminal:

   ```powershell
   npm install
   npm run dev -- --port 5175
   ```

3. Open `http://localhost:5175/`; public booking is `/booking`; staff dashboard demo is `/admin`.
4. For a production bundle run `npm run build`. Vercel can deploy the folder with Framework Preset **Vite**, Build Command `npm run build`, Output `dist`.

**Important:** This project uses React/Vite, not Python or a static HTML preview server.

## Public pages

| Route | Working features |
| --- | --- |
| `/` | hero, signature services, photo gallery, carousel testimonials, call-to-action |
| `/services` | category filtering, instant case-insensitive text search without Enter |
| `/services/:slug` | each service's photo, details, indicative duration and price, pre-filled booking link |
| `/gallery` | category filters, accessible image lightbox, Escape to close |
| `/about` | salon story and illustrative stylist cards |
| `/booking` | service/stylist selection, real calendar date selection, time preferences, input checks, confirmation-request state |
| `/contact` | enquiry form with validation |
| `/admin/*` | admin overview, appointment statuses, searchable tables, clients, staff previews, service catalog, reports, CSV export |

## Demo vs live operation

**Default is an interactive demonstration.** The website and admin UI are usable immediately, but appointment/contact form data lives **only in that browser's localStorage** and can be reset via Admin → Settings. The dashboard includes four `Sample Guest` bookings, clearly marked **Sample**. There is no real login in demo mode, no email notifications, no payment integration, and the displayed booking slots are preferences—not verified live availability. **Do not enter actual customer data in demo mode or deploy it as a live booking system without following the steps below.**

### Enable real appointment-request backend

1. Create a **dedicated** Supabase project for the salon, not a shared database from another client.
2. Inspect and run `database/001_elora_salon.sql` in Supabase SQL Editor. Back up production databases before migrations.
3. Create a **real administrator** user through Supabase Authentication → Users. Copy the Auth user UUID. In SQL Editor execute `INSERT INTO public.salon_admin_users(user_id) VALUES ('REPLACE_WITH_AUTH_UUID') ON CONFLICT DO NOTHING;`.
4. Create a Cloudflare Turnstile site for your live domain. On Vercel, configure:
   - **Public build-time variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_TURNSTILE_SITE_KEY`.
   - **Server-only variables**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`.
5. Redeploy after updating environment variables. Never put the **service-role key** in a frontend `VITE_` variable, a ZIP or GitHub. A public anon key is not a secret; access is protected with RLS.
6. Test from the **Vercel deployment URL** (the Vite dev server doesn't provide Vercel functions): complete Turnstile, submit a test request, verify it appears in `salon_appointments`, sign in at `/admin`, and update its status. Test a rejected Turnstile and unauthorised user too.
7. Make sure your real salon details, service prices, staff/photos, opening hours, privacy policy and consent language are complete. Add a proper contact method for booking confirmation. Do not publish until all tests pass.

The API endpoints (`api/appointments.js`, `api/enquiries.js`) validate input server-side and verify Cloudflare Turnstile before writing via the server-only service-role key. Public users have **no direct SELECT/INSERT** policies on salon records. An authenticated, explicitly approved admin sees real bookings with Supabase RLS. If the environment isn't configured correctly, booking must remain in demo mode.

**Limitations for live operation:** requests are not guaranteed appointment reservations; staff schedules and booking conflict detection, outbound confirmations, cancellation policy, formal privacy/legal review, stronger abuse/rate-limit safeguards, file/photo management and payment processing must be added or configured for your real clinic/salon workflow.

## How to edit

- `src/catalog.js`: demo services/prices/stylists/gallery; replace imagery and sample details.
- `src/styles.css`: design system, glass surfaces, desktop/mobile layouts.
- `src/Site.jsx`: public homepage, services, about, gallery, contact, nav and footer.
- `src/Booking.jsx`: booking calendar and client request UX.
- `src/Admin.jsx`: admin dashboard and demo management.
- `src/Turnstile.jsx`: client-side captcha component.
- `api/`: server-only endpoints; `database/`: SQL schema and row-level security.
- `public/images/`: local images cropped from the **user-supplied AI concept montage**, so they have limited source resolution. Replace all with properly licensed, full-quality salon photos and approved staff portraits for an actual client.

## Image and claim accuracy

The supplied screenshot contains stylised/conceptual beauty and salon imagery rather than verified client work; it's used as a design reference, not authentic portfolio proof. Sample staff names, service prices, salon address, hours, ratings, statistics and testimonials must be replaced with true client-provided details. The website deliberately does **not** claim unverified salon statistics or reviews as facts.

## Validation status

See `QA-REPORT.md`. This environment has no npm registry access so a real Vite bundle or browser integration test could not be completed here. React JS/JSX and CSS parsing, local asset references, test inputs and ZIP integrity were checked. Run `npm install && npm run build` and inspect the live pages in mobile and desktop browsers before client delivery.
