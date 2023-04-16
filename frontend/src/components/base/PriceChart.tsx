import {VictoryAxis, VictoryChart, VictoryLine} from "victory";
import React from "react";
import {Transcript} from "../../hooks/useTicker";

type PriceChartProps = {
    data: number[],
    transcript: Transcript[]
}
export const PriceChart = ({data, transcript}: PriceChartProps)=>{

    const trend = transcript.map((t,i)=>{
        return {
            x: data.length + (i+1)*70 - transcript.length*70,
            y: (t.positive - t.negative)
        }
    })
    const maxTrend = Math.max(...trend.map(t=>t.y))
    const minTrend = Math.min(...trend.map(t=>t.y))
    const maxData = Math.max(...data)
    const minData = Math.min(...data)
    trend.forEach((t)=>{
        t.y = ((t.y-minTrend)/(maxTrend-minTrend))*(maxData-minData) +minData
    })

    return <VictoryChart>
        <VictoryLine interpolation={null} label={"prices"} data={data} />
        <VictoryLine interpolation={"catmullRom"} label={"prices"} data={trend} />
        <VictoryAxis dependentAxis={false} tickFormat={(t: number)=>Math.floor((new Date()).getFullYear() + t/250 - (data.length || 0)/250)}/>
        <VictoryAxis dependentAxis={true}/>
    </VictoryChart>
}