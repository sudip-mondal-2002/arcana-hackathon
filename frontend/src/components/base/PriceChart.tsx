import {VictoryAxis, VictoryChart, VictoryLine} from "victory";
import React from "react";

type PriceChartProps = {
    data: number[]
}
export const PriceChart = ({data}: PriceChartProps)=>{
    return <VictoryChart>
        <VictoryLine interpolation={null} label={"prices"} data={data} />
        <VictoryAxis dependentAxis={false} tickFormat={(t: number)=>Math.floor((new Date()).getFullYear() + t/250 - (data.length || 0)/250)}/>
        <VictoryAxis dependentAxis={true}/>
    </VictoryChart>
}