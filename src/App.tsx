import React, {createContext, useEffect, useReducer, useState} from 'react';
import './App.css';
import {WelcomeScreen} from "./components/WelcomeScreen";
import {GameScreen} from "./components/GameScreen";
import {initialState, reducer} from "./store/reducer";
import {IState} from "./store/interfaces";
import {ModalComponent} from "./components/ModalComponent";
import {getDataFromApiAction} from "./store/actions";
import {ActionTypes} from "./store/actionTypes";

export const appContext = createContext<{ state: IState, dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null
})

export const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [modalState, setModalState] = useState({show: false, title: ''})

    useEffect(() => {
        if (state.guesses === state.data.length && state.dataReady) {
            setModalState({show: true, title: 'You Win!'})
            dispatch({type: ActionTypes.EndGame})
        }

        if (!state.playerLifes) {
            setModalState({show: true, title: 'You Loose!'})
            dispatch({type: ActionTypes.EndGame})
        }
    }, [state.guesses, state.playerLifes])

    const modalContent = (
        <>
            <p>Total Guess: <b>{state.guesses}</b>.</p>
            <p>Total Wrong Guess: <b>{state.wrongGuesses}</b>.</p>
            <p>Using Hints: <b>{state.hint}</b>.</p>
        </>
    )

    const onCloseModalHandler = (): void => {
        dispatch({type: ActionTypes.StartGame})
        setModalState({show: false, title: ''})
        getDataFromApiAction(dispatch)
    }

    return (
        <appContext.Provider value={{state, dispatch}}>
            <div className="App">
                {
                    state.isStarted &&
                    <header>
                        <nav className="navbar navbar-dark navbar-my">
                            <div className="container">
                                <a className="navbar-brand d-flex align-items-center" href="/">
                                    <img src="/tv.png" alt="" width="40" style={{marginRight: '1rem'}}/>
                                    <span style={{fontSize: '1.5rem'}}>Guess the TV show</span>
                                </a>
                                <span>V 1.0</span>
                            </div>
                        </nav>
                    </header>
                }
                <div className="main container d-flex justify-content-center align-items-center">
                    {
                        state.isStarted
                            ? <GameScreen/>
                            : <WelcomeScreen/>
                    }
                    <footer className="fixed-bottom d-flex justify-content-center">
                        <p className='text-secondary'>
                            Developed by Sergey Kremenchugsky 2021.
                        </p>
                    </footer>
                </div>
                <ModalComponent onHide={onCloseModalHandler} show={modalState.show} titleText={modalState.title} content={modalContent}/>
            </div>
        </appContext.Provider>
    );
}
