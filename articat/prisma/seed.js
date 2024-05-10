import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const usersPath = path.join(process.cwd(), 'app/data/users.json')
const itemsPath = path.join(process.cwd(), 'app/data/items.json')
const purchasesPath = path.join(process.cwd(), 'app/data/purchases.json')

async function main() {
    try {
        const users = await fs.readJSON(usersPath)
        const items = await fs.readJSON(itemsPath)
        const purchases = await fs.readJSON(purchasesPath)

        for (const user of users) {
            const {username, password, type, ...userInfo} = user
            const newUser = {
                username: username,
                password: password,
                type: type
            }
            await prisma.user.create({data: newUser})
            userInfo.username = username
            if (type === 'customer') await prisma.customer.create({data: userInfo})
            else if (type === 'seller') await prisma.seller.create({data: userInfo})
        } 

        for (const item of items) await prisma.item.create({ data: item })
        for (const purchase of purchases) await prisma.purchase.create({ data: purchase })

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })