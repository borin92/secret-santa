import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Box,
    Button
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';



const useStyles = makeStyles(theme => ({
    body: {
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'center'

    }
}));

export default function Verification() {
    const classes = useStyles();

    const a = 0

    if (a === 0) {
        return (
            <div className={classes.body}>

                <Box >
                    <React.Fragment>
                        <Grid container sx={{ margin: 'auto' }}>
                            <Grid item xs={8}>
                                <CheckCircleRoundedIcon sx={{ fontSize: 150, color: 'red' }} />    green
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Verification is correct! you can login here</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="success" size="large">Login</Button>
                            </Grid>

                        </Grid>

                    </React.Fragment>
                </Box>
            </div>
        )
    }
    else {
        return (
            <div className={classes.body}>

                <Box >
                    <React.Fragment>
                        <Grid container sx={{ margin: 'auto' }}>
                            <Grid item xs={8}>
                                <CancelIcon sx={{ fontSize: 150, color: 'red' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='subtitle1'>Verification is correct! you can login here</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" size="large">Resend Link</Button>
                            </Grid>

                        </Grid>

                    </React.Fragment>
                </Box>
            </div>
        )
    }

}
