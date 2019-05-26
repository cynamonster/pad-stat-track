import React, { Component } from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import history from './history';

// components
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import CreatePatient from './components/CreatePatient';
import RemovePatient from './components/RemovePatient';

// Amplify, Auth
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  state = {
    activePatient: {},
    activeMeasurement: {}
  }

  render() {
    console.log() 
    return (
      <Router history={history}>
        <div className="App">
          {/* <Route path="/" exact component={Authenticate} /> */}
          <Route path={'/pad-stat-track/'} exact component={PatientList} />
          <Route path={'/pad-stat-track/form/:id/:type'} component={PatientForm} />
          <Route path={'/pad-stat-track/create'} component={CreatePatient} />
          <Route path={'/pad-stat-track/remove'} component={RemovePatient} />
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
// export default App;