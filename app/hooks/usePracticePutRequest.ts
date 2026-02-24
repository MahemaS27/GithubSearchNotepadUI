import { useEffect, useState } from "react"

export type PutResponseData = {
     id: number
    title: string
    body:string,
    userID: number
}

export function usePracticePutRequest(title:string, body:string, postID:number, userID: string){
    const [data, setData] = useState<PutResponseData>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(()=> {
        if(!userID){
            return
        } 
        
        const putRequest = async() => {
            setLoading(true)
            setError(undefined)

            try{
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: postID,
                        title: title,
                        body:body,
                        userID: userID
                    }),
                    headers: {
                     'Content-type': 'application/json; charset=UTF-8',
                    }
                })

                if(!response.ok){
                    setError("Put response failed")
                } else{
                    const result = await response.json()
                    setData(result as PutResponseData)
                    setLoading(false)
                }
            } catch (e){
                setError(`Error updating resource ${e}`)
                setLoading(false)
            }
        }

        putRequest()
    },[body, postID, title, userID])
    return {data:data, loading: loading, error:error}
}