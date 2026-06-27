// Vercel Serverless Function: приём заявок с формы и запись в Postgres (Neon).
// Срабатывает на POST /api/lead
import { neon } from '@neondatabase/serverless';

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error('DATABASE_URL не задан');
  return neon(url);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Только POST' });
  }
  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const name = (body.name || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const message = (body.message || '').toString().trim();

    if (!name || !phone) {
      return res.status(422).json({ ok: false, error: 'Имя и телефон обязательны' });
    }

    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        phone      TEXT NOT NULL,
        email      TEXT,
        message    TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
    const rows = await sql`
      INSERT INTO leads (name, phone, email, message)
      VALUES (${name}, ${phone}, ${email}, ${message})
      RETURNING id
    `;
    return res.status(200).json({ ok: true, id: rows[0].id });
  } catch (e) {
    console.error('lead error:', e);
    return res.status(500).json({ ok: false, error: 'Ошибка сервера' });
  }
}
