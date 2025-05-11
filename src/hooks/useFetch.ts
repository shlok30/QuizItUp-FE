import React, { useEffect, useState } from "react";

type UseFetchProps = {
    endpoint: string,
    options? :RequestInit
}

type Response = {
    isLoading: boolean,
    isError: boolean,
    data: null | unknown
}

function useFetch({endpoint,options} : UseFetchProps){
    
    const [response, setResponse] = useState<Response>({isLoading: true, data: null, isError: false});

    useEffect(() => {
        let isMounted = true;
        setResponse(prevState => ({...prevState, isLoading: true}));
        async function fetchResponse(){
            try{
                const rawResponse = await fetch(endpoint,options);
                if(!isMounted) return;
                if(rawResponse.status !== 200){
                    setResponse(prevState => ({...prevState, isError: true, isLoading: false}));
                    return;
                }  
                const response = await rawResponse.json();
                if(!isMounted) return;
                setResponse(prevState => ({...prevState, isLoading : false, data: response}));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch(e){
                setResponse(prevState => ({...prevState, isError: true, isLoading : false}));
            }
        }
        fetchResponse();

        return(() => {
            isMounted = false;
        })
    },[endpoint,options]) //Need to make sure options is memoised since its an object and its refernce can change on re renders

    return response;
}

export default useFetch;