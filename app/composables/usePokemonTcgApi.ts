export const usePokemonTcgApi = () => {
    const BASE = 'https://api.pokemontcg.io/v2'
    const setIdCache = new Map<string, string>()

    const toProxyUrl = (url: string) => `/api/proxy?url=${encodeURIComponent(url)}`

    const getSetIdByPtcgoCode = async (ptcgoCode: string): Promise<string | null> => {
        if (setIdCache.has(ptcgoCode)) {
            return setIdCache.get(ptcgoCode)!
        }

        try {
            const data: any = await $fetch(`${BASE}/sets`, {
                params: {
                    q: `ptcgoCode:${ptcgoCode}`,
                    pageSize: 1
                }
            })

            if (data.data && data.data.length > 0) {
                const setId = data.data[0].id
                setIdCache.set(ptcgoCode, setId)
                return setId
            }
        } catch (e) {
            console.error(`Error fetching set ID for ${ptcgoCode}:`, e)
        }

        return null
    }

    const searchCards = async (name: string, ptcgoCode?: string, number?: string) => {
        const quotedName = name.includes(' ') ? `"${name}"` : name
        let query = `name:${quotedName}`

        if (ptcgoCode && number) {
            const setId = await getSetIdByPtcgoCode(ptcgoCode)
            if (setId) {
                query = `name:${quotedName} set.id:${setId} number:${number}`
            } else {
                query = `name:${quotedName} number:${number}`
            }
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
                imageUrl: toProxyUrl(card.images.large ?? card.images.small)
            }))
        }

        if (ptcgoCode && number) {
            const fallbackName = name.includes(' ') ? `"${name}"` : name
            const fallbackData: any = await $fetch(`${BASE}/cards`, {
                params: {
                    q: `name:${fallbackName} number:${number}`,
                    pageSize: 12
                }
            })
            return (fallbackData.data as any[]).map(card => ({
                id: card.id,
                name: card.name,
                imageUrl: toProxyUrl(card.images.large ?? card.images.small)
            }))
        }

        return []
    }

    return { searchCards }
}