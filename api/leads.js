// Vercel Serverless Function: просмотр заявок (защищено ключом).
// GET /api/leads?key=ВАШ_ADMIN_KEY
import { neon } from '@neondatabase/serverless';

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error('DATABASE_URL не задан');
  return neon(url);
}

export default async function handler(req, res) {
  const key = (req.query && req.query.key) || '';
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: 'Нет доступа' });
  }
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT id, name, phone, email, message, created_at
      FROM leads
      ORDER BY id DESC
    `;
    return res.status(200).json({ count: rows.length, leads: rows });
  } catch (e) {
    console.error('leads error:', e);
    return res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
}
