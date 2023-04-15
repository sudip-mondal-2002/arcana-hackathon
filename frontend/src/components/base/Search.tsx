import {Autocomplete, Container, TextField} from "@mui/material";
import React, {useState} from "react";

type SearchProps = {
    placeholder?: string,
    list: string[],
    onChange: (value: string) => void
}

export const Search = ({list, placeholder, onChange}: SearchProps) => {
    const [searchList, setSearchList] = useState([...list]);
    const [searchText, setSearchText] = useState("");

    React.useEffect(() => {
        if (!searchText) {
            setSearchList([...list]);
        } else {
            setSearchList(list.filter((item) => item.includes(searchText)));
        }
    }, [list, searchText]);

    return <Container maxWidth={false} sx={{
        display: 'inline'
    }}>
        <Autocomplete
            renderInput={(params) => <TextField
                {...params}
                label="Search"
                variant="outlined"
                placeholder={placeholder}
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
                onChange(value)
                setSearchText(value);
            }}
            value={searchText}
            onClose={()=>setSearchText("")}
        />
    </Container>
}