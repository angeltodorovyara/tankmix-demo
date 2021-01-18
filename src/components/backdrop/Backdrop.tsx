import React from 'react'
import { Backdrop } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import CircularProgress from '../../components/circular-progress/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
)

interface BackdropProps {
    open: boolean
}

const BackdropCustom: React.FC<BackdropProps> = props => {
    const classes = useStyles()
    // const [open, setOpen] = useState(false)

    // const handleClose = () => {
    //     setOpen(false)
    // };
    // const handleToggle = () => {
    //     setOpen(!open)
    // };

    return <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress />
    </Backdrop>
}

export default BackdropCustom