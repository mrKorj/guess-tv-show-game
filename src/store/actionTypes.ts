export enum ActionTypes {
    GetDataStart = 'GET_DATA_START',
    GetDataEnd = 'GET_DATA_END',
    GetDataError = 'GET_DATA_ERROR',

    UpCountGuesses = 'UP_COUNT_GUESSES',
    UpCountWrongGuesses = 'UP_COUNT_WRONG_GUESSES',
    UpCountHint = 'UP_COUNT_HINT',

    StartGame = 'START_GAME',
    EndGame = 'END_GAME',

    Message = 'MESSAGE',
    ClearMessage = 'CLEAR_MESSAGE',
}
