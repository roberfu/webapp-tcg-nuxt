export const useCollage = () => {

    const loadImg = (url: string): Promise<HTMLImageElement | null> =>
        new Promise(resolve => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            img.src = url
        })

    const generate = async (
        canvas: HTMLCanvasElement,
        cards: { name: string; imageUrl: string; quantity: number }[],
        opts: { cols: number; gap: number; bg: string }
    ) => {
        const { cols, gap, bg } = opts

        const images = await Promise.all(cards.map(c => loadImg(c.imageUrl)))

        const firstImg = images.find(img => img !== null)
        if (!firstImg) return

        const cardW = firstImg.naturalWidth
        const cardH = firstImg.naturalHeight

        const rows = Math.ceil(cards.length / cols)
        const W = cols * cardW + (cols - 1) * gap + gap * 2
        const H = rows * cardH + (rows - 1) * gap + gap * 2

        canvas.width = W
        canvas.height = H
        const ctx = canvas.getContext('2d')!

        ctx.fillStyle = bg
        ctx.fillRect(0, 0, W, H)

        cards.forEach((card, i) => {
            const col = i % cols
            const row = Math.floor(i / cols)
            const x = gap + col * (cardW + gap)
            const y = gap + row * (cardH + gap)

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
            const by = y + cardH - Math.round(cardW * 0.07)
            const badgeR = Math.round(cardW * 0.08)
            ctx.beginPath()
            ctx.arc(bx, by, badgeR, 0, Math.PI * 2)
            ctx.fillStyle = '#c0392b'
            ctx.fill()
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = Math.max(1, Math.round(badgeR * 0.18))
            ctx.stroke()
            ctx.fillStyle = '#fff'
            ctx.font = `bold ${Math.round(badgeR * 1.2)}px sans-serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(String(card.quantity), bx, by)
        })
    }

    const download = (canvas: HTMLCanvasElement, filename = 'decklist.png') => {
        const a = document.createElement('a')
        a.download = filename
        a.href = canvas.toDataURL('image/png')
        a.click()
    }

    return { generate, download }
}