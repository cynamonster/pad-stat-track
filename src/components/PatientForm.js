import React, { Component, Fragment } from 'react';
import { getPatient } from '../graphql/queries';
import { createMeasurement, updateMeasurement } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import './PatientForm.css';
import { Link } from 'react-router-dom';
import history from '../history';

class PatientForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeMeasurements: '',
            id: null,
            type: "",
            entryExisted: false,
            loading: false,
            patient: "",
            abi_before: null,
            abi_after: null,
            nirs_before: null,
            nirs_after: null, 
            endo_de: null,
            endo_in: null,
            nirs_gastroc_before: null,
            nirs_gastroc_after: null,
            notes: null
        }
    }
    async componentDidMount() {
        this.setState({ loading: true, id: this.props.match.params.id })

        // Check props to determine whether these are 
        // INITAL or FOURWEEK metrics and setState appropriately.
        if (this.props.match.params.type === "init") {
            this.setState({ type: 'Initial' });
            
        } else if (this.props.match.params.type === "four") {
            this.setState({ type: 'FourWeek' });
        }

        // Query DB (using the patient id passed as a prop via the route) to attain the patient's AnonId
        await API.graphql(graphqlOperation(getPatient, { id: this.props.match.params.id } ))
        .then(response => {
            // console.log('res:', response.data.getPatient.measurements.items)
            this.setState({ 
                activeMeasurements: response.data.getPatient.measurements.items,
                loading: false,
                patient: response.data.getPatient.anonId,
                
            })
    

        })
        
        // const initialMeasurement = this.state.activeMeasurements.filter(
        //     measurement => measurement.type === "Initial"
        // );
        // const fourWeekMeasurement = this.state.activeMeasurements.filter(
        //     measurement => measurement.type === "FourWeek"
        // );

        const capturedMeasurements = this.state.activeMeasurements.filter(
            measurement => measurement.type === this.state.type
        );
        console.log('mez',capturedMeasurements)

        this.handleMeasurements(capturedMeasurements)
        
        

        // Query DB to attain the patient's measurements
        console.log('props:',this.state.type);

            // if ( metrics.data.getMeasurement ) {
            //     console.log('yes',metrics);

            //     var finalMetrics = metrics.data.getMeasurement;
                
            //    
            // }
        
        // Select the most recent measurements

            

    }

    handleMeasurements = capturedMeasurements => {
        if ( capturedMeasurements.length === 0 ) {
            // create new
        } else {
            this.setState({ 
                id: capturedMeasurements[0].id,
                entryExisted: true,
                abi_before: capturedMeasurements[0]['abi_before'],
                abi_after: capturedMeasurements[0]['abi_after'],
                nirs_before: capturedMeasurements[0]['nirs_before'],
                nirs_after: capturedMeasurements[0]['nirs_after'],
                endo_de: capturedMeasurements[0]['endo_de'],
                endo_in: capturedMeasurements[0]['endo_in'],
                nirs_gastroc_before: capturedMeasurements[0]['nirs_gastroc_before'],
                nirs_gastroc_after: capturedMeasurements[0]['nirs_gastroc_after'],
                notes: capturedMeasurements[0]['notes']
        
                },() => console.log('active',this.state));
        }
    }

    // REFACTOR STATE ASSIGNMENTS?
    // fetchInitialState = (finalMetrics, key) => {
    //     for (key in finalMetrics.length) {
    //         this.setState({ [key]: finalMetrics[key] },
    //         () => console.log(key,':',this.state[key]));
    //     }
    // }

    onChange = (e, key) => {
        this.setState({ [key]: e.target.value },
            () => console.log(key,':',this.state[key]),
            
        );
    }

    onSubmission = e => {
        e.preventDefault();
        // console.log(e.target.keyCode);
        // if records already exist, updateMeasurement instead
        if (this.state.entryExisted) {
            API.graphql(graphqlOperation(updateMeasurement, {
              input: {
                    // could this be a for-loop?
                    id: this.state.id,
                    type: this.state.type,
                    abi_before: this.state.abi_before,
                    abi_after: this.state.abi_after,
                    nirs_before: this.state.nirs_before,
                    nirs_after: this.state.nirs_after,
                    endo_de: this.state.endo_de,
                    endo_in: this.state.endo_in,
                    nirs_gastroc_before: this.state.nirs_gastroc_before,
                    nirs_gastroc_after: this.state.nirs_gastroc_after,
                    notes: this.state.notes
                }
            })).then(
                res => { console.log('res:',res); }
            ).catch(err => {
                console.log('err:',err);
            });

            history.push('/pad-stat-track/');
        } else {
            API.graphql(graphqlOperation(createMeasurement, {
                input: {
                    measurementPatientId: this.state.id,
                    // could this be a for-loop?
                    type: this.state.type,
                    abi_before: this.state.abi_before,
                    abi_after: this.state.abi_after,
                    nirs_before: this.state.nirs_before,
                    nirs_after: this.state.nirs_after,
                    endo_de: this.state.endo_de,
                    endo_in: this.state.endo_in,
                    nirs_gastroc_before: this.state.nirs_gastroc_before,
                    nirs_gastroc_after: this.state.nirs_gastroc_after,
                    notes: this.state.notes
                }
            })).then(
                res => { console.log('res(create):',res); }
            ).catch(err => {
                console.log('err(create):',err);
            });

            history.push('/pad-stat-track/');
        }
        }

    getAnonId() {
        if (!this.state.patient) {
            return <h5>Loading Patient...</h5>;
        }
        return <h3>{ this.state.patient }</h3>;
    }
    

    inputRender() {
        if ( !this.state.abi_before ) {
            return (
                <div className="ui input field large form-input">
                    <label>ABI (Before)
                        <input 
                            type="number" 
                            onChange={ (e) => this.onChange(e, 'abi_before') } 
                        />
                    </label>
                </div>
            );
        }

        return (
            <div className="ui input field large form-input">
                <label>ABI (Before)
                    <input 
                        type="number" 
                        onChange={ (e) => this.onChange(e, 'abi_before') } 
                        value={ this.state.abi_before } 
                    />
                </label>
            </div>
        );
    }

    renderHeader() {
        if (!this.state.patient) {
            return (
                <div className="ui active dimmer inverted" style={{ width: 'auto', margin: '0 50%', height: '10vh', background: 'rgba(0,0,0,0)' }}>
                   <div className="ui text loader"></div>
                </div>
            );
        }
        return (
            <Fragment>
                <Link to="/" className="ui button"><i className="icon chevron left" />Return to List</Link>
                <div className="ui small center aligned header" style={{ margin: 0 }} >
                    Patient: { this.getAnonId() }
                </div>
            </Fragment>
        );
    }


    render() {
        return (
            <div className="ui container">
                    
                <div className="ui block header" style={{ height: '10vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    {
                        this.renderHeader()
                    }
                </div>

                <form 
                    className="ui form"
                    onSubmit={this.onSubmission}
                >
                    
                    <div className="ui input field large form-input">
                        <label>Patient ID
                            <input type="text" disabled value={this.state.patient} onChange={this.onChange} />
                        </label>
                    </div>

                    <br />
                    
                    <div className="ui input field large form-input">
                        <label>ABI (Before)
                            <input 
                                type="number" 
                                onChange={ (e) => this.onChange(e, 'abi_before') } 
                                defaultValue={ this.state.abi_before } 
                            />
                        </label>
                    </div>

                    <br />
                    
                    <div className="ui input field large form-input">
                        <label>ABI (After)
                            <input 
                                defaultValue={ this.state.abi_after }
                                type="number" 
                                onChange={ (e) => {
                                this.onChange(e, 'abi_after')
                            } } />
                        </label>
                    </div>
                    <br />
                    <div className="ui input field large form-input">
                        <label>NIRS (Before)
                            <input 
                                defaultValue={ this.state.nirs_before }
                                type="number" 
                                onChange={ (e) => {
                                this.onChange(e, 'nirs_before')
                            } } />
                        </label>
                    </div>
                    <br />
                    <div className="ui input field large form-input">
                        <label>NIRS (After)
                            <input 
                                type="number" 
                                defaultValue={ this.state.nirs_after }
                                onChange={ (e) => {
                                this.onChange(e, 'nirs_after')
                            } } />
                        </label>
                    </div>
                    <br />
                    <div className="ui input field large form-input">
                        <label>Endothelium Dependent FMD
                            <input 
                                defaultValue={ this.state.endo_de }
                                type="number" 
                                onChange={ (e) => {
                                this.onChange(e, 'endo_de')
                            } } />
                        </label>
                    </div>
                    <br />
                    <div className="ui input field large form-input">
                        <label>Endothelium Independent FMD
                            <input 
                                defaultValue={ this.state.endo_in }
                                type="number" 
                                onChange={ (e) => {
                                this.onChange(e, 'endo_in')
                            } } />
                        </label>
                    </div>
                    <br />
                    <div className="ui input field large form-input">
                        <label>NIRS Gastroc Soleus (Before)
                            <input 
                                defaultValue={ this.state.nirs_gastroc_before }
                                type="number" 
                                onChange={ (e) => {
                                this.onChange(e, 'nirs_gastroc_before')
                            } } />
                        </label>
                    </div>
                    <br />
                    <div className="ui input field large form-input">
                        <label>NIRS Gastroc Soleus (After)
                            <input 
                                defaultValue={ this.state.nirs_gastroc_after }
                                type="number" 
                                onChange={ (e) => {
                                this.onChange(e, 'nirs_gastroc_after')
                            } } />
                        </label>
                    </div>
                    <br />
                    <div className="ui input field large form-input">
                        <label>Notes
                            <input 
                                defaultValue={ this.state.notes }
                                type="text" 
                                onChange={ (e) => {
                                this.onChange(e, 'notes')
                            } } />
                        </label>
                    </div>
                    <br />
                    {/* onclick: save entries to db */}
                    <button onClick={this.onSubmission} className="ui button large primary" style={{ marginBottom: '2rem' }}>
                            Save and Return
                    </button>
                </form>
            </div>
          
        );
    }
}

export default PatientForm;