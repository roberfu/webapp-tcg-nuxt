export type BadgeShape = 'circle' | 'diamond' | 'hexagon'

export const useCollageGenerator = () => {

    const loadImg = (url: string): Promise<HTMLImageElement | null> =>
        new Promise(resolve => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            img.src = `/api/image-proxy?url=${encodeURIComponent(url)}`
        })

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
        opts: { cols: number; gap: number; bg: string; badgeColor?: string; borderColor?: string; badgeShape?: BadgeShape }
    ) => {
        const { cols, gap, bg, badgeColor = '#c0392b', borderColor = '#ffffff', badgeShape = 'circle' } = opts

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
    }

    const download = (canvas: HTMLCanvasElement, type: 'pokemon' | 'magic' = 'pokemon') => {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const year = now.getFullYear()
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        const filename = `collage_${type}_${day}${month}${year}${hours}${minutes}${seconds}.png`
        
        const a = document.createElement('a')
        a.download = filename
        a.href = canvas.toDataURL('image/png')
        a.click()
    }

    return { generate, download }
}