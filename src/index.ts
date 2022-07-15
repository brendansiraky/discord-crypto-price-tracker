import DiscordJs from 'discord.js'
import Cron from 'cron'
import fetch from 'node-fetch'

import { config } from '../config'

export const client = new DiscordJs.Client({
    intents: []
})

client.login(config.TOKEN)

client.on('ready', async () => {
    console.log('Price Tracker Bot Connected!')
})

type PriceResult = {
    mins: number
    price: string
}

const priceBot = async () => {

    async function setPrice() {
        try {
            const response = await fetch(`${config.ENDPOINT}${config.SYMBOL_TICKER}`)
            const result = await response.json() as PriceResult

            if (!result.price) throw new Error('Price Not Found.')

            if (result.price) {
                client.user?.setPresence({ activities: [{ name: `- $${Number(result.price).toFixed(5)}`, type: 'WATCHING' }], status: 'online' })
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    client.on('ready', async () => {
        setPrice()

        new Cron.CronJob(
            `*/${config.PRICE_UPDATE_IN_MINUTES} * * * *`,
            async function () {
                setPrice()
            },
            null,
            true,
        )
    })
}

priceBot()