import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {appContext} from "../App";
import {ActionTypes} from "../store/actionTypes";
import {OverlayTrigger, Popover} from 'react-bootstrap'
import {AlertComponent} from "./AlertComponent";
import {generateSecretString} from "../utils/utils";

export const GameScreen: React.FC = () => {
    const {state, dispatch} = useContext(appContext)
    const [inpVal, setInpVal] = useState<string>('')
    const [itemNumberInList, setItemNumberInList] = useState<number>(0)
    const [showHint, setShowHint] = useState<boolean>(false)
    const [showStat, setShowStat] = useState<boolean>(false)
    const [alertState, setAlertState] = useState({show: false, variant: '', title: '', body: ''})

    useEffect(() => {
        if (state.dataReady && state.isStarted) {
            setInpVal(generateSecretString(state.data[itemNumberInList]?.name))
        }
    }, [itemNumberInList, state.dataReady, state.isStarted])

    useEffect(() => {
        setShowHint(false)
        setItemNumberInList(0)
        setAlertState({show: false, variant: '', body: '', title: ''})
    }, [state.isEnded])

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInpVal(event.target.value)
    }

    const onGuessHandler = (): void => {
        if (itemNumberInList > state.data.length - 1) return

        if (inpVal.toLocaleLowerCase().trim() === state.data[itemNumberInList].name.toLocaleLowerCase()) {
            setItemNumberInList(prevState => prevState + 1)
            setShowHint(false)
            dispatch({type: ActionTypes.UpCountGuesses})
            setAlertState({show: true, variant: 'success', body: 'Yeah... it\'s right :)', title: ''})
            setTimeout(() => {
                setAlertState({...alertState, show: false})
            }, 3000)
        } else {
            dispatch({type: ActionTypes.UpCountWrongGuesses})
            setAlertState({show: true, variant: 'danger', body: 'Noop... it\'s wrong :(', title: ''})
            setTimeout(() => {
                setAlertState({...alertState, show: false})
            }, 3000)
        }

    }

    const onHintHandler = (): void => {
        setShowHint(true)
        dispatch({type: ActionTypes.UpCountHint})
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Game statistics</Popover.Header>
            <Popover.Body>
                <p>Life's: <b style={{color: "blue"}}>{state.playerLifes}</b>.</p>
                <p>Guess: <b style={{color: "green"}}>{state.guesses}</b>.</p>
                <p>Wrong guesses: <b style={{color: "red"}}>{state.wrongGuesses}</b>.</p>
                <p>Using Hints: <b style={{color: "orange"}}>{state.hint}</b>.</p>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='game-screen'>
            {
                state.isLoading
                    ? <div className="text-center">
                        <div className="spinner-grow text-info" role="status" style={{width: '3rem', height: '3rem'}}/>
                        <h4>Loading...</h4>
                    </div>
                    : <div className='row g-3 d-flex justify-content-center'>
                        <div className='' style={{width: '80%'}}>
                            <AlertComponent variant={alertState.variant} title={alertState.title} body={alertState.body} show={alertState.show}/>
                        </div>
                        {
                            showHint &&
                            <div className='hint-div p-3'>
                                <span><span style={{color: "red"}}>Hint: </span>{state.data[itemNumberInList].overview}</span>
                            </div>
                        }
                        <div style={{width: '80%'}}>
                            <label className="form-label">You have <span style={{color: "red"}}>{state.playerLifes}</span> life's</label>
                            <input
                                value={inpVal || ''}
                                onChange={onChangeInput}
                                type="text"
                                className="form-control"
                                id="input"
                                aria-describedby="emailHelp"/>
                        </div>
                        <div className="btn-section">
                            <button onClick={onGuessHandler} className="btn btn-outline-primary btn-sm animation-btn">Check the guess</button>
                            <button className='btn btn-outline-warning ms-2 btn-sm' onClick={onHintHandler}>Hint</button>
                            <OverlayTrigger trigger="click" placement="top" overlay={popover} show={showStat}>
                                <button
                                    className='btn btn-outline-info ms-2 btn-sm'
                                    onClick={() => setShowStat(true)}
                                    onBlur={() => setShowStat(false)}
                                >Statistics
                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
            }
        </div>
    );
};
