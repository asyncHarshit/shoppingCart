import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const ShoppingCardContext = createContext(null);


function ShoppingCardProvider ({children}){

    const [loading , setLoading] = useState(true);
    const [listOfProducts , setListOfProducts] = useState([]);
    const [productDetails , setProductDetails] = useState(null);
    const [cartItem , setCartItem] = useState([]);
    const navigate = useNavigate();

    async function fetchListOfProducts() {

        const apiResponse = await fetch('https://dummyjson.com/products');
        const result = await apiResponse.json();
        // console.log(result);

        if(result && result?.products){
            setListOfProducts(result?.products)
            setLoading(false);
        }
        
        
    }


    function handleAddToCart(getProductInfo){
        // console.log(getProductInfo);

        let existingCartDetails = [...cartItem];
        const findIndexOfCurrentItem = existingCartDetails.findIndex(item=> item.id === getProductInfo.id);
        if(findIndexOfCurrentItem === -1){
            existingCartDetails.push({
                ...getProductInfo,
                quantity : 1,
                totalPrice : getProductInfo?.price
            })
        }else{
             existingCartDetails[findIndexOfCurrentItem] = {
        ...existingCartDetails[findIndexOfCurrentItem],
        quantity: existingCartDetails[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (existingCartDetails[findIndexOfCurrentItem].quantity + 1) *
          existingCartDetails[findIndexOfCurrentItem].price,
        };
        }

 
        setCartItem(existingCartDetails);
        localStorage.setItem("cartItem" , JSON.stringify(existingCartDetails))
        navigate('/cart')
        
    }

    function handleRemoveFromCart(getProductInfo , isFullyRemoved){
        let existingCartDetails = [...cartItem];
        const findIndexOfCurrentItem = existingCartDetails.findIndex(item=> item.id === getProductInfo.id);
        if(isFullyRemoved){
            existingCartDetails.splice(findIndexOfCurrentItem , 1);
        }else{
            existingCartDetails[findIndexOfCurrentItem] = {
        ...existingCartDetails[findIndexOfCurrentItem],
        quantity: existingCartDetails[findIndexOfCurrentItem].quantity - 1,
        totalPrice:
          (existingCartDetails[findIndexOfCurrentItem].quantity - 1) *
          existingCartDetails[findIndexOfCurrentItem].price,
        };
        }

        localStorage.setItem("cartItem", JSON.stringify(existingCartDetails));
        setCartItem(existingCartDetails);
    }


    useEffect(()=>{
        fetchListOfProducts();
        const storedCartItems = JSON.parse(localStorage.getItem("cartItem"));
        setCartItem(Array.isArray(storedCartItems) ? storedCartItems : []);


    },[])

    console.log(cartItem);
    

    
    return(
        <ShoppingCardContext.Provider value={{listOfProducts,loading ,handleRemoveFromCart,cartItem, setLoading , productDetails , setProductDetails , handleAddToCart}}>{children}</ShoppingCardContext.Provider>

    )
}

export default ShoppingCardProvider;