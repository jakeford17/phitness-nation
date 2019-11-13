import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import swal from 'sweetalert';
//import axios from 'axios';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';


class ExerciseDetail extends Component {

    state = {
        exerciseId: this.props.match.params.id,
        exerciseDetail: []
    }

    componentDidMount() {
        this.exerciseDetail();
    }

    exerciseDetail = () => {
        axios.get(`/api/admin/exerciseDetail/${this.state.exerciseId}`).then((response) => {
            this.setState({
                exerciseDetail: response.data
            })
        }).catch((error) => {
            console.log('Error adding exercise', error)
        });
    }


    render() {
        return (
            <div>
                <h1>Exercise Detail</h1>
                {this.state.exerciseDetail.map((exercise) => {
                    return (
                        <div key={exercise.id}>
                            <h1>{exercise.name}</h1>
                            <p>Sets: {exercise.default_sets}</p>
                            <p>{exercise.default_reps}{exercise.units}</p>
                            <p>Link: {exercise.links}</p>
                        </div>
                    );
                })}
                <button onClick = {() => this.props.history.push('/admin')}>Back</button>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ExerciseDetail);