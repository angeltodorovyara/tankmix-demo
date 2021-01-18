import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ListItem as ListItemOriginal, AppBar, Toolbar, IconButton, Typography, Drawer, CssBaseline, ListItemText, ListItemSecondaryAction, Divider, createStyles, makeStyles, Theme } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import List from '../../components/list/List'
import LanguageButton from '../buttons/LanguageButton'
import ListItem from '../../components/list/list-item/ListItem'
import { getLocationWeather, logout } from '../../store/actions'
import { RootState } from '../../store/types'
import UserInfo from '../user-info/UserInfo'
import WeatherInfo from '../weather-info/WeatherInfo'
import { qrScanningOptions as options } from '../../utils/options'

declare let cordova: any;
declare let navigator: any;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex'
        },
        appBar: {
            backgroundColor: "#00205b",
            zIndex: theme.zIndex.drawer + 1
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
        addButton: {
            marginLeft: theme.spacing(0),
        },
        title: {
            flexGrow: 1,
        },
        // new
        drawer: {
            width: '66%',
            flexShrink: 0,
        },
        drawerPaper: {
            width: '66%',
        },
        drawerContainer: {
            overflow: 'auto',
        }
    }),
)

const AppBarComponent: React.FC = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { t, i18n } = useTranslation();
    const geolocation = useSelector((state: RootState) => state.geolocation)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getLocationWeather())
    }, [dispatch, update])

    const changeLang = (lang: string): void => {
        i18n.changeLanguage(lang)
        setUpdate(!update)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => setIsOpen(!isOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>TankMix</Typography>
                    <WeatherInfo weather={geolocation.weather} />
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} open={isOpen} variant="persistent" classes={{ paper: classes.drawerPaper }}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <UserInfo />
                    <List>
                        <ListItem content={t('home')} onClick={() => history.replace('/home')} />
                        <ListItem content={t('myMixResults')} onClick={() => history.replace('/user-mix-results')} />
                        <ListItemOriginal>
                            <ListItemText primary={t('language')} />
                            <ListItemSecondaryAction>
                                <LanguageButton onClick={() => changeLang('en')}>EN</LanguageButton>
                                <LanguageButton onClick={() => changeLang('bg')}>{t('bg')}</LanguageButton>
                            </ListItemSecondaryAction>
                        </ListItemOriginal>
                        <Divider />
                        <ListItem content={t('qrCodeScanner')} onClick={() => cordova.plugins.barcodeScanner.scan(
                            (result: any) => {
                                navigator.notification.alert(result.text)
                            },
                            (error: any) => {
                                alert("Scanning failed: " + error);
                            },
                            options
                        )} />
                        <ListItem content={t('logout')} onClick={() => dispatch(logout())} />
                    </List>
                </div>
            </Drawer>
            <Toolbar />
        </div>
    );
}

export default AppBarComponent