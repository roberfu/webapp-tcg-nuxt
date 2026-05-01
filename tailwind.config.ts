import type { Config } from 'tailwindcss'

export default {
    content: [
        './app/**/*.{vue,ts}'
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#F5F3FF',
                    100: '#EDE9FE',
                    200: '#DDD6FE',
                    300: '#C4B5E0',
                    400: '#9B8BC5',
                    500: '#6B5B95',
                    600: '#5B4F8A',
                    700: '#3D3570',
                    800: '#2D2560',
                    900: '#1A1535',
                    950: '#0D0B1A',
                }
            }
        }
    }
} satisfies Config
