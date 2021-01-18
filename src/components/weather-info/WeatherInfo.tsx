import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
    weather: string | null;
}

const WeatherInfo: React.FC<ComponentProps> = props => {
    const { t } = useTranslation();
    const [text, temp] = props.weather?.split('&') || [null, null];

    return <Fragment>
        {props.weather === null ? null :
            <Box m={0} p={0}>
                <Typography variant="subtitle2" align="right">{text}</Typography>
                <Typography variant="subtitle2" align="right">{`${t('temp')}${temp}`}</Typography>
            </Box>}
    </Fragment>
}

export default WeatherInfo;