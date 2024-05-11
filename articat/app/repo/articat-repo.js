import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class articatRepo {

    async getUser(username) {

        return await prisma.user.findUnique({
            where: {
                username: username
            },
            include: {
                seller: true,
                customer: true
            }
        })
    }

    async getAllItems() {
        try {
            return await prisma.item.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }

    async getItems(category) {
        try {
            if (category === 'all')
                return prisma.item.findMany()

            return prisma.item.findMany({
                where: { category }
            })

        } catch (error) {
            return { error: error.message }
        }
    }


    async getFeatured() {
        try {
            return await prisma.item.findMany({
                where: {
                    featured: true
                }
            })
        } catch (error) {
            return { error: error.message }
        }

    }
    async getSearchItems(searchValue) {
        const search = searchValue.toLowerCase()
        try {

            return await prisma.item.findMany({
                where: {
                    quantity: { gt: 0 },
                    name: {
                        contains: search
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }

    }

    async getHistory(username) {
        const currentUser = await this.getUser(username)
        if (currentUser.type === 'customer') return this.getPurchaseHistory(username)
        else return this.getSaleHistory(username)
    }

    async getPurchaseHistory(currentUser) {
        try {
            return {
                purchases: await prisma.purchase.findMany({
                    where: {
                        customerUN: currentUser
                    },
                    include: {
                        item: {
                            include: {
                                seller: true
                            }
                        }
                    },
                    orderBy: {
                        date: 'desc'
                    }
                })
            }
        }
        catch (error) {
            return { error: error.message }
        }
    }

    async getSaleHistory(seller) {
        try {
            return {
                sales: await prisma.purchase.findMany({
                    where: {
                        item: {
                            sellerUN: seller
                        }
                    },
                    include: {
                        item: true,
                        customer: true
                    },
                    orderBy: {
                        date: 'desc'
                    }
                })
            }
        }
        catch (error) {
            return { error: error.message }
        }
    }

    async addItem(item) {
        try {
            return prisma.item.create({
                data: item
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getItem(itemId) {
        try {
            return await prisma.item.findUnique({
                where: { itemId },

                include: {
                    seller: true
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateItem(itemId, item) {
        try {
            return await prisma.item.update({
                where: { itemId },
                data: item
            })
        } catch (error) {
            return { error: error.message }
        }
    }


    async addPurchase(purchase) {
        try {
            return prisma.purchase.create({
                data: purchase
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateCustomer(username, customer) {
        try {
            return await prisma.customer.update({
                where: { username },
                data: customer
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getSellerItems(sellerUN) {
        try {
            return await prisma.item.findMany({
                where: { sellerUN }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getSellerAvailableItems(sellerUN) {
        try {
            return await prisma.item.findMany({
                where: {
                    AND: [
                        { sellerUN },
                        { quantity: { gt: 0 } }
                    ]
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getSellerSoldOutItems(sellerUN) {
        try {
            return await prisma.item.findMany({
                where: {
                    AND: [
                        { sellerUN },
                        { quantity: { lte: 0 } }
                    ]
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateItemClick(itemId) {
        try {
            return await prisma.item.update({
                where: { itemId },
                data: {
                    clicks: {
                        increment: 1,
                    },
                },
            });
        } catch (error) {
            return { error: error.message }
        }
    }

    //----------------FOR STATISTICS:---------------------------------------------------

    //Stat1: 1-	Total number of customers, companies, categories and products 

    async getTotalNumberOfCustomers() {
        try {
            return await prisma.customer.count()
        } catch (error) {
            return { error: error.message }
        }
    }

    async getTotalNumberOfSellers() {
        try {
            return await prisma.seller.count()
        } catch (error) {
            return { error: error.message }
        }
    }

    async getTotalNumberOfProducts() {
        try {
            return await prisma.item.count();

        } catch (error) {
            return { error: error.message }
        }

    }

    async getTotalNumberOfCategories() {
        try {
            const groupedCategories = await prisma.item.groupBy({
                by: ['category']
            })
            //length of array is no of categorires 
            return groupedCategories.length;
        } catch (error) {
            return { error: error.message }
        }
    }

    //Stat2: Top 3 most bought products over the last 6 months

    async getTop3PurchasedProducts() {
        const before6month = new Date();
        before6month.setMonth(before6month.getMonth() - 6)
        try {
            //group with item id and add all quantities
            return await prisma.purchase.groupBy({
                by: ['itemId'], _sum: { quantity: true },
                where: {
                    date: { gte: before6month },
                },
                orderBy: {
                    _sum: { quantity: 'desc' },
                },
                take: 3  //top3
            })
        } catch (error) {
            return { error: error.message };
        }
    }
    async getitemsDetails(itemIds) {
        try {
            const itemsDetails = []
            for (const item of itemIds) {
                const itemDetails = await prisma.item.findUnique({
                    where: { itemId: item.itemId }
                })
                itemsDetails.push({ ...itemDetails, totalQuantitySold: item._sum.quantity })
            }
            return itemsDetails;
        } catch (error) {
            return { error: error.message };
        }
    }

    //Stat3: Number Of Customers Per Country
    async getTotalNumberOfCustomersPerCountry() {
        try {
            //first get all customers
            const allCustomers = await prisma.customer.findMany()

            const countsPerCountry = {};
            allCustomers.forEach(customer => {
                const address = customer.shippingAddress.split(',');
                const country = address.length > 0 ? address[address.length - 1].trim() : 'Unknown';
                countsPerCountry[country] = (countsPerCountry[country] || 0) + 1;
            })
            return countsPerCountry;

        } catch (error) {
            return { error: error.message }
        }
    }

    //Stat4: Monthly revenue of each category
    async getMonthlyRevenueOfProductsByCategory() {

        try {

            return await prisma.$queryRaw`
                SELECT sum("totalPrice") "totalRevenue", "category", STRFTIME('%m-01-%Y',DATETIME(ROUND("date" / 1000), 'unixepoch')) "MONTH" FROM "Purchase" , "Item" WHERE "Purchase"."itemId"="Item"."itemid" AND DATETIME(ROUND("date" / 1000), 'unixepoch') > date(date(),'-12 months') GROUP BY "MONTH","category" ORDER BY "date"
            `

        } catch (error) {
            return { error: error.message };
        }
    }

    //Stat5: Top 5 Most Clicked Products
    async getTopFiveMostClickedProducts() {
        try {
            return await prisma.item.findMany({
                orderBy: {
                    clicks: 'desc'
                },
                take: 5
            })
        } catch (error) {
            return { error: error.message };
        }
    }

    //Stat6: Top 3 companies selling the most no. of products

    async getTop3Companies() {
        try {
            //group with item id and add all quantities
            return await prisma.item.groupBy({
                by: ['sellerUN'], _sum: { quantity: true },
                orderBy: {
                    _sum: { quantity: 'desc' },
                },
                take: 3  //top3
            })
        } catch (error) {
            return { error: error.message };
        }
    }

    async getCompanyDetails(companies) {
        try {
            const companyDetails = []
            for (const company of companies) {
                const companyDetail = await prisma.seller.findUnique({
                    where: { username: company.sellerUN },
                    select: {
                        companyName: true
                    }
                })
                companyDetails.push({ ...companyDetail, totalQuantity: company._sum.quantity })
            }
            return companyDetails;
        } catch (error) {
            return { error: error.message };
        }
    }

}

