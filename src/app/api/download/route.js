export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const filename = searchParams.get('filename') || 'document.pdf'

  if (!url || url === 'undefined' || url === 'null') {
    return new Response('Missing url parameter', { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NextJS/1.0)' },
    })
    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`upstream ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'application/pdf'

    // Use RFC 5987 encoding for filename* so non-ASCII characters (em dashes,
    // accented letters, long multi-word titles, etc.) don't corrupt the header.
    // filename= provides an ASCII-only fallback for very old clients.
    const asciiFallback = filename.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '_')
    const encoded = encodeURIComponent(filename)

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`,
      },
    })
  } catch (error) {
    console.error('[/api/download] proxy failed:', error?.message, '| URL:', url)
    // Server cannot reach the file — redirect the browser directly to the source.
    // response-content-disposition tells Azure Blob Storage to send
    // Content-Disposition: attachment so the browser downloads instead of previewing.
    const sep = url.includes('?') ? '&' : '?'
    const directUrl = `${url}${sep}response-content-disposition=${encodeURIComponent(`attachment; filename*=UTF-8''${encodeURIComponent(filename)}`)}`
    return Response.redirect(directUrl, 302)
  }
}
