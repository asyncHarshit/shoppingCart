import { createContext, useEffect, useState } from "react";


export const ShoppingCardContext = createContext(null);


function ShoppingCardProvider ({children}){

    const [loading , setLoading] = useState(true);
    const [listOfProducts , setListOfProducts] = useState([]);
    const [productDetails , setProductDetails] = useState(null)

    async function fetchListOfProducts() {

        const apiResponse = await fetch('https://dummyjson.com/products');
        const result = await apiResponse.json();
        // console.log(result);

        if(result && result?.products){
            setListOfProducts(result?.products)
            setLoading(false);
        }
        
        
    }

    useEffect(()=>{
        fetchListOfProducts();


    },[])

    // console.log(listOfProducts);
    

    
    return(
        <ShoppingCardContext.Provider value={{listOfProducts,loading , setLoading , productDetails , setProductDetails}}>{children}</ShoppingCardContext.Provider>

    )
}

export default ShoppingCardProvider;