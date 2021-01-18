import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: "#00205b",
        },
    }),
)

const CircularProgressCustom: React.FC = () => {
    const classes = useStyles()

    return <CircularProgress className={classes.root} />
}

export default CircularProgressCustom