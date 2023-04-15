import {Container, TextField} from "@mui/material";
import React, {useState} from "react";

type SearchProps = {
    placeholder?: string,
    list: string[]
}

export const Search = ({list, placeholder}: SearchProps) => {
    const [searchList, setSearchList] = useState([...list]);
    const [searchText, setSearchText] = useState("");
    const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    React.useEffect(() => {
        if (searchText === "") {
            setSearchList([...list]);
        } else {
            setSearchList(list.filter((item) => item.includes(searchText)));
        }
    }, [searchText]);

    return <Container maxWidth={false} sx={{
        display: 'inline'
    }}>
        <TextField label="Search" variant="outlined" onChange={handlePromptChange}/>
    </Container>
}