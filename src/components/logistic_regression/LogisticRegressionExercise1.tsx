import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {LeftItem, mathJaxConfig, mathJaxStyle} from 'components/LanguageAndButtonUtility';
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


function MakeRowFromArray(props: { array: any[] }) {
    let row = [];
    const column_sizes = [2, 1, 1, 4, 2, 2];
    for (var i = 0; i < 6; ++i) {
        row.push(
            <Grid item xs={column_sizes[i]}>
                {props.array[i]}
            </Grid>)
    }
    return (<>{row}</>);
}

function ColumnsRow() {
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
    return (
        <MakeRowFromArray array={column_headers} />
    );
}



function GetRow(props: { index: number, correct_answer: { [id: string]: string } }) {
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
    const [z, setZ] = React.useState('');
    const handleZChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZ(event.target.value);
    };

    const [y, setY] = React.useState('');
    const handleYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setY(event.target.value);
    };

    const [t, setT] = React.useState('');
    const handleTChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setT(event.target.value);
    };

    function isError(a: string, b: string): boolean{
        const epsilon = 0.01;
        return (a !== "") && (Math.abs(Number(a) - Number(b)) > epsilon);
    }

    function isCorrect(a: string, b: string): boolean {
        return (a !== "") && (! isError(a, b));
    }

    function getColor(a: string, b: string): ("success" | undefined) {
        if (isCorrect(a, b)) {
            return "success";
        } else {
            return undefined;
        }
    }

    const row_values: any[] = [
        row_images[props.index],
        <TextField label="" type="number" disabled value={x_values[props.index][0]} />,
        <TextField label="" type="number" disabled value={x_values[props.index][1]} />,
        <TextField
            label="" type="number" fullWidth value={z} onChange={handleZChange}
            error={isError(z, props.correct_answer["logreg z"])}
            color={getColor(z, props.correct_answer["logreg z"])} 
            focused={z !== ""}
        />,
        <TextField label="" type="number" value={y} onChange={handleYChange}
            error={isError(y, props.correct_answer["logreg y"])}
            color={getColor(y, props.correct_answer["logreg y"])}
            focused={y !== ""}
        />,
        <TextField label="" type="number" value={t} onChange={handleTChange}
            error={isError(t, props.correct_answer["logreg type"])}
            color={getColor(t, props.correct_answer["logreg type"])}
            focused={t !== ""}
        />,
    ];

    return (
        <MakeRowFromArray array={row_values} />
    );
}

function CustomTable(props: { correct_answers: { [id: string]: string }[] }) {
    return (
        <Grid container rowSpacing={0} columnSpacing={0}>
            <ColumnsRow />
            <GetRow index={0} correct_answer={props.correct_answers[0]} />
            <GetRow index={1} correct_answer={props.correct_answers[1]} />
            <GetRow index={2} correct_answer={props.correct_answers[2]} />
            <GetRow index={3} correct_answer={props.correct_answers[3]} />
        </Grid>
    )
}

const translation_path = "logreg.pages.ex1"
export default function LogisticRegressionExercise1() {
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const [w_1, setW1] = React.useState(0.6);
    const [w_2, setW2] = React.useState(0.4);
    const [b, setB] = React.useState(-100);

    return (
        <Box sx={{ width: '100%' }}>
            <MathJaxContext version={3} config={mathJaxConfig}>
                <Typography component={'span'}>
                    <Typography sx={{ width: "100%", textAlign: 'center', direction: 'ltr' }}>
                        <h1 style={headers_style}>{t("logreg.pages.ex1_title")}</h1>
                    </Typography>
                    <br />
                    <br />
                    <br />
                    {t( translation_path.concat(".line_1"))}<br />
                    {t( translation_path.concat(".line_2"))}<br />
                    <br />
                    1. <MathJax style={mathJaxStyle} inline>{"\\(x_1\\)"}</MathJax> {t( translation_path.concat(".red_avg"))}<br />
                    2. <MathJax style={mathJaxStyle} inline>{"\\(x_2\\)"}</MathJax> {t( translation_path.concat(".blue_avg"))}<br />
                    <br />
                    <br />
                    <LeftItem>
                        <MathJax style={{ fontSize: "30px", color: 'black' }} inline>{"\\(\\vec{w} = \\)"}</MathJax>
                        <TextField label="w1" type="number" disabled value={w_1} onChange={event => setW1(Number(event.target.value))} sx={{ width: 100 }} />
                        <TextField label="w2" type="number" disabled value={w_2} onChange={event => setW2(Number(event.target.value))} sx={{ width: 100 }} />
                        <br />
                        <br />
                        <MathJax style={{ fontSize: "30px", color: 'black' }} inline>{"\\(b = \\)"}</MathJax>
                        <TextField label="b" type="number" disabled value={b} onChange={event => setB(Number(event.target.value))} sx={{ width: 100 }} />
                        <br />
                        <br />
                        <br />
                        <CustomTable correct_answers={getCorrectAnswers(w_1, w_2, b)} />
                    </LeftItem>
                </Typography>
            </MathJaxContext>
        </Box>
    );
}
