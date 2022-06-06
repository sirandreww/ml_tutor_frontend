import React from 'react';
import { Box, Typography } from '@mui/material'
import { Copyright } from '@mui/icons-material';
import PrettyLine from 'components/PrettyLine';
import { useTranslation } from "react-i18next";

function Footer() {
    const [t] = useTranslation('translation');
    return (
        <Box // this is here to allow the footer to stick to the bottom
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'white'
            }}
        >
            <PrettyLine />
            <Typography variant="h6" align="center" gutterBottom color="black">
                MLomda
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="black"
                component="p"
            >
                {t("footer.made_by")}
            </Typography>
            <Copyright />
        </Box>
    );
}

export default Footer;