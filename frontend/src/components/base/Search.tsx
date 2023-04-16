import {Autocomplete, Container, TextField} from "@mui/material";
import React, {useState} from "react";

type SearchProps = {
    placeholder?: string,
    list: {
        ticker: string,
        name: string
    }[],
    onChange: (value: string) => void
}

export const Search = ({list, placeholder, onChange}: SearchProps) => {
    const [searchList, setSearchList] = useState(list.map((i)=>i.ticker.concat(": ").concat(i.name)));
    const [searchText, setSearchText] = useState("");

    React.useEffect(() => {
        if (!searchText) {
            setSearchList(list.map((i)=>i.ticker.concat(": ").concat(i.name)));
        } else {
            setSearchList(list.map((i)=>i.ticker.concat(": ").concat(i.name)).filter(i=>i.includes(searchText)));
        }
    }, [list, searchText]);

    return <Container sx={{
        marginTop: "50px",
        marginBottom: "10px"
    }}>
        <Autocomplete
            renderInput={(params) => <TextField
                {...params}
                label="Search"
                variant="outlined"
                placeholder={placeholder}
                sx={{
                    width: "80vw"
                }}
                inputProps={{
                    ...params.inputProps,
                    type: 'search'
                }}/>
            }
            options={searchList}
            sx={{width: 300}}
            freeSolo={true}
            disableClearable={true}
            onChange={(event, value) => {
                let ticker = ""
                list.forEach((i)=>{
                    if (value.startsWith(i.ticker.concat(":"))){
                        ticker = i.ticker
                    }
                })
                onChange(ticker)
                setSearchText(value);
            }}
            value={searchText}
            onClose={() => {
                setSearchText("")
            }}
        />
    </Container>
}