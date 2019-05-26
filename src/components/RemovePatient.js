import React, { Component } from 'react';
import { listPatients } from '../graphql/queries';
import { deletePatient, deleteMeasurement } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
// import { Redirect, Route, Link, Switch, withRouter } from 'react-router-dom';
// import PatientForm from './PatientForm';
import history from '../history';
import './PatientList.css';


class RemovePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            patients: [],
            selectedPatient: null
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        API.graphql(graphqlOperation(listPatients)).then(
            res => {
                this.setState({ patients: res.data.listPatients.items })
                console.log(this.state.patients);
            }
        )       
    }
 
    onPatientSelect = e => {

        this.setState({ 
            selectedPatient: e.target.innerText,
            id: e.target.id
        }, () => {
            console.log(this.state);

            const selectedId = this.state.patients.filter(
                patient => patient.anonId === this.state.selectedPatient
            );
            // select the array or id correlating to the selected anonId
            swal({            
                title: 'Delete ' + this.state.selectedPatient + '?',
                text: 'This cannot be undone.',
                icon: 'warning',
                buttons: {
                    danger: 'Yes',
                    cancel: 'No'
                },
                dangerMode: true
            })
            .then((selection) => {
                if(selection) {
                    swal("Patient record deleted!", {
                        icon: 'success'
                    })
                    API.graphql(graphqlOperation(deletePatient, { input: { id: selectedId[0].id } } ))
                    .then(
                        res => console.log('res',res)
                    ).catch(
                        err => console.log('err',err)
                    )
                    API.graphql(graphqlOperation(deleteMeasurement, { input: { id: this.state.selectedPatient } } ))
                    .then(
                        res => console.log('res',res)
                    ).catch(
                        err => console.log('err',err)
                    )
                    history.push('/pad-stat-track/')
                }
            });
        });
    }
    
    renderRemovePatient() {
        if(!this.state.patients) {
            return (
                <div className="ui segment" style={{height: '100vh'}}>
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
                        onClick={ this.onPatientSelect }
                        className="item">
                        
                        <div style={{ display:'flex', justifyContent: 'space-around' }} 
                            className="header" 
                            key={ patient.id } 
                            id={ patient.id }
                            >{ patient.anonId }
                        </div>
                        
                    </div>
                );
            })
        );
    }

    render() {
        
        return(
            <div style={{ paddingTop: '2rem' }}>

                <div className="ui">
                    <div className="ui header" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        
                        <Link to="/pad-stat-track/" className="ui button large"><i className="icon chevron left" />Return to List</Link>

                        <h2 style={{margin: 0}}>Delete a Patient</h2>

                    </div>
                </div>
                
                <div className="ui middle aligned selection divided list massive">
                    
                    { 
                        this.renderRemovePatient()
                    }
                </div>

            </div>
        )
    }
}

export default RemovePatient;