export interface IAction {
    type: string,
    payload?: Record<string, any>
}

export interface IShowItem {
    id: number,
    name: string,
    overview: string
}

export interface IState {
    data: IShowItem[],
    isLoading: boolean,
    isStarted: boolean,
    isEnded: boolean,
    playerName?: string | null,
    playerLifes: number,
    guesses: number,
    wrongGuesses: number,
    hint: number,
    dataReady: boolean,
    message?: string | null,
}
