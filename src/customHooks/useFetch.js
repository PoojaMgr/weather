import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData]  = useState(null)

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((val) => setData(val))
    }, [url])

    return data;
}