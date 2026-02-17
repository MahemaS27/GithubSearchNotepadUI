// https://api.github.com/repos/{owner}/{repo}

import { useEffect, useState } from "react";
import { Repository } from "./useGithubSearch";

export function useRepoDetails(owner:string, repoName:string){
    const [data, setData] = useState<Repository|undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    // use effect for fetching
    useEffect(()=>{
        if(!owner || !repoName){
           return
        }
        const fetchRepo = async () => {
            setLoading(true)
            setError(undefined)

            try{
                const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}`)
                if(!response.ok){
                    setError(`Error on fetching repo: ${response.status}`)
                } else{
                    const result = await response.json()
                    setData(result as Repository)
                    setLoading(false)
                }


            } catch(e){
                console.log(e)
                setError(`Error: ${e}`)
            }
        }
        fetchRepo()
    },[owner, repoName])

    return {data: data, loading: loading, error:error}

}