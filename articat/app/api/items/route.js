import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request) {
    let items
    const {searchParams} = new URL(request.url)
    const category = searchParams.get('category')
    const searchValue = searchParams.get('searchValue')
    const featured = searchParams.get('featured')
    console.log(`api searchValue ${searchValue}`)
    if (category) {
        items = await ArtiCatRepo.getItems(category)
    } else if (searchValue) {
        // items = await ArtiCatRepo.getSearchItems(searchValue)
        items = await ArtiCatRepo.getAllItems()
    } else if (featured) {
        items = await ArtiCatRepo.getFeatured()
    } else {
        items = await ArtiCatRepo.getAllItems()
    }

   
    return new Response(JSON.stringify(items), {
        status: 200
    })
}

export async function POST(request) {
    const item = await request.json()
    const newItem = await ArtiCatRepo.addItem(item)
  

    return new Response(JSON.stringify(newItem), {
        status: 200
    })
}

export const dynamic = "force-dynamic";
