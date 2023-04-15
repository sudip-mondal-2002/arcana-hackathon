import React from 'react';
import {Search} from "./components/base/Search";

function App() {
  return (
    <div>
      <Search list={["a", "b", "c"]} placeholder={"Search"} />
    </div>
  );
}

export default App;
