import { Avatar, CardHeader, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            backgroundColor: '#00205b',
        },
    }),
);

const UserInfo: React.FC = (props) => {
    const user = useSelector((state: RootState) => state.auth.data)
    const geolocation = useSelector((state: RootState) => state.geolocation)
    const classes = useStyles()

    return <CardHeader
        avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
                {user?.email[0].toUpperCase()}
            </Avatar>
        }
        title={user?.email}
        subheader={geolocation.location ? geolocation.location : null}
    />
}

export default UserInfo