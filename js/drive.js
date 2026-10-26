// Caricamento automatico del PDF su Google Drive (cartella «Pageturn»).
// Login OAuth a pagina intera (implicit flow): il service worker imposta COOP same-origin,
// quindi popup e script di Google Identity Services non funzionerebbero.
// ponytail: token da 1 ora senza refresh; se scade si ricollega da Impostazioni. Per il refresh serve un piccolo backend.
import * as db from './db.js';

const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const FOLDER = 'Pageturn';
let cfg = { enabled: false, clientId: '', token: '', exp: 0 };

export async function init() {
  cfg = { ...cfg, ...(await db.kvGet('drive', {})) };
  const h = new URLSearchParams(location.hash.slice(1));
  if (!h.get('access_token')) return;
  history.replaceState(null, '', location.pathname + location.search);
  let want = '';
  try { want = sessionStorage.getItem('pageturn-drive-state') || ''; } catch { /* */ }
  if (!want || h.get('state') !== want) return; // risposta non richiesta da noi
  await configure({ enabled: true, token: h.get('access_token'), exp: Date.now() + (Number(h.get('expires_in')) - 60) * 1000 });
}

export const config = () => ({ ...cfg });
export const connected = () => !!cfg.token && Date.now() < cfg.exp;
export const ready = () => cfg.enabled && !!cfg.clientId;

export async function configure(next) {
  cfg = { ...cfg, ...next };
  await db.kvSet('drive', cfg);
}

export function connect() {
  const state = crypto.randomUUID();
  try { sessionStorage.setItem('pageturn-drive-state', state); } catch { /* */ }
  const q = new URLSearchParams({
    client_id: cfg.clientId, redirect_uri: location.origin + location.pathname, response_type: 'token', scope: SCOPE, state,
  });
  location.href = `https://accounts.google.com/o/oauth2/v2/auth?${q}`;
}

async function api(url, init = {}) {
  const r = await fetch(url, { ...init, headers: { authorization: `Bearer ${cfg.token}`, ...init.headers } });
  if (r.status === 401) { await configure({ token: '', exp: 0 }); throw new Error('session expired'); }
  if (!r.ok) throw new Error(`Drive ${r.status}`);
  return r.json();
}

async function folderId() {
  const q = encodeURIComponent(`name='${FOLDER}' and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const { files } = await api(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)`);
  if (files[0]) return files[0].id;
  const made = await api('https://www.googleapis.com/drive/v3/files?fields=id', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: FOLDER, mimeType: 'application/vnd.google-apps.folder' }),
  });
  return made.id;
}

// Carica il file; restituisce il link su Drive.
export async function upload(blob, name) {
  if (!connected()) throw new Error('session expired');
  const parent = await folderId();
  const b = `pt${crypto.randomUUID()}`;
  const body = new Blob([
    `--${b}\r\ncontent-type: application/json\r\n\r\n${JSON.stringify({ name, parents: [parent] })}\r\n--${b}\r\ncontent-type: ${blob.type || 'application/octet-stream'}\r\n\r\n`,
    blob, `\r\n--${b}--`,
  ]);
  const f = await api('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=webViewLink', {
    method: 'POST', headers: { 'content-type': `multipart/related; boundary=${b}` }, body,
  });
  return f.webViewLink;
}
