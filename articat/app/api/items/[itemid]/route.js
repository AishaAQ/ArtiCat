import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request, { params }) {
    const itemId= params.itemid
    const item = await ArtiCatRepo.getItem(itemId)

    return  Response.json(item, {
        status: 200
    })

    
}

export async function PUT(request, { params }){
    const itemId= params.itemid
    const itemUpdate = await request.json()
    const updatedItems = await ArtiCatRepo.updateItem(itemId,itemUpdate)
    return Response.json(updatedItems, { status: 200 })
}