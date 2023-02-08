export default () => ({
    port: parseInt(process.env.PORT, 10) || 5001,
    crypto: {
        CMC_KEY: String(process.env.CMC_API_KEY || ''),
        CMC_URL: String(process.env.CMC_API_URL || ''),
        MAX_PAGINATION: Number(process.env.COIN_MAX_PAGINATION || 1000),
    },
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
});