export default {
    isProduction: process.env.NODE_ENV === 'production',
    serviceName: process.env.K_SERVICE || 'superfly-renderer',
    serviceRevision: process.env.K_REVISION || 'dev'
}