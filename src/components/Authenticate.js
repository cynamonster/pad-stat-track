import React from 'react';
import { Router, Link } from 'react-router-dom';
// import PatientList from './PatientList';
import history from '../history';

const Authenticate = () => {
    return(
        <Router history={history}>
            {/* <Switch> */}
                <Link to="/list">Authenticate</Link>
            {/* </Switch> */}
        </Router>
    );
};

export default Authenticate;