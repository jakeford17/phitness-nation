import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';



const MyCard = styled(Card)({
    background: '#d2d2d4',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    height: "70%",
    width: "47%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    fontFamily: 'PT Sans Narrow'
});

class ArchivedExercises extends Component {

    state = {
        listExercises: []
    }

    componentDidMount() {
        this.listExercises();
    }

    listExercises = () => {
        const active = false;
        axios.get(`/api/admin/exercise/${active}`).then((response) => {
            console.log("grabbing exercise list:", response.data)
            this.setState({
                listExercises: response.data
            })
        })
    }


    //Reactivate exercise, allow admin to reactivate exercise in library
    reactivateExercise = (exercise, archive) => {
        const active = {active: archive};
        axios.put(`/api/admin/exerciseArchive/${exercise.id}`, active).then((response) => {
            swal("Updated!", "Reactivate Exercise Complete");
            this.listExercises();
        }).catch((err) => {
            console.log('error when archiving exercise', err)
        })
    }
    render() {
        return (
            <div>
                 <div>
                        {this.state.listExercises.map((exercise) => {
                            if (exercise.active === false) { 
                            return (
                                <MyCard>
                                    <div key={exercise.id}>
                                        <h5 className="styled-h5">Name:</h5> {exercise.name} <br />
                                        <button className="archived-btns" onClick={() => this.reactivateExercise(exercise, true)}>REACTIVATE</button>
                                        <button className="archived-btns" >PERMANENTLY DELETE</button><br /><br />
                                    </div>
                                </MyCard>
                            );
                            }
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(ArchivedExercises);