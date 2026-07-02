/**
 * Proxy API - forwards requests to the configured backend API.
 * Body: { path, method?, ...data } — method defaults to POST.
 *
 * Examples:
 *   POST /api/proxy with body: { path: "contact-form", name: "John" }
 *   POST /api/proxy with body: { path: "about-us/banner", method: "GET" }
 */

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL; 
const API_TOKEN = process.env.NEXT_PUBLIC_APP_API_TOKEN || '';

export async function POST(request) {
  if (!API_URL || !API_TOKEN) {
    return Response.json(
      { error: 'API configuration missing' },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const pathFromQuery = searchParams.get('path');

    let targetPath = pathFromQuery;
    let bodyToForward = null;
    let upstreamMethod = 'POST';
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const parsed = await request.json();
      if (!targetPath && typeof parsed?.path === 'string') {
        targetPath = parsed.path;
      }
      if (typeof parsed?.method === 'string') {
        const m = parsed.method.toUpperCase();
        if (['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].includes(m)) {
          upstreamMethod = m;
        }
      }
      const { path: _, method: __, ...rest } = parsed;
      bodyToForward = Object.keys(rest).length > 0 ? rest : null;
    }

    if (!targetPath) {
      return Response.json(
        { error: 'Missing path. Use ?path=endpoint or body.path' },
        { status: 400 }
      );
    }

    const targetUrl = `${API_URL}${targetPath.replace(/^\//, '')}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    };

    const fetchOptions = {
      method: upstreamMethod,
      headers,
      body: upstreamMethod !== 'GET' && bodyToForward ? JSON.stringify(bodyToForward) : undefined,
    };

    const res = await fetch(targetUrl, fetchOptions);
    const text = await res.text();
    const data = text ? (() => { try { return JSON.parse(text); } catch { return {}; } })() : {};
    if (!res.ok) {
      const errorMsg = data?.error || data?.message || 'Upstream request failed';
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[api/proxy] ${targetPath} → ${res.status}:`, errorMsg);
      }
      return Response.json(
        { error: errorMsg, status: res.status, ...data },
        { status: res.status }
      );
    }

    return Response.json(data);
  } catch (err) {
    console.error('[api/proxy]', err);
    return Response.json(
      { error: err.message || 'Proxy request failed' },
      { status: 500 }
    );
  }
}
