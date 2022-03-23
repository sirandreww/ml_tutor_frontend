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
import i18next from "i18next";


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

export const button = ({eventHandler, type}) => {
    switch(type) {
        case 'play': return playButton({eventHandler})
        case 'pause': return pauseButton({eventHandler})
        case 'stop': return stopButton({eventHandler})
        case 'prev': return prevButton({eventHandler})
        case 'next': return nextButton({eventHandler})
        case 'brush': return brushButton({eventHandler})
        default: return defaultButton({eventHandler})
    }
}

function playButton({eventHandler}) {
    return(
        <Tooltip title="Play" arrow>
            <IconButton aria-label="delete" size="large" color="success" onClick={eventHandler}>
                <PlayArrowIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function pauseButton({eventHandler}) {
    return(
        <Tooltip title="Pause" arrow>
            <IconButton aria-label="delete" size="large" onClick={eventHandler}>
                <PauseIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function stopButton({eventHandler}) {
    return(
        <Tooltip title="Clear" arrow>
            <IconButton aria-label="delete" size="large" color="error" onClick={eventHandler}>
                <ClearIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function prevButton({eventHandler}) {
    return(
        <Tooltip title="Previous" arrow>
            <IconButton aria-label="delete" size="large" color="warning" onClick={eventHandler}>
                <ArrowBackIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function nextButton({eventHandler}) {
    return(
        <Tooltip title="Next" arrow>
            <IconButton aria-label="delete" size="large" color="warning" onClick={eventHandler}>
                <ArrowForwardIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function brushButton({eventHandler}) {
    return(
        <Tooltip title="Draw" arrow>
            <IconButton aria-label="delete" size="large" color="warning" onClick={eventHandler}>
                <BrushIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
    )
}

function defaultButton({eventHandler}) {
    return(
        <Button aria-label="delete" size="large" color="error" onClick={eventHandler}>
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