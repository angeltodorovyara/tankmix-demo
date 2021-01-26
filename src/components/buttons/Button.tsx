import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btn: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            backgroundColor: "#00205b",
            color: "white"
        }
    })
)

interface ButtonProps {
    variant?: "text" | "outlined" | "contained" | undefined
    type?: "submit"
    size?: "small" | "medium" | "large" | undefined
    onClick?: () => void
}

const CustomButton: React.FC<ButtonProps> = (props) => {
    const classes = useStyles()

    return <Button
        className={classes.btn}
        type={props.type ? props.type : 'button'}
        fullWidth={true}
        color="primary"
        size={props.size}
        variant={props.variant ? props.variant : "contained"}
        onClick={props.onClick}
    >
        {props.children}
    </Button>
}

export default CustomButton