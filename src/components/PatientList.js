import React, { Component } from 'react';
import { listPatients } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
// import { Redirect, Route, Link, Switch, withRouter } from 'react-router-dom';
// import PatientForm from './PatientForm';
import history from '../history';
import './PatientList.css';


class PatientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            patients: [],
            selectedPatient: null,
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        API.graphql(graphqlOperation(listPatients, {
            limit: 1000
        })).then(
            res => {
                console.log(res);
                this.setState({ patients: res.data.listPatients.items })
                console.log(this.state.patients);
            }
        );
    } 
  
    onPatientSelect = e => {

        this.setState({
            selectedPatient: e.target.innerText,
            id: e.target.id
        }, () => {
            console.log('state1:',this.state);
            // select the array or id correlating to the selected anonId
            swal({
                title: this.state.selectedPatient,
                text: 'Select measurements to modify:',
                buttons: {
                    baseline: 'Baseline Measurements',
                    fourweek: 'Four Week Measurements',
                    csv: 'Export Patient CSV',
                    cancel: 'Cancel'
                }
            })
                .then((selection) => {
                    switch (selection) {
                        case 'baseline':
                            // Pass patient id
                            history.push(`/pad-stat-track/form/${this.state.id}/init`);
                            break;
                        case 'fourweek':
                            // Pass patient id
                            history.push(`/pad-stat-track/form/${this.state.id}/four`);
                            break;
                        case 'csv':
                            // export emailable/downloadable .csv of database
                            break;
                        default:
                            break;
                    }
                });
        });
    }

    // Alphabetize (Alphanumeric) patient list items?
    renderPatientList() {
        if (!this.state.patients) {
            return (
                <div className="ui segment" style={{ height: '100vh' }}>
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">
                            Loading...
                        </div>
                    </div>
                </div>
            );
        }
        return (
            this.state.patients.map(patient => {
                return (
                    <div
                        onClick={this.onPatientSelect}
                        className="item"
                        key={patient.id}>

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}
                            className="header"
                            
                            id={patient.id}
                        >{patient.anonId}
                        </div>

                    </div>
                );
            })
        );
    }

    

    render() {

        return (
            <div>

                <div
                    className="ui middle aligned selection divided list massive"
                >

                    {
                        this.renderPatientList()
                    }
                </div>

                <div className="ui">

                    <div className="ui header" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                        <Link to="/pad-stat-track/remove" className="ui button large red"><i className="icon minus circle" />Remove Patient</Link>

                        <Link to="/pad-stat-track/create" className="ui button large primary"><i className="icon plus circle" />Add Patient</Link>

                    </div>
                </div>

            </div>
        )
    }
}

export default PatientList;