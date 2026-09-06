import "dotenv/config";

export const config = {
    port: Number(process.env.PORT) || 3000,

    security: {
        bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
        jwtSecret: process.env.JWT_SECRET!,
        jwtAccessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY,
        jwtRefreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    },

    ai: {
        openaiApiKey: process.env.OPENAI_API_KEY,
    }
}