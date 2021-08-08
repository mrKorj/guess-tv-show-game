import {Dispatch} from "react";
import {IAction, IShowItem} from "./interfaces";
import {ActionTypes} from "./actionTypes";
import axios from "axios";
import {api_key} from "../api_key";

export const getDataFromApiAction = async (dispatch: Dispatch<IAction>) => {
    dispatch({type: ActionTypes.GetDataStart})
    const randomPageNumber = Math.floor(Math.random() * 10) + 1

    try {
        const res = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=${randomPageNumber}`)
        const data: IShowItem[] = res.data.results.map((item: IShowItem) => {
            return {
                id: item.id,
                name: item.name,
                overview: item.overview
            }
        })

        dispatch({
            type: ActionTypes.GetDataEnd,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: ActionTypes.GetDataError,
            payload: e.status_message
        })
    }
}
