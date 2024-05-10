import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function POST(request) {

    const purchase = await request.json()

    const newPurchase = await ArtiCatRepo.addPurchase(purchase)

    return  Response.json(newPurchase, {
        status: 200
    })

    
}