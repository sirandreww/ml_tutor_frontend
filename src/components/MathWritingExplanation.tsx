import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { mathJaxConfig, mathJaxStyle } from 'components/LanguageAndButtonUtility';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";

const translation_path = "logreg.pages.intro"
export default function MathWritingExplanation() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const headers_style = { fontFamily: 'Arial, Helvetica, sans-serif' }
    const [t] = useTranslation('translation');

    const rows =
        [
            ["\\( e^x \\)", "exp(x)"],
            ["\\( cos(x) \\)", "cos(x)"],
            ["\\( sin(x) \\)", "sin(x)"],
            // ["\\( x^\) \\)", "sqrt(x)"],
        ];

    return (
        <Container maxWidth="md">
            <Box height={50} />
            Cheat sheet for math function notation:
            <Box height={50} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>function</TableCell>
                            <TableCell align="left">notation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) =>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">
                                    <MathJaxContext version={3} config={mathJaxConfig}>
                                        <MathJax style={mathJaxStyle} inline>{row[0]}</MathJax>
                                    </MathJaxContext>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography component={'span'}>
                                        {row[1]}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* How to write math functions ? <br /> */}
            {/* Let's take a look at some examples:<br /> */}
            {/* 1. for  write "exp(x)".< br /> */}
            {/* 2. for <MathJax style={mathJaxStyle} inline>{"\\(cos(x) \\)"}</MathJax> write "cos(x)".< br /> */}
            {/* 1. for exponents write "exp(x)" < br /> */}
            {/* {t(translation_path.concat(".description"))}<br /> */}
            < Box height={50} />


        </Container >
    );
}