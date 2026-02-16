import { useState, useEffect } from 'react'

// in general use this!

export type Repository = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  owner: {
    login: string
    avatar_url: string
    url: string
  } 
}

type GithubRepoSearchResponse = {
    total_count: number
    items: Repository[]
}

export function useGithubSearch(query: string) {
    const [data, setData] = useState<Repository[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)


    // write the use Effect for actually fetching the data
    useEffect(()=> {
        // if theres no query stop
        if (!query){
            return
        }
        const fetchRepos = async () => {
            setLoading(true)
            setError(undefined)

        try{
            const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&page=1&per_page=20`)
            if (!response.ok){
                setError(`Error: ${response.status}`)
            }
            else{
                const result:GithubRepoSearchResponse = await response.json()
                setData(result.items)
            }
        } catch (error){
            console.log(error)
            setError(`Error: ${error}`)
        }
    }
    fetchRepos()
    },[query])

    return {data: data, loading: loading, error:error}
}