const ALLOWED_HOSTNAMES = [
    'images.pokemontcg.io',
    'images.scrydex.com',
    'cards.scryfall.io',
    'c1.scryfall.com',
]

export default defineEventHandler(async (event) => {
    const { url } = getQuery(event)

    if (!url || typeof url !== 'string')
        throw createError({ statusCode: 400, message: 'Missing url parameter' })

    let parsed: URL
    try {
        parsed = new URL(url)
    } catch {
        throw createError({ statusCode: 400, message: 'Invalid url parameter' })
    }

    if (!ALLOWED_HOSTNAMES.includes(parsed.hostname))
        throw createError({ statusCode: 403, message: 'Domain not allowed' })

    const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TCG-Collage/1.0)' }
    })

    if (!response.ok)
        throw createError({ statusCode: response.status, message: 'Failed to fetch image' })

    const contentType = response.headers.get('content-type') || 'image/png'
    const buffer = await response.arrayBuffer()

    setResponseHeader(event, 'Content-Type', contentType)
    setResponseHeader(event, 'Cache-Control', 'public, max-age=86400')

    return send(event, Buffer.from(buffer), contentType)
})
