import React, { Component } from 'react';
import './App.css';
import settings from './aws-exports';
import Amplify from 'aws-amplify';
// import { withAuthenticator } from 'aws-amplify-react';
// import { listPatientsQuery } from './graphql/queries';
import { Router, Route } from 'react-router-dom';
import history from './history';

// components
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
// import CreateMeasurement from './components/CreateMeasurement';
import CreatePatient from './components/CreatePatient';
import RemovePatient from './components/RemovePatient';
// import { SignUp } from 'aws-amplify-react/dist/Auth';


Amplify.configure(settings);

class App extends Component {
  state = {
    activePatient: {},
    activeMeasurement: {}
  }

  render() {
    console.log() 
    return (
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <div className="App">
          {/* <Route path="/" exact component={Authenticate} /> */}
          <Route path="/" exact component={PatientList} />
          <Route path="/form/:id/:type" component={PatientForm} />
          <Route path="/create" component={CreatePatient} />
          <Route path="/remove" component={RemovePatient} />
        </div>
      </Router>
    );
  }
}

// export default withAuthenticator(App, { includeGreetings: true });
export default App;