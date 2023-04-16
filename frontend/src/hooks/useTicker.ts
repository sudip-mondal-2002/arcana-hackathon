import Axios from "axios";
export type NEWS = {
    title: string,
    summary: string,
    sentiment: "positive" | "negative" | "neutral"
}

export type CompanyDTO = {w
    info: {
        name: string,
        country: string,
        sector: string,
        summary: string
    },
    officers: {
        [key: string]: string
    },
    history: number[],
    sentiment: number,
    news: NEWS[]
}

export const useTicker = () => {
    const getCompany = async (ticker: string) => {
        if (!ticker) return null
        const res = await Axios.get(`http://localhost:5000/company/${ticker}`)
        return res.data as CompanyDTO
    }

    return { getCompany }
}