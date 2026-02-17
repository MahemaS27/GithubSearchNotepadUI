import { useEffect, useState } from "react"

export type Contributor ={
    login: string
    id: number
    url: string
    contributions: number
}

export function useGetContributors(owner:string, repoName:string){
    const [data, setData] = useState<Contributor|undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(()=>{
        if(!owner || !repoName){return}

        const fetchContributors = async () =>{
            setLoading(true)
            setError(undefined)

            try{
                const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contributors`)
                if(!response.ok){
                    setError(`Error on fetching contributors: ${response.status}`)
                } else{
                    const result = await response.json()
                    setData(result)
                    setLoading(false)
                }
            } catch (e) {
                console.log(e)
                setError(`Error: ${e}`)
            }

        }
        fetchContributors()
    }, [owner, repoName])

  return {data: data, loading: loading, error:error}

}