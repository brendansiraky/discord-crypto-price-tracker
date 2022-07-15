import dotenv from 'dotenv'

dotenv.config()

export const config = {
    TOKEN: process.env.TOKEN,

    ENDPOINT: process.env.ENDPOINT,
    SYMBOL_TICKER: process.env.SYMBOL_TICKER,
    PRICE_UPDATE_IN_MINUTES: process.env.PRICE_UPDATE_IN_MINUTES
}