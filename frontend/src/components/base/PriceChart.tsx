import React, {useState} from "react";
import {CompanyDTO, useTicker} from "../../hooks/useTicker";

type PriceChartProps = {
    ticker: string
}

const dp:{
    [key: string]: CompanyDTO
} = {}
export const PriceChart = ({ticker}: PriceChartProps) => {
    const [companyDetails, setCompanyDetails] = useState<CompanyDTO | null>(null)
    const {getCompany} = useTicker();
    React.useEffect(() => {
        if (Object.keys(dp).includes(ticker)){
            setCompanyDetails(dp[ticker])
            return
        }
        getCompany(ticker).then((data)=> {
            if (data)
                dp[ticker] = data
            setCompanyDetails(data)
        })
    }, [ticker])
    return <div>
        {companyDetails?.info.name}
    </div>
}