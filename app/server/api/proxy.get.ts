const imageCache = new Map<string, { buffer: Buffer; contentType: string; timestamp: number }>()
const CACHE_TTL = 60 * 60 * 1000
const MAX_CACHE_SIZE = 100
const MAX_RETRIES = 3
const RETRY_DELAY = 500

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const imageUrl = query.url as string

    if (!imageUrl) {
        throw createError({ statusCode: 400, message: 'Missing url parameter' })
    }

    const allowedDomains = ['images.pokemontcg.io', 'cards.scryfall.io']
    let url: URL
    try {
        url = new URL(imageUrl)
    } catch {
        throw createError({ statusCode: 400, message: 'Invalid URL' })
    }

    if (!allowedDomains.includes(url.hostname)) {
        throw createError({ statusCode: 403, message: 'Domain not allowed' })
    }

    const cached = imageCache.get(imageUrl)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setResponseHeaders(event, {
            'Content-Type': cached.contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
            'X-Cache': 'HIT'
        })
        return cached.buffer
    }

    let lastError: Error | null = null
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const imageResponse = await fetch(imageUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TCG-Collage/1.0)' }
            })

            if (!imageResponse.ok) {
                throw new Error(`HTTP ${imageResponse.status}: ${imageResponse.statusText}`)
            }

            const arrayBuffer = await imageResponse.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const contentType = imageResponse.headers.get('content-type') || 'image/png'

            if (imageCache.size >= MAX_CACHE_SIZE) {
                const oldestKey = imageCache.keys().next().value
                if (oldestKey) imageCache.delete(oldestKey)
            }
            imageCache.set(imageUrl, { buffer, contentType, timestamp: Date.now() })

            setResponseHeaders(event, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600',
                'X-Cache': 'MISS'
            })

            return buffer
        } catch (error) {
            lastError = error as Error
            if (attempt < MAX_RETRIES) {
                await sleep(RETRY_DELAY * attempt)
            }
        }
    }

    throw createError({
        statusCode: 502,
        message: `Failed to fetch image after ${MAX_RETRIES} attempts: ${lastError?.message}`
    })
})
