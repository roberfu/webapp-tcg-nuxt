interface PokemonTcgCard {
    id: string
    name: string
    images: {
        small: string
        large: string
    }
}

interface PokemonTcgSet {
    id: string
}

interface PokemonTcgResponse<T> {
    data: T[]
}

export const usePokemonTcgApi = () => {
    const BASE = 'https://api.pokemontcg.io/v2'
    const setIdCache = new Map<string, string>()

    const getSetIdByPtcgoCode = async (ptcgoCode: string): Promise<string | null> => {
        if (setIdCache.has(ptcgoCode)) {
            return setIdCache.get(ptcgoCode)!
        }

        try {
            const data = await $fetch<PokemonTcgResponse<PokemonTcgSet>>(`${BASE}/sets`, {
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
            throw e
        }

        return null
    }

    const searchCards = async (name: string, ptcgoCode?: string, number?: string): Promise<CardResult[]> => {
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

        const data = await $fetch<PokemonTcgResponse<PokemonTcgCard>>(`${BASE}/cards`, {
            params: {
                q: query,
                pageSize: 12
            }
        })

        if (data.data.length > 0) {
            return data.data.map(card => ({
                id: card.id,
                name: card.name,
                imageUrl: card.images.large ?? card.images.small
            }))
        }

        if (ptcgoCode && number) {
            const fallbackData = await $fetch<PokemonTcgResponse<PokemonTcgCard>>(`${BASE}/cards`, {
                params: {
                    q: `name:${quotedName} number:${number}`,
                    pageSize: 12
                }
            })
            return fallbackData.data.map(card => ({
                id: card.id,
                name: card.name,
                imageUrl: card.images.large ?? card.images.small
            }))
        }

        return []
    }

    return { searchCards }
}