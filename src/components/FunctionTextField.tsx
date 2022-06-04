import React from "react";
import { TextField } from "@mui/material";
import { create, all } from 'mathjs';
import { isStringNumeric } from "components/NumberTextField";

const math = create(all, {})

function isFunction(str: any, vars: ("x" | "xy")) {
    if (typeof str != "string" || str === '') {
        return false; // we only process strings!  
    } else {
        try {
            var isFunction = true;
            if (vars === "x") {
                // quick check
                isFunction = isFunction && (isStringNumeric(math.evaluate(str, { 'x': 0 }).toString()));
                // console.log("isFunction = ", isFunction)

                // check derivatives
                let dx = math.derivative(str, "x").toString();

                // check points
                for (let i = -3; i <= 3; i += 1) {
                    isFunction = isFunction && (isStringNumeric(math.evaluate(str, { 'x': i }).toString()));
                    isFunction = isFunction && (isStringNumeric(math.evaluate(dx, { 'x': i }).toString()));
                }
            } else if (vars === "xy") {
                // quick check
                isFunction = isFunction && (isStringNumeric(math.evaluate(str, { 'x': 0, 'y': 0 }).toString()));

                // check derivatives
                let dx = math.derivative(str, "x").toString();
                let dy = math.derivative(str, "y").toString();

                // check points
                for (let i = -3; i <= 3; i += 1) {
                    for (let j = -3; j <= 3; j += 1) {
                        isFunction = isFunction && (isStringNumeric(math.evaluate(str, { 'x': i, 'y': j }).toString()));
                        isFunction = isFunction && (isStringNumeric(math.evaluate(dx, { 'x': i, 'y': j }).toString()));
                        isFunction = isFunction && (isStringNumeric(math.evaluate(dy, { 'x': i, 'y': j }).toString()));
                    }
                }
            } else {
                return false;
            }
            return isFunction;
        } catch (e) {
            return false;
        }
    }
}

export default function FunctionTextField(props: {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => (any),
    vars: ("x" | "xy"),
    InputProps?: Partial<any>,
}) {
    const [currentValue, setValue] = React.useState(props.value);
    /// function that checks that input is numeric before it calls on change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        // console.log("event.target.value = ", event.target.value);
        if (isFunction(event.target.value, props.vars)) {
            // console.log("event.target.value = ", event.target.value, " passed checks!")
            props.onChange(event);
        }
    };

    return (
        <TextField autoFocus fullWidth value={currentValue} onChange={handleChange} InputProps={props.InputProps} />
    );
}