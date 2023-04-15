import Axios from "axios";

export type CompanyDTO = {
    info: {
        name: string,
        country: string,
        sector: string,
        summary: string
    },
    officers: {
        [key: string]: string
    },
    history: number[]
}

export const useTicker = () => {
    const getCompany = async (ticker: string) => {
        if (!ticker) return null
        const res = await Axios.get(`http://localhost:5000/company/${ticker}`)
        return res.data as CompanyDTO
    }

    return { getCompany }
}