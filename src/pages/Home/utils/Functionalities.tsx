// Andrew please check this
// @ts-nocheck 

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import backgroundImage from "assets/images/appCurvyLines.png"
import graphIcon from "assets/images/graphIcon.png"
import StepByStepIcon from "assets/images/StepByStepIcon.jpg"
import historyIcon from "assets/images/historyIcon.jpg"
import LenseIcon from "assets/images/LenseIcon.png"
import { Paper } from '@mui/material';

import {useTranslation} from "react-i18next";

const item = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

function ProductValues() {
    const text_color = '#3c4e76';
    const [t] = useTranslation('translation');
    return (
        <Container maxWidth="lg">
            <Paper sx={{ width: "100%" }} elevation={3}>
                <Box
                    sx={{
                        background: `url(${backgroundImage})`,
                        backgroundColor: '#E4EFE7',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        pt: 6,
                        pb: 6,
                        minHeight: 400,
                    }}
                >
                    <Container maxWidth="xl">
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={graphIcon}
                                        alt="graph icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        {t("homepage.first_paper_header")}
                                    </Typography>
                                    <Typography variant="h5" color={text_color} align="center">
                                        {t("homepage.first_paper_text")}    
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={StepByStepIcon}
                                        alt="step by step icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        {t("homepage.second_paper_header")}
                                    </Typography >
                                    <Typography variant="h5" color={text_color} align="center">
                                        {t("homepage.second_paper_text")}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={historyIcon}
                                        alt="history icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        {t("homepage.third_paper_header")} 
                                    </Typography>
                                    <Typography variant="h5" color={text_color} align="center">
                                        {t("homepage.third_paper_text")} 
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={LenseIcon}
                                        alt="history icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        {t("homepage.fourth_paper_header")}
                                    </Typography>
                                    <Typography variant="h5" color={text_color} align="center">
                                        {t("homepage.fourth_paper_text")} 
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Paper>
        </Container>
    );
}

export default ProductValues;