import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    Radio,
    RadioGroup
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
    const apiURL = 'http://localhost:3000';
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = useState(false);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userWeight, setUserWeight] = useState('');
    const [userHeight, setUserHeight] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhoneNum, setUserPhoneNum] = useState('');

    const handleSubmit = () => {
        const user = {
            name: userName,
            email: userEmail,
            password: userPassword
        };
        axios
            .post(`${apiURL}/pages/register`, { user })
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('error', err);
            });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        // changePassword('123456');
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('이름을 입력하세요'),
        email: Yup.string().email('Must be a valid email').required('이메일을 입력하세요'),
        password: Yup.string().required('패스워드를 입력하세요')
    });
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                <form
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-name-register">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name-register"
                            type="text"
                            value={userName}
                            name="name"
                            onChange={({ target }) => setUserName(target.value)}
                            inputProps={{}}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-register"
                            type="email"
                            value={userEmail}
                            name="email"
                            onChange={({ target }) => setUserEmail(target.value)}
                            inputProps={{}}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-register"
                            type={showPassword ? 'text' : 'password'}
                            value={userPassword}
                            name="password"
                            label="Password"
                            onChange={(e) => {
                                changePassword(e.target.value);
                                setUserPassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />
                    </FormControl>

                    {strength !== 0 && (
                        <FormControl fullWidth>
                            <Box sx={{ mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                            {level?.label}
                                            {/* Weak, Poor, Normal, Good */}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormControl>
                    )}
                    <FormControl component="fieldset">
                        <FormLabel component="legend">성별</FormLabel>
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                            <FormControlLabel value="female" control={<Radio />} label="여자" />
                            <FormControlLabel value="male" control={<Radio />} label="남자" />
                        </RadioGroup>
                    </FormControl>

                    <input type="date" />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={userWeight}
                            onChange={(e) => {
                                setUserWeight(e.target.value);
                            }}
                            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">몸무게</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-height"
                            value={userHeight}
                            onChange={(e) => {
                                setUserHeight(e.target.value);
                            }}
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            aria-describedby="outlined-height-helper-text"
                            inputProps={{
                                'aria-label': 'height'
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">키</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-phoneNum-register">Phone Num</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-phoneNum-register"
                            type="phoneNum"
                            value={userPhoneNum}
                            name="phoneNum"
                            onChange={({ target }) => setUserPhoneNum(target.value)}
                            inputProps={{}}
                        />
                    </FormControl>
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                                회원 가입
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default AuthRegister;
