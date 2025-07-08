import React, { useCallback, useEffect, useMemo } from "react";
import { getCacheKey, handleAuthError } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import useFetch from "./useFetch";
import endpoints from "../endpoints";
import { useLocation, useNavigate } from "react-router";
import { History, setCacheEntry } from "../features/quiz";

type UseGetHistoryProps = {
    queryParams: URLSearchParams
}

function useGetHistory({queryParams} : UseGetHistoryProps){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search: queryParamsString } = useLocation();

    const token = localStorage.getItem("token");
    const options = useMemo(() => ({headers: {Authorization: `Bearer ${token}`}}),[token]);

    const cacheKey = getCacheKey(queryParams);
    const cacheEntries = useSelector((state: RootState) => state.quiz.history);
    const cachedValue = cacheEntries[cacheKey];

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