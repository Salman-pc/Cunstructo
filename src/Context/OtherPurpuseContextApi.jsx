import React, { createContext, useState, useEffect } from "react";
import { getADDSApi, getCategoryApi } from "../services/allApi";


export const displaycategoryContext = createContext([]);
export const displayadvertisContext = createContext()
export const displayProfileContext = createContext()
export const reciverIdContext = createContext()
export const selectedChattoUserContext = createContext()

function OtherPurpuseContextApi({ children }) {

    const [categoryResponse, setCategoryResponse] = useState([]);
    const [addsCatogoryResponse, setaddsandCatogoryResponse] = useState({})
    const [advertisresponse, setadvertisresponse] = useState([])
    const [profileResponse, setProfileResponse] = useState()
    const [reciveridResponse, setreciveridResponse] = useState()
    const [selectduserResponse, setselectduserResponse] = useState()

    // console.log(profileResponse, "profileResponse ");


    // Fetch categories when the context provider mounts
    useEffect(() => {
        fetchAdvertaies()
        fetchCategories();
    }, [addsCatogoryResponse]);

    const fetchAdvertaies = async () => {
        try {
            const result = await getADDSApi();
            setadvertisresponse(result.data);
            // console.log("advertis loaded in context:", result.data);
        } catch (error) {
            console.error("Error fetching advertis:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const result = await getCategoryApi();
            setCategoryResponse(result.data);
            // console.log("Categories loaded in context:", result.data);
        } catch (error) {
            // console.error("Error fetching categories:", error);
        }
    };
    return (
        <selectedChattoUserContext.Provider value={{ selectduserResponse, setselectduserResponse }}>
            <reciverIdContext.Provider value={{ setreciveridResponse, reciveridResponse }}>
                <displayProfileContext.Provider value={{ setProfileResponse, profileResponse }}>
                    <displayadvertisContext.Provider value={{ advertisresponse, setaddsandCatogoryResponse }}>
                        <displaycategoryContext.Provider
                            value={{ categoryResponse, setCategoryResponse, setaddsandCatogoryResponse }}
                        >
                            {children}
                        </displaycategoryContext.Provider>
                    </displayadvertisContext.Provider>
                </displayProfileContext.Provider>
            </reciverIdContext.Provider>
        </selectedChattoUserContext.Provider>

    )
}

export default OtherPurpuseContextApi