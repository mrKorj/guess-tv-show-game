import React, {useContext} from 'react';
import {getDataFromApiAction} from "../store/actions";
import {appContext} from "../App";
import {ActionTypes} from "../store/actionTypes";

export const WelcomeScreen: React.FC = () => {
    const {dispatch} = useContext(appContext)

    const onStartHandler = () => {
        dispatch({type: ActionTypes.StartGame})
        getDataFromApiAction(dispatch)
    }

    return (
        <div className='welcome-screen d-flex flex-column justify-content-center align-items-center'>
            <img src='./tv.png' className="App-logo mb-3" alt="logo"/>
            <h4>Welcome to the awesome game.</h4>
            <button
                onClick={onStartHandler}
                className="start-btn btn btn-success btn-lg mt-4"
            >
                Start Game
            </button>
        </div>
    );
};
