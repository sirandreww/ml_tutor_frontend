import React from 'react';
// import Typography from '@mui/material/Typography';
import { Grid, Typography } from '@mui/material';


function SomethingWentWrong(props: { error: any, resetErrorBoundary: any }) {
    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <div role="alert">
                        <Typography><p>Something went wrong:</p></Typography>
                        <Typography><pre>{props.error.message}</pre></Typography>
                        <button onClick={props.resetErrorBoundary}>
                            <Typography>Try again</Typography>
                        </button>
                    </div>
                </Grid>

            </Grid>
        </div>

    );
}

export default SomethingWentWrong;