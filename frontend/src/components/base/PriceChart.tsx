import React, {useState} from "react";
import {CompanyDTO, useTicker} from "../../hooks/useTicker";
import {Card, Container, Skeleton, Typography} from "@mui/material";
import {VictoryAxis, VictoryChart, VictoryLine} from "victory";

type PriceChartProps = {
    ticker: string
}


export const PriceChart = ({ticker}: PriceChartProps) => {
    const [companyDetails, setCompanyDetails] = useState<CompanyDTO | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {getCompany} = useTicker();
    React.useEffect(() => {
        setIsLoading(true)
        getCompany(ticker).then((data)=>{
            setCompanyDetails(data)
            setIsLoading(false)
        })
    }, [ticker])
    if (!ticker){
        return <></>
    }
    if (isLoading){
        return <Container>
            <Skeleton variant="rectangular" width={500} height={60} sx={{marginY: "15px"}} />
            <Skeleton variant="rectangular" width={200} height={30} sx={{marginY: "15px"}} />
            <Skeleton variant="rectangular" width={300} height={30} sx={{marginY: "15px"}} />

            <Skeleton variant="rectangular" width={300} height={50} sx={{marginY: "15px", marginRight: "15px", display: "inline-block"}} />
            <Skeleton variant="rectangular" width={300} height={50} sx={{marginY: "15px", marginRight: "15px", display: "inline-block"}} />
            <Skeleton variant="rectangular" width={300} height={50} sx={{marginY: "15px", marginRight: "15px", display: "inline-block"}} />

            <Skeleton variant="rectangular" width={500} height={500} sx={{marginY: "15px", marginRight: "15px"}} />
        </Container>
    }
    return <Container>
        <Typography variant={"h2"}>{companyDetails?.info.name}</Typography>
        <Typography variant={"h4"}>{companyDetails?.info.country}</Typography>
        <Typography variant={"h5"}>Sector: {companyDetails?.info.sector}</Typography>
        <hr/>
        {Object.keys(companyDetails?.officers || {} as object).map((k) => {
            return <Card key={k} sx={{
                border: "1px solid #AAA",
                display: "inline-block",
                marginRight: "10px",
                marginBottom: "10px",
                padding: "10px"
            }}>
                <Typography>{companyDetails?.officers[k]}</Typography>
                <Typography>{k}</Typography>
            </Card>
        })}
        <hr/>

        <Typography >{companyDetails?.info.summary}</Typography>
        <VictoryChart>
            <VictoryLine interpolation={null} label={"prices"} data={companyDetails?.history} />
            <VictoryAxis dependentAxis={false} tickFormat={(t: number)=>Math.floor((new Date()).getFullYear() + t/250 - (companyDetails?.history.length || 0)/250)}/>
            <VictoryAxis dependentAxis={true}/>
        </VictoryChart>
    </Container>
}