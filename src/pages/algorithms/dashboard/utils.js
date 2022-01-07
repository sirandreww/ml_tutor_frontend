import * as React from 'react';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BrushIcon from '@mui/icons-material/Brush';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
        <IconButton aria-label="delete" size="large" color="success" onClick={eventHandler}>
            <PlayArrowIcon fontSize="inherit" />
        </IconButton>
    )
}

function pauseButton({eventHandler}) {
    return(
        <IconButton aria-label="delete" size="large" onClick={eventHandler}>
            <PauseIcon fontSize="inherit" />
        </IconButton>
    )
}

function stopButton({eventHandler}) {
    return(
        <IconButton aria-label="delete" size="large" color="error" onClick={eventHandler}>
            <ClearIcon fontSize="inherit" />
        </IconButton>
    )
}

function prevButton({eventHandler}) {
    return(
        <IconButton aria-label="delete" size="large" color="warning" onClick={eventHandler}>
            <ArrowBackIcon fontSize="inherit" />
        </IconButton>
    )
}

function nextButton({eventHandler}) {
    return(
        <IconButton aria-label="delete" size="large" color="warning" onClick={eventHandler}>
            <ArrowForwardIcon fontSize="inherit" />
        </IconButton>
    )
}

function brushButton({eventHandler}) {
    return(
        <IconButton aria-label="delete" size="large" color="warning" onClick={eventHandler}>
            <BrushIcon fontSize="inherit" />
        </IconButton>
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
    color: theme.palette.text.secondary
}));
