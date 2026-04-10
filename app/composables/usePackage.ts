import pkg from '../../package.json' with { type: 'json' }

export const usePackage = () => {
    return {
        version: pkg.version || '0.0.5'
    }
}
