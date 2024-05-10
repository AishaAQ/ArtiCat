import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request, { params }) {

    const sellerUN = params.userid

    const {searchParams} = new URL(request.url)
    const category = searchParams.get('category')
    let items = []

    switch(category) {
        case 'available': items = await ArtiCatRepo.getSellerAvailableItems(sellerUN)
        break
        case 'sold-out': items = await ArtiCatRepo.getSellerSoldOutItems(sellerUN)
        break
        default: items = await ArtiCatRepo.getSellerItems(sellerUN)
    }

    

    return  Response.json(items, {
        status: 200
    })

}