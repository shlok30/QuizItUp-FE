import React, { useCallback, useEffect } from "react";
import { getCacheKey, handleAuthError } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import useFetch from "./useFetch";
import { Quizzes } from "../types";
import endpoints from "../endpoints";
import { useLocation, useNavigate } from "react-router";
import { History, setCacheEntry } from "../features/quiz";

type UseGetHistoryProps = {
    queryParams: URLSearchParams
}

const options = {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}};

function useGetHistory({queryParams} : UseGetHistoryProps){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search: queryParamsString } = useLocation();

    const cacheKey = getCacheKey(queryParams);
    const cacheEntries = useSelector((state: RootState) => state.quiz.history);
    const cachedValue = cacheEntries[cacheKey];

    console.log("Cached Entries",cacheEntries);

    const onError = useCallback((response: Response) => handleAuthError(response.status, dispatch, navigate),[dispatch, navigate])
    const {data, isLoading, isError} = useFetch<History>({endpoint: `${endpoints.getAllQuizzes}${queryParamsString}`, options, onError, skip: Boolean(cachedValue)});

    useEffect(() => {
        if(data && !cachedValue){
            dispatch(setCacheEntry({key: cacheKey, data}));
        }
    },[data, cachedValue, dispatch, cacheKey])

    return {isLoading: cachedValue ? false : isLoading, isError, data : cachedValue || data};

}

export default useGetHistory;