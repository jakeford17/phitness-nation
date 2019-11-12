import React, { Component } from 'react';
import AddInjuriesModal from '../AddInjuriesModal/AddInjuriesModal';
import EditInjuriesModal from '../EditInjuriesModal/EditInjuriesModal.js';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { flexbox } from '@material-ui/system';

const MyCard = styled(Card)({
    background: '#F1EDBF',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "40%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});

const MildInjuryCard = styled(Card)({
    background: '#fcdf03',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "40%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});

const ModerateInjuryCard = styled(Card)({
    background: '#fc9803',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "40%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});

const SevereInjuryCard = styled(Card)({
    background: '#fc3503',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // // color: 'white',
    // height: 60,
    width: "40%",
    padding: 10,
    margin: 5,
    fontSize: 16,
    display: flexbox,
    textAlign: "center"
});

class Injuries extends Component {
    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_USER' })
    // }

    render() {
        let value = 'test'
        return (
            <>
            <div className="injury-wrapper">
                    <MildInjuryCard><div className="injury-display"><h3>Injury 1</h3><EditInjuriesModal /></div>A brief description of the injury goes here.</MildInjuryCard>
                    <ModerateInjuryCard><div className="injury-display"><h3>Injury 2</h3><EditInjuriesModal /></div>A brief description of the injury goes here.</ModerateInjuryCard>
                    <SevereInjuryCard><div className="injury-display"><h3>Injury 3</h3><EditInjuriesModal /></div>A brief description of the injury goes here.</SevereInjuryCard>
                <AddInjuriesModal />
            </div>
            </>
        )
    }
}

export default Injuries;