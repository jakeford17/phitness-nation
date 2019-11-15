import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Select from 'react-select';

class AdminAddWorkout extends Component {
    state = {
        user_id: this.props.reduxState.adminToUserReducer.adminToUserReducer,
        week: 0,
        //exercise_id, assigned_reps, assigned_sets, assigned_weight, tips
        exercises: [

        ],
        injuries: [

        ],
        listExercises: [  

        ],
        tempExercise: {
            exercise_id: 0,
            assigned_reps: 0,
            assigned_sets: 0,
            assigned_weight: 0,
            tips: ''
        }
    }
    componentDidMount = () =>{
        this.getExercises();
    }
    getExercises = () =>{
        const active = true
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            response.data.map((exercise) =>{
                this.setState({
                    listExercises: [...this.state.listExercises, {value: exercise.id, label: exercise.name }]
                })
            })
        })
    }
    handleChange = (value, actionMeta) => {
        this.setState({
            tempExercise: {...this.state.tempExercise, exercise_id: value.value }
        })
      };
    //   handleInputChange = (inputValue: any, actionMeta: any) => {
    //     console.group('Input Changed');
    //     console.log(inputValue);
    //     console.log(`action: ${actionMeta.action}`);
    //     console.groupEnd();
    //   };
    render() {
        return (
            <>
            {this.state.user_id}
            {JSON.stringify(this.state)}
            <CreatableSelect
                isClearable
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                options={this.state.listExercises}
            />
            </>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(AdminAddWorkout);