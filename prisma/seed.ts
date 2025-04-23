import { PrismaClient } from '../src/generated/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.appeal.createMany({
        data: [
            {
                title: 'Test Appeal',
                description: 'This is a test appeal',
            },
            {
                title: 'Test Appeal 2',
                description: 'This is a test appeal 2',
            },
        ],
    })

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