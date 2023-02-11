export default () => ({
    port: parseInt(String(process.env.PORT || 5001)),
    env: String(process.env.NODE_ENV || 'development'),
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