export type BadgeShape = 'circle' | 'diamond' | 'hexagon'

const CORNER_RADIUS = 16
const SITE_URL = 'tcgcollage.com'

const hexToRgb = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
})

export const useCollageGenerator = () => {

    const loadImg = (url: string, retries = 2): Promise<HTMLImageElement | null> =>
        new Promise(resolve => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = async () => {
                if (retries > 0) {
                    await new Promise(r => setTimeout(r, 600))
                    loadImg(url, retries - 1).then(resolve)
                } else {
                    resolve(null)
                }
            }
            img.src = `/api/image-proxy?url=${encodeURIComponent(url)}`
        })

    const loadImages = async (cards: { imageUrl: string }[]): Promise<(HTMLImageElement | null)[]> => {
        const images: (HTMLImageElement | null)[] = []
        for (let i = 0; i < cards.length; i += 4) {
            const batch = cards.slice(i, i + 4)
            const results = await Promise.all(batch.map(c => loadImg(c.imageUrl)))
            images.push(...results)
        }
        return images
    }

    const drawBadgePath = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, shape: BadgeShape) => {
        ctx.beginPath()
        switch (shape) {
            case 'circle':
                ctx.arc(x, y, r, 0, Math.PI * 2)
                break
            case 'diamond':
                ctx.moveTo(x, y - r)
                ctx.lineTo(x + r, y)
                ctx.lineTo(x, y + r)
                ctx.lineTo(x - r, y)
                ctx.closePath()
                break
            case 'hexagon':
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3 - Math.PI / 2
                    ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle))
                }
                ctx.closePath()
                break
        }
    }

    const generate = async (
        canvas: HTMLCanvasElement,
        cards: { name: string; imageUrl: string; quantity: number }[],
        opts: { cols: number; gap: number; bg: string; badgeColor?: string; borderColor?: string; badgeShape?: BadgeShape },
        preloadedImages?: (HTMLImageElement | null)[],
        separatorRows?: number,
        fixedCardW?: number,
        fixedCardH?: number,
    ) => {
        const { cols, gap, bg, badgeColor = '#c0392b', borderColor = '#ffffff', badgeShape = 'circle' } = opts

        const images = preloadedImages ?? await loadImages(cards)

        const firstImg = images.find(img => img !== null)
        if (!firstImg) return

        const cardW = fixedCardW ?? firstImg.naturalWidth
        const cardH = fixedCardH ?? firstImg.naturalHeight

        const actualCols = Math.min(cols, cards.length)
        const rows = Math.ceil(cards.length / actualCols)
        const numSeps = separatorRows ? Math.floor((rows - 1) / separatorRows) : 0
        const sepH = numSeps > 0 ? Math.max(gap * 4, 40) : 0
        const emptySlots = (actualCols * rows) - cards.length
        const W = actualCols * cardW + (actualCols - 1) * gap + gap * 2
        const totalCardsHeight = rows * cardH + (rows - 1) * gap + gap * 2 + numSeps * sepH

        const footerFontSize = Math.round(W * 0.04)
        const footerHeight = Math.round(footerFontSize * 1.3)
        const H = totalCardsHeight + footerHeight

        const getCardY = (row: number) => {
            const sepsAbove = separatorRows ? Math.floor(row / separatorRows) : 0
            return gap + row * (cardH + gap) + sepsAbove * sepH
        }

        canvas.width = W
        canvas.height = H
        const ctx = canvas.getContext('2d')!

        // Calcular color de texto adaptativo según luminancia del fondo
        const { r, g, b } = hexToRgb(bg)
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b
        const urlTextColor = luminance > 128 ? '#111827' : '#f9fafb'

        // Rellenar esquinas con bg antes del clip (JPG no soporta transparencia)
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, W, H)

        // Clip redondeado para todo el contenido
        ctx.save()
        ctx.beginPath()
        ctx.roundRect(0, 0, W, H, CORNER_RADIUS)
        ctx.clip()

        // Fondo interior
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, W, H)

        // Dibujar bandas de separación con color de fondo de la página
        if (separatorRows && numSeps > 0) {
            ctx.fillStyle = '#1f2937'
            for (let s = 1; s <= numSeps; s++) {
                const lastRowOfChunk = s * separatorRows - 1
                if (lastRowOfChunk >= rows) break
                const sepYStart = getCardY(lastRowOfChunk) + cardH
                ctx.fillRect(0, sepYStart, W, gap + sepH)
            }
        }

        cards.forEach((card, i) => {
            const col = i % actualCols
            const row = Math.floor(i / actualCols)
            const x = gap + col * (cardW + gap)
            const y = getCardY(row)

            if (images[i]) {
                ctx.drawImage(images[i]!, x, y, cardW, cardH)
            } else {
                ctx.fillStyle = '#2a2a2a'
                ctx.fillRect(x, y, cardW, cardH)
                ctx.fillStyle = '#666'
                ctx.font = `${Math.round(cardW * 0.06)}px sans-serif`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(card.name, x + cardW / 2, y + cardH / 2)
                ctx.textBaseline = 'alphabetic'
            }

            const bx = x + cardW / 2
            const by = y + cardH - Math.round(cardW * 0.095)
            const badgeR = Math.round(cardW * 0.08)
            drawBadgePath(ctx, bx, by, badgeR, badgeShape)
            ctx.fillStyle = badgeColor
            ctx.fill()
            ctx.strokeStyle = borderColor
            ctx.lineWidth = Math.max(1, Math.round(badgeR * 0.18))
            ctx.stroke()
            ctx.fillStyle = borderColor
            ctx.font = `bold ${Math.round(badgeR * 1.2)}px sans-serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(String(card.quantity), bx, by)
        })

        // Footer con texto "tcgcollage.com" (siempre visible, pegado a la derecha)
        ctx.fillStyle = bg
        ctx.fillRect(0, H - footerHeight, W, footerHeight)
        ctx.fillStyle = urlTextColor + '33' // alpha 0.2
        ctx.font = `bold ${footerFontSize}px sans-serif`
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(SITE_URL, W - gap, H - footerHeight / 2)

        ctx.restore()
    }

    const getTimestamp = () => {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        return `${day}${month}${year}${hours}${minutes}${seconds}`
    }

    const downloadCanvas = (canvas: HTMLCanvasElement, type: 'pokemon' | 'magic', timestamp: string, index?: number, total?: number) => {
        const suffix = index !== undefined && total !== undefined && total > 1 ? `_${index}de${total}` : ''
        const filename = `collage_${type}_${timestamp}${suffix}.jpg`
        const a = document.createElement('a')
        a.download = filename
        a.href = canvas.toDataURL('image/jpeg', 0.85)
        a.click()
    }

    const download = (canvas: HTMLCanvasElement, type: 'pokemon' | 'magic' = 'pokemon') => {
        downloadCanvas(canvas, type, getTimestamp())
    }

    const downloadAll = async (
        cards: { name: string; imageUrl: string; quantity: number }[],
        opts: { cols: number; gap: number; bg: string; badgeColor?: string; borderColor?: string; badgeShape?: BadgeShape },
        type: 'pokemon' | 'magic',
        chunkRows = 3
    ) => {
        const cardsPerFile = opts.cols * chunkRows
        const images = await loadImages(cards)
        const timestamp = getTimestamp()

        const chunks: { cards: typeof cards; images: (HTMLImageElement | null)[] }[] = []
        for (let i = 0; i < cards.length; i += cardsPerFile) {
            chunks.push({
                cards: cards.slice(i, i + cardsPerFile),
                images: images.slice(i, i + cardsPerFile),
            })
        }

        for (let i = 0; i < chunks.length; i++) {
            const tempCanvas = document.createElement('canvas')
            await generate(tempCanvas, chunks[i].cards, opts, chunks[i].images)
            downloadCanvas(tempCanvas, type, timestamp, i + 1, chunks.length)
            if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 300))
        }
    }

    const downloadPDF = async (
        cards: { name: string; imageUrl: string; quantity: number }[],
        opts: { gap: number; bg: string; badgeColor?: string; borderColor?: string; badgeShape?: BadgeShape },
        type: 'pokemon' | 'magic',
        onProgress?: (msg: string) => void
    ) => {
        const { jsPDF } = await import('jspdf')
        const images = await loadImages(cards)

        const validCards = cards.filter((_, i) => images[i] !== null)
        const validImages = images.filter(img => img !== null)

        if (validCards.length === 0) {
            onProgress?.('No images found')
            return
        }

        const cardsPerPage = 9
        const totalPages = Math.ceil(validCards.length / cardsPerPage)

        const refImg = validImages.find(img => img !== null)
        const refCardW = refImg?.naturalWidth ?? 0
        const refCardH = refImg?.naturalHeight ?? 0

        let pdf: jsPDF | null = null

        for (let p = 0; p < totalPages; p++) {
            onProgress?.(`Page ${p + 1} of ${totalPages}...`)
            const startIdx = p * cardsPerPage
            const pageCards = validCards.slice(startIdx, startIdx + cardsPerPage)
            const pageImages = validImages.slice(startIdx, startIdx + cardsPerPage)

            const tempCanvas = document.createElement('canvas')
            await generate(tempCanvas, pageCards, { cols: 3, ...opts }, pageImages, undefined, refCardW, refCardH)

            if (tempCanvas.width === 0 || tempCanvas.height === 0) continue

            const imgData = tempCanvas.toDataURL('image/jpeg', 0.80)

            if (!pdf) {
                pdf = new jsPDF({
                    orientation: tempCanvas.width > tempCanvas.height ? 'landscape' : 'portrait',
                    unit: 'px',
                    format: [tempCanvas.width, tempCanvas.height],
                })
            } else {
                pdf.addPage([tempCanvas.width, tempCanvas.height], tempCanvas.width > tempCanvas.height ? 'landscape' : 'portrait')
            }
            pdf.addImage(imgData, 'JPEG', 0, 0, tempCanvas.width, tempCanvas.height)
        }

        if (pdf) {
            const timestamp = getTimestamp()
            pdf.save(`collage_${type}_${timestamp}.pdf`)
        }
        onProgress?.('PDF ready')
    }

    return { generate, download, downloadAll, downloadPDF }
}
