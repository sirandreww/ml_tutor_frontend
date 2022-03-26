import Container from '@mui/material/Container';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import AlgorithmStepper from 'pages/algorithms/dashboard/AlgorithmStepper';

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
  "1d_sbs",
  "1d_hyp",
  "2d_int",
  "2d_vis",
  "2d_sbs",
  "2d_hyp"
];

export default function AlgorithmsDashboard(props:
  { currentAlgorithmName: string, currentStep: number, component: any, previous: string, isPreviousDisabled: boolean, next: string, isNextDisabled: boolean, isStepSkipped: boolean}
) {
  const [t] = useTranslation(['translation']);

  var currentStepNames: string[] = []
  if (props.currentAlgorithmName === "gd") {
    currentStepNames = gd_steps
  } else if (props.currentAlgorithmName === "lr") {
    currentStepNames = lr_steps
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        {/* stepper at top */}
        <AlgorithmStepper
          currentStep={props.currentStep}
          stepNames={currentStepNames}
          isStepSkipped={props.isStepSkipped}
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
          <Link to={props.previous} style={{ textDecoration: 'none', color: "black" }}>
            <Button
              color="inherit"
              disabled={props.isPreviousDisabled}
              sx={{ mr: 1 }}
              variant='contained'
            >
              {t("back")}
            </Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Link to={props.next} style={{ textDecoration: 'none', color: "black" }}>
            <Button variant='contained' color='info'>
              {props.isNextDisabled ? t("finish") : t("next")}
            </Button>
          </Link>
        </Box>
        <Box height={50} />

      </Container>
      <Footer />
    </div>
  );
}

AlgorithmsDashboard.defaultProps = {
  isStepSkipped: false
}