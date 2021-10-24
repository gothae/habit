import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Home from 'ui-component/HomeLogo';

// ==============================|| MAIN LOGO ||============================== //

const HomeSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Home />
    </ButtonBase>
);

export default HomeSection;
