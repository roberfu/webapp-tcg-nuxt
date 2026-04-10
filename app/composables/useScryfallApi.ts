export const useScryfallApi = () => {
    const BASE = 'https://api.scryfall.com/cards'

    const toProxyUrl = (url: string) => `/api/proxy?url=${encodeURIComponent(url)}`

    const searchCards = async (name: string) => {
        const data: any = await $fetch(`${BASE}/search`, {
            params: {
                q: name,
                unique: 'cards',
                pageSize: 12
            }
        })
        
        const cards = data.data as any[]
        
        return cards
            .filter(card => {
                if (card.image_uris?.large || card.image_uris?.normal) return true
                if (card.card_faces?.[0]?.image_uris?.large || card.card_faces?.[0]?.image_uris?.normal) return true
                return false
            })
            .map(card => {
                const imageUris = card.image_uris || card.card_faces?.[0]?.image_uris
                return {
                    id: card.id,
                    name: card.name,
                    imageUrl: toProxyUrl(imageUris?.large || imageUris?.normal || imageUris?.png)
                }
            })
    }

    return { searchCards }
}