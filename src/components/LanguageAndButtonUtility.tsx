import React from 'react';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BrushIcon from '@mui/icons-material/Brush';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import i18next from "i18next";


type eventHandler = { eventHandler: any }

export const languageAlign = () => {
    const lang = i18next.language
    return (lang === 'en') ? 'left' : 'right'
}

export const languageDirection = () => {
    const lang = i18next.language
    return (lang === 'en') ? 'ltr' : 'rtl'
}

export const languageReversedAlign = () => {
    const lang = i18next.language
    return (lang === 'en') ? 'left' : 'right'
}

export const languageReversedDirection = () => {
    const lang = i18next.language
    return (lang === 'en') ? 'ltr' : 'rtl'
}

export const button = ({eventHandler, type}: { eventHandler: any, type: string }) => {
    switch(type) {
        case 'play': return playButton({eventHandler})
        case 'train': return trainButton({eventHandler})
        case 'test': return testButton({eventHandler})
        case 'pause': return pauseButton({eventHandler})
        case 'stop': return stopButton({eventHandler})
        case 'prev': return prevButton({eventHandler})
        case 'next': return nextButton({eventHandler})
        case 'brush': return brushButton({eventHandler})
        default: return defaultButton({eventHandler})
    }
}

function playButton(handler: eventHandler) {
    return(
        <Tooltip title="Play" arrow>
            <IconButton data-testid="playButton" aria-label="delete" size="large" color="success" onClick={handler.eventHandler}>
                <PlayArrowIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function trainButton(handler: eventHandler) {
    return(
        <Tooltip title="Train" arrow>
            <IconButton data-testid="trainButton" aria-label="delete" size="large" color="warning" onClick={handler.eventHandler}>
                <ChangeCircleIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function testButton(handler: eventHandler) {
    return(
        <Tooltip title="Test" arrow>
            <IconButton data-testid="testButton" aria-label="delete" size="large" color="success" onClick={handler.eventHandler}>
                <QuizIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function pauseButton(handler: eventHandler) {
    return(
        <Tooltip title="Pause" arrow>
            <IconButton data-testid="pauseButton" aria-label="delete" size="large" onClick={handler.eventHandler}>
                <PauseIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function stopButton(handler: eventHandler) {
    return(
        <Tooltip title="Clear" arrow>
            <IconButton data-testid="stopButton" aria-label="delete" size="large" color="error" onClick={handler.eventHandler}>
                <ClearIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function prevButton(handler: eventHandler) {
    return(
        <Tooltip title="Previous" arrow>
            <IconButton data-testid="prevButton" aria-label="delete" size="large" color="warning" onClick={handler.eventHandler}>
                <ArrowBackIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function nextButton(handler: eventHandler) {
    return(
        <Tooltip title="Next" arrow>
            <IconButton data-testid="nextButton" aria-label="delete" size="large" color="warning" onClick={handler.eventHandler}>
                <ArrowForwardIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function brushButton(handler: eventHandler) {
    return(
        <Tooltip title="Draw" arrow>
            <IconButton data-testid="brushButton" aria-label="delete" size="large" color="warning" onClick={handler.eventHandler}>
                <BrushIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function defaultButton(handler: eventHandler) {
    return(
        <Button data-testid="defaultButton" aria-label="delete" size="large" color="error" onClick={handler.eventHandler}>
            default button - you may want to change it
        </Button>
    )
}


export const LeftItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    direction: 'ltr',
    color: theme.palette.text.secondary
}));

export const CenterItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export const RightItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "right",
    direction: 'rtl',
    color: theme.palette.text.secondary
}));

export const AlignedItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: languageAlign(),
    direction: languageDirection(),
    color: theme.palette.text.secondary
}));

export const BlackCenterAlignedLeftTextItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    direction: 'ltr',
    color: theme.palette.text.primary
}));

export const BlackAlignedItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: languageAlign(),
    direction: languageDirection(),
    color: theme.palette.text.primary
}));

export const BlackLeftItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    direction: 'ltr',
    color: theme.palette.text.primary
}));

export const mathJaxConfig = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
};

export const mathJaxStyle = { fontSize: '1.2em' }