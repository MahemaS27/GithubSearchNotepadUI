import { useEffect, useState } from "react";
import { PostResponseData } from "./usePracticePostRequest";

export function usePracticePatchRequest(id: number, updates: Partial<PostResponseData>){
    const [data, setData] = useState<PostResponseData>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        if(!id){return}

        const patchResource = async() => {
            setLoading(true)
            setError(undefined)

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updates),
                    headers: {'Content-type': 'application/json; charset=UTF-8',}
                })
                if (!response.ok){
                    setError(`Error with patching resource:${response.status}`)
                } else{
                    const result = await response.json()
                    setLoading(false)
                    setData(result as PostResponseData)
                }
            } catch (e){
                setError(`Error patching resource: ${e}`)
                setLoading(false)
            }
        }
        patchResource()
    }, [id, updates])
    return {data: data, loading:loading, error:error}
}