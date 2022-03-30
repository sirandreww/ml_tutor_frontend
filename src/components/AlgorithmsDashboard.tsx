import React from 'react';
import Container from '@mui/material/Container';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import AlgorithmStepper from 'components/AlgorithmStepper';

const gd_steps: string[] = [
  "1d_int",
  "1d_vis",
  "1d_sbs",
  "1d_hyp",
  "2d_int",
  "2d_vis",
  "2d_sbs",
  "2d_hyp"
];

const lr_steps: string[] = [
  "1d_int",
  "1d_vis",
];

const log_reg_steps: string[] = [
  "log_reg_step_1_title",
  "log_reg_step_2_title",
  "log_reg_step_3_title",
  "log_reg_step_4_title",
  "log_reg_step_5_title",
  "log_reg_step_6_title",
  "log_reg_step_7_title",
  "log_reg_step_8_title"
]

export default function AlgorithmsDashboard(props: { currentAlgorithmName: ("gd" | "lr" | "logreg"), currentStep: number, component: any }) {
  const [t] = useTranslation(['translation']);

  // isPreviousDisabled when step is 0
  let isPreviousDisabled = (props.currentStep === 0);

  var pathPrefix = ""
  var currentStepNames: string[] = []
  if (props.currentAlgorithmName === "gd") {
    currentStepNames = gd_steps
    pathPrefix = "/algorithms/gd";
  } else if (props.currentAlgorithmName === "lr") {
    currentStepNames = lr_steps
    pathPrefix = "/algorithms/lr";
  } else if (props.currentAlgorithmName === "logreg") {
    currentStepNames = log_reg_steps
    pathPrefix = "/algorithms/logreg";
  }

  // isNextDisabled when in last step
  let isNextDisabled = (props.currentStep === (currentStepNames.length));

  // previous path
  let previousPath = ''.concat(pathPrefix).concat((Math.max(1, props.currentStep - 1)).toString());

  // next path 
  let nextPath = isNextDisabled ? "/algorithms" : ''.concat(pathPrefix).concat((props.currentStep + 1).toString());

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        {/* stepper at top */}
        <AlgorithmStepper
          currentStep={props.currentStep}
          stepNames={currentStepNames}
          currentAlgorithmName={props.currentAlgorithmName}
        />


        {/* actual content */}
        <Box sx={{ width: '100%' }}>
          <Container maxWidth="md">
            <Box height={50} />
            {props.component}
            <Box height={50} />
          </Container>
        </Box>

        {/* slide managing code */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Link to={previousPath} style={{ textDecoration: 'none', color: "black" }}>
            <Button
              color="inherit"
              disabled={isPreviousDisabled}
              sx={{ mr: 1 }}
              variant='contained'
            >
              {t("back")}
            </Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Link to={nextPath} style={{ textDecoration: 'none', color: "black" }}>
            <Button
              variant='contained'
              color='info'>
              {isNextDisabled ? t("finish") : t("next")}
            </Button>
          </Link>
        </Box>
        <Box height={50} />

      </Container>
      <Footer />
    </div>
  );
}
