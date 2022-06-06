import React from "react";
import { TextField } from "@mui/material";


export default function AnswerField(props: { label: string, type: string, isCorrect: Function, initalValue?: string, }) {

    function getColor(curr: string): ("success" | undefined) {
        if (props.isCorrect(curr)) {
            return "success";
        } else {
            return undefined;
        }
    }

    const [value, setValue] = React.useState(props.initalValue === undefined ? "" : props.initalValue);

    return (
        <TextField label={props.label} type="number" value={value} onChange={event => setValue(event.target.value)}
            error={(value !== "") && !props.isCorrect(value)}
            color={getColor(value)}
            focused={value !== ""}
        />
    );
}