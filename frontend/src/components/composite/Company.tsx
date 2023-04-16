import React, {useState} from "react";
import {CompanyDTO, useTicker} from "../../hooks/useTicker";
import {Card, Container, Grid, Skeleton, Typography} from "@mui/material";
import {PriceChart} from "../base/PriceChart";
import {GradientCircularProgress} from "react-circular-gradient-progress";

type PriceChartProps = {
    ticker: string
}


export const Company = ({ticker}: PriceChartProps) => {
    const [companyDetails, setCompanyDetails] = useState<CompanyDTO | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {getCompany} = useTicker();
    React.useEffect(() => {
        setIsLoading(true)
        getCompany(ticker).then((data) => {
            setCompanyDetails(data)
            setIsLoading(false)
        })
    }, [ticker])
    if (!ticker) {
        return <></>
    }
    if (isLoading) {
        return <Container>
            <Skeleton variant="rectangular" width={500} height={60} sx={{marginY: "15px"}}/>
            <Skeleton variant="rectangular" width={200} height={30} sx={{marginY: "15px"}}/>
            <Skeleton variant="rectangular" width={300} height={30} sx={{marginY: "15px"}}/>

            <Skeleton variant="rectangular" width={300} height={50}
                      sx={{marginY: "15px", marginRight: "15px", display: "inline-block"}}/>
            <Skeleton variant="rectangular" width={300} height={50}
                      sx={{marginY: "15px", marginRight: "15px", display: "inline-block"}}/>
            <Skeleton variant="rectangular" width={300} height={50}
                      sx={{marginY: "15px", marginRight: "15px", display: "inline-block"}}/>

            <Skeleton variant="rectangular" width={500} height={500} sx={{marginY: "15px", marginRight: "15px"}}/>
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

        <Typography>{companyDetails?.info.summary}</Typography>
        <PriceChart data={companyDetails?.history || []} transcript = {companyDetails?.transcript || []}/>
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "20px"
        }}>
            <Typography variant={"h3"} sx={{paddingY: "20px"}}>Top News</Typography>
            <span>
            <span style={{
                color: "#FFF",
            }}>
                <GradientCircularProgress
                    startColor="#F00"
                    middleColor="#FF0"
                    endColor="#0F0"
                    size={150}
                    strokeWidth={10}
                    withSnail={true}
                    progress={((companyDetails?.sentiment || 0) + 1) * 50}
                />
            </span>
                    <span>Market Sentiment: {companyDetails?.sentiment||0 > 0.4 ? "Positive" : companyDetails?.sentiment||0 < -0.4 ? "Negative" : "Neutral"}</span>
            </span>

        </div>
        <Grid container={true} spacing={4}>
            {companyDetails?.news.sort((a, b) => (a.summary.length + 2 * a.title.length) > (b.summary.length + 2 * b.title.length) ? 1 : -1).map((news, index) => {
                return <Grid key={index} item={true} xs={12} sm={6} md={4}>
                    <Card sx={{
                        backgroundColor: news.sentiment === "positive" ? "#88ff88" : news.sentiment === "negative" ? "#ff8888" : "#ffff88",
                        padding: "10px"
                    }}>
                        <Typography variant={"h6"}>{news.title}</Typography>
                        <Typography variant={"body1"}>{news.summary}</Typography>
                    </Card>
                </Grid>
            })}
        </Grid>
    </Container>
}