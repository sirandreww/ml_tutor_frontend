import React from "react";
import { TextField } from "@mui/material";

export function isStringNumeric(str: any) {
    if (typeof str != "string" || str === ''){
        return false // we only process strings!  
    } else {
        // @ts-ignore
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))// ...and ensure strings of whitespace fail
    }
}

export default function NumberTextField(props: {
    value: number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => (any),
    InputProps?: Partial<any>,
}) {
    const [currentValue, setValue] = React.useState(props.value.toString());
    /// function that checks that input is numeric before it calls on change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (isStringNumeric(event.target.value)){
            Number(event.target.value);
            props.onChange(event);
        }
    };
    return (
        <TextField autoFocus fullWidth value={currentValue} type="number" onChange={handleChange} InputProps={props.InputProps}/>
    );
}