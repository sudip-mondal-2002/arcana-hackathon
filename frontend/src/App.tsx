import React from 'react';
import {Search} from "./components/base/Search";
import StockNames from "./data/StockNames.json";
import {PriceChart} from "./components/base/PriceChart";

function App() {
    const [ticker, setTicker] = React.useState<string>("");
    return (
        <div>
            <Search list={StockNames} placeholder={"Search"} onChange={(v) => {
                setTicker(v);
            }}/>
            <PriceChart ticker={ticker}/>
        </div>
    );
}

export default App;
