import { useEffect, useRef, useState } from "react";

type UseFetchProps = {
    endpoint: string,
    options? :RequestInit,
    onError?: (response: globalThis.Response) => void,
    skip?: boolean
}

type Response<T> = {
    isLoading: boolean,
    isError: boolean,
    data: T | null
}

function useFetch<T = unknown>({endpoint,options, onError, skip} : UseFetchProps): Response<T>{
    
    const [response, setResponse] = useState<Response<T>>({isLoading: true, data: null, isError: false});

    const ref = useRef(endpoint);

    useEffect(() => {
        if(skip) return;
        let isMounted = true;
        const controller = new AbortController();
        const { signal } = controller;
        setResponse({isError: false ,isLoading: true, data: null});
        ref.current = endpoint;
        async function fetchResponse(){
            try{
                const rawResponse = await fetch(endpoint,{...options, signal});
                if(!isMounted) return;
                if(rawResponse.status !== 200){
                    setResponse(prevState => ({...prevState, isError: true, isLoading: false}));
                    if(onError) onError(rawResponse);
                    return;
                }  
                const response = await rawResponse.json();
                if(!isMounted) return;
                setResponse(prevState => ({...prevState, isLoading : false, data: response}));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch(e){
                if (!isMounted || (e instanceof DOMException && e.name === "AbortError")) return;
                setResponse(prevState => ({...prevState, isError: true, isLoading : false}));
            }
        }
        fetchResponse();

        return(() => {
            isMounted = false;
            controller.abort();
        })
    },[endpoint, options, onError, skip]) //Need to make sure options is memoised since its an object and its refernce can change on re renders

    return ref.current !== endpoint ? {isLoading: false, isError: false, data: null}  : response;
}

export default useFetch;