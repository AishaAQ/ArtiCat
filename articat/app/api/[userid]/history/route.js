import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request, { params }) {
    
    const username= params.userid
    
    const items = await ArtiCatRepo.getHistory(username)
    
    
    return  Response.json(items, {
        status: 200
    })

}