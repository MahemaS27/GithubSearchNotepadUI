// not relevant to the project, im using for practice for my interview :)

import { useEffect, useState } from "react"

export type PostResponseData = {
    id: number
    title: string
    body:string,
    userID: number
}
export function usePracticePostRequest(title: string, body: string, userID:number){
    const [data, setData] = useState<PostResponseData>()
    const [loading, setLoading] =useState(false)
    const [error, setError] = useState<string>()

    useEffect(()=> {
        if(!userID){
                return
            }
        
        const createResource = async() => {
            setLoading(true)
            setError(undefined)

            try{

                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: title,
                        body: body,
                        userID: userID
                    }), 
                        headers: {
                         'Content-type': 'application/json; charset=UTF-8',
                         },
                    })
                if(!response.ok){
                    setError("Post response not okay")
                } else{
                    const result = await response.json()
                    setData(result as PostResponseData)
                    setLoading(false)
                }

            } catch (e) {
                setError(`Error creating new resource:${e}`)
                setLoading(false)
            }
        }
        createResource()
    }, [body, title, userID])
    return{data:data, loading:loading, error:error}
}