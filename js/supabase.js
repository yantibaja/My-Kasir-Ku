// ============================================
// KONEKSI SUPABASE — KASIR PRO
// GANTI dengan URL & KEY milik Anda!
// ============================================

const SUPABASE_URL = 'https://wqotezgkxysopdvpxusz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxb3RlemdreHlzb3BkdnB4dXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5MTY5NTIsImV4cCI6MjEwNDQ5Mjk1Mn0.FaqsMh8FcWPNNcT8wAa0nUMYsCFCxZOpsx82gjO14ZM';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// CACHE PROFIL
// ============================================
const CACHE_PROFIL_KEY = '__profil_cache';
const CACHE_DURASI = 5 * 60 * 1000;

function simpanCacheProfil(profil) {
  try {
    localStorage.setItem(CACHE_PROFIL_KEY, JSON.stringify({
      data: profil,
      waktu: Date.now()
    }));
  } catch (e) {}
}

function ambilCacheProfil() {
  try {
    const raw = localStorage.getItem(CACHE_PROFIL_KEY);
    if (!raw) return null;
    const { data, waktu } = JSON.parse(raw);
    if (Date.now() - waktu > CACHE_DURASI) {
      localStorage.removeItem(CACHE_PROFIL_KEY);
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}

function hapusCacheProfil() {
  localStorage.removeItem(CACHE_PROFIL_KEY);
}
