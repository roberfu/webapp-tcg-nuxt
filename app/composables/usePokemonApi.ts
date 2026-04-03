export const usePokemonApi = () => {
    const BASE = 'https://api.pokemontcg.io/v2'

    const searchCards = async (name: string, setId?: string, number?: string) => {
        const quotedName = name.includes(' ') ? `"${name}"` : name
        let query = `name:${quotedName}`
        if (setId && number) {
            query = `name:${quotedName} set.ptcgoCode:${setId} number:${number}`
        }
        
        const data: any = await $fetch(`${BASE}/cards`, {
            params: {
                q: query,
                pageSize: 12
            }
        })
        
        const cards = data.data as any[]
        
        if (cards.length > 0) {
            return cards.map(card => ({
                id: card.id,
                name: card.name,
                imageUrl: card.images.large ?? card.images.small
            }))
        }
        
        if (setId && number) {
            const fallbackName = name.includes(' ') ? `"${name}"` : name
            const fallbackData: any = await $fetch(`${BASE}/cards`, {
                params: {
                    q: `name:${fallbackName}`,
                    pageSize: 12
                }
            })
            return (fallbackData.data as any[]).map(card => ({
                id: card.id,
                name: card.name,
                imageUrl: card.images.large ?? card.images.small
            }))
        }
        
        return []
    }

    return { searchCards }
}