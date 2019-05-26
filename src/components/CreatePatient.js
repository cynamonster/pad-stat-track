import React, { Component } from 'react';
// import { listPatientsQuery } from '../graphql/queries';
import { createPatient } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import history from '../history';

class CreatePatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            patient: null,
        }
    }
    onChange = e => { 
        this.setState({ patient: e.target.value },
        () => console.log(this.state.patient));
    }

    onSubmission = e => {
        e.preventDefault();
        API.graphql(graphqlOperation(createPatient, {
            input: {
                anonId: this.state.patient,
            }
        })).then(
            res => { console.log(res); }
        ).catch(err => {
            console.log(err);
        });

        history.push('/');
    }
     
    render() {
        return (
            <div className="ui raised very padded text container segment" style={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '2rem' }}>
                <form onSubmit={this.onSubmission} className="ui form">
                    
                    <div className="ui input field huge">
                        <label>Patient Name
                            <input type="text" onChange={ e => this.onChange(e) } />
                        </label>
                    </div>

                </form>

                <div className="ui two column grid">
                    <div className="row">
                        <div className="column">
                            <button 
                                onClick={ () => history.push('/') } 
                                className="ui button huge"
                            >
                                Discard
                            </button>

                        </div>
                        <div className="column">
                            <button 
                                onClick={ this.onSubmission } 
                                className="ui button huge green"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

            </div>
          
        );
    }
}

export default CreatePatient;

