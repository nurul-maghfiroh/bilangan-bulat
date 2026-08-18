# MATH QUEST — SUPABASE ONLINE

## Yang sudah tersedia
- `index.html`: halaman siswa, 120 soal, submit ke Supabase.
- `admin.html`: dashboard admin.
- `supabase.sql`: tabel + Row Level Security.
- `admin-function.ts`: Supabase Edge Function untuk membaca data admin dengan service-role key di server.

## Setup
1. Buat project Supabase.
2. SQL Editor -> jalankan `supabase.sql`.
3. Project Settings -> API -> salin Project URL dan Publishable/Anon Key.
4. Ganti `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di `index.html`.
5. Deploy `admin-function.ts` sebagai Edge Function bernama `admin`.
6. Set secret Edge Function:
   `ADMIN_PIN=PIN_RAHASIA`
   Supabase otomatis menyediakan `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` untuk Edge Functions.
7. Di `admin.html`, ganti `YOUR_ADMIN_FUNCTION_URL` dengan URL Edge Function, misalnya:
   `https://PROJECT.supabase.co/functions/v1/admin`
8. Upload `index.html` dan `admin.html` ke hosting statis.

## Keamanan
Jangan pernah memasukkan `SUPABASE_SERVICE_ROLE_KEY` ke `index.html` atau `admin.html`.
Siswa hanya punya izin INSERT. Siswa tidak punya izin membaca data peserta lain.
Admin membaca seluruh data melalui Edge Function.

## Catatan
Semua siswa, walaupun memakai HP/laptop berbeda, mengirim hasil ke tabel `submissions` yang sama di Supabase.
