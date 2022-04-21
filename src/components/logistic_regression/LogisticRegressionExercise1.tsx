import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import { TextField, Grid } from '@mui/material';
import { sigmoid } from 'components/logistic_regression/LogisticRegressionCore';

import Img1 from 'assets/images/LogisticRegressionEx1_1.png';
import Img2 from 'assets/images/LogisticRegressionEx1_2.png';
import Img3 from 'assets/images/LogisticRegressionEx1_3.png';
import Img4 from 'assets/images/LogisticRegressionEx1_4.png';


function getCorrectAnswers(w_1: number, w_2: number, b: number): { [id: string]: string }[] {
    let result: { [id: string]: string }[] = []
    const x_values = [[153, 173], [93, 83], [81, 124], [90, 18]]
    x_values.forEach(elem => {
        let z = w_1 * elem[0] + w_2 * elem[1] + b;
        let y = sigmoid(z);
        let type = y >= 0.5 ? 1 : 0;
        result.push(
            {
                "logreg image": "n.a",
                "logreg x1": elem[0].toString(),
                "logreg x2": elem[1].toString(),
                "logreg z": z.toString(),
                "logreg y": y.toString(),
                "logreg type": type.toString(),
            }
        );
    })
    return result;
}

function getColumnsRow(): any[] {
    const column_headers = [
        <MathJax style={mathJaxStyle} inline>{"\\(Image\\)"}</MathJax>,
        <MathJax style={mathJaxStyle} inline>{"\\(x_1\\)"}</MathJax>,
        <MathJax style={mathJaxStyle} inline>{"\\(x_2\\)"}</MathJax>,
        <MathJax style={mathJaxStyle} inline>{"\\(z = w_1 * x_1 + w_2 * x_2 + b\\)"}</MathJax>,
        <MathJax style={mathJaxStyle} inline>{"\\(y = \\sigma(z)\\)"}</MathJax>,
        <div>
            <MathJax style={mathJaxStyle} inline>{"\\(Type\\)"}</MathJax>
            <Typography>(0 for forest 1 for city)</Typography>
        </div>
    ];
    return makeRowFromArray(column_headers);
}

function makeRowFromArray(array: any[]): any[] {
    let row = [];
    const column_sizes = [2, 1, 1, 4, 2, 2];
    for (var i = 0; i < 6; ++i) {
        row.push(
            <Grid item xs={column_sizes[i]}>
                {array[i]}
            </Grid>)
    }
    return row;
}

function getRow(index: number): any[] {
    const x_values = [[153, 173], [93, 83], [81, 124], [90, 18]]
    const row_images = [
        <Box component="img"
            sx={{ height: "100%", width: "100%" }}
            alt="image of a city"
            src={Img1}
        />,
        <Box component="img"
            sx={{ height: "100%", width: "100%" }}
            alt="image of a forest"
            src={Img2}
        />,
        <Box component="img"
            sx={{ height: "100%", width: "100%" }}
            alt="image of a city"
            src={Img3}
        />,
        <Box component="img"
            sx={{ height: "100%", width: "100%" }}
            alt="image of a forest"
            src={Img4}
        />,
    ]
    const row_values = [
        row_images[index],
        <TextField label="" type="number" disabled value={x_values[index][0]} />,
        <TextField label="" type="number" disabled value={x_values[index][1]} />,
        <TextField label="" type="number" fullWidth />,
        <TextField label="" type="number" />,
        <TextField label="" type="number" />,
    ];
    return makeRowFromArray(row_values);
}

function CustomTable() {



    const first_row = getColumnsRow()

    return (
        <Grid container rowSpacing={0} columnSpacing={0}>
            {first_row}
            {getRow(0)}
            {getRow(1)}
            {getRow(2)}
            {getRow(3)}
        </Grid>
    )
}

export default function LogisticRegressionExercise1() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const [w_1, setW1] = React.useState(0);
    const [w_2, setW2] = React.useState(0);
    const [b, setB] = React.useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>Logistic Regression Exercise 1</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    Now that we know the basics of linear regression, let's do an exercise together.
                    <br />
                    We are given images and 2 features for every image :
                    <br />
                    <br />
                    1. <MathJax style={mathJaxStyle} inline>{"\\(x_1\\)"}</MathJax> the average value of the red pallet in the image.
                    <br />
                    2. <MathJax style={mathJaxStyle} inline>{"\\(x_2\\)"}</MathJax> the average value of the blue pallet in the image.
                    <br />
                    <br />
                    <br />
                    <MathJax style={{ fontSize: "30px" }} inline>{"\\(\\vec{w} = \\)"}</MathJax>
                    <TextField label="w1" type="number" onChange={event => setW1(Number(event.target.value))} sx={{ width: 100 }} />
                    <TextField label="w2" type="number" onChange={event => setW2(Number(event.target.value))} sx={{ width: 100 }} />
                    <br />
                    <br />
                    <MathJax style={{ fontSize: "30px" }} inline>{"\\(b = \\)"}</MathJax>
                    <TextField label="b" type="number" onChange={event => setB(Number(event.target.value))} sx={{ width: 100 }} />
                    <br />
                    <br />
                    <br />
                    <CustomTable />
                    <br />
                    <br />
                    <br />
                </Typography>
            </MathJaxContext>
        </Box>
    );
}
