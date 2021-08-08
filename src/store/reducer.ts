import {IAction, IShowItem, IState} from "./interfaces";
import {ActionTypes} from "./actionTypes";

export const initialState: IState = {
    data: [],
    playerName: null,
    playerLifes: 3,
    wrongGuesses: 0,
    guesses: 0,
    hint: 0,
    isLoading: false,
    isStarted: false,
    isEnded: false,
    dataReady: false,
    message: null
}

export const reducer = (state: IState = initialState, action: IAction): IState => {
    switch (action.type) {
        case ActionTypes.StartGame: {
            return {
                ...initialState,
                isStarted: true
            }
        }
        case ActionTypes.EndGame: {
            return {
                ...state,
                isEnded: true,
            }
        }
        case ActionTypes.GetDataStart: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionTypes.GetDataEnd: {
            return {
                ...state,
                isLoading: false,
                data: action.payload as IShowItem[],
                dataReady: true
            }
        }
        case ActionTypes.GetDataError: {
            return {
                ...state,
                isLoading: false,
                message: action.payload as any
            }
        }
        case ActionTypes.UpCountGuesses: {
            return {
                ...state,
                guesses: state.guesses + 1
            }
        }
        case ActionTypes.UpCountWrongGuesses: {
            return {
                ...state,
                wrongGuesses: state.wrongGuesses + 1,
                playerLifes: state.playerLifes - 1
            }
        }
        case ActionTypes.UpCountHint: {
            return {
                ...state,
                hint: state.hint + 1
            }
        }

        default: {
            return state
        }
    }
}
