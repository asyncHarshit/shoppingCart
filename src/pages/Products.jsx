import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingCardContext } from '../Context';

const products = () => {
  const {id} = useParams();
  const {productDetails , setProductDetails  ,loading ,setLoading} = useContext(ShoppingCardContext);

  useEffect(()=>{
    fetchProductDetails(id);

  },[id])

  async function fetchProductDetails(id){
      const apiResponse = await fetch(`https://dummyjson.com/products/${id}`)
      const result = await apiResponse.json();
      // console.log(result);
      if(result){
        setProductDetails(result);
        setLoading(false);
      }
  }

  console.log(productDetails)
  if(loading){
    return <h1>Loading.. </h1>
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6 bg-gray-50 rounded-lg">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold text-gray-900">{productDetails?.title}</h2>
            </div>
            <div className="px-4 py-10 rounded-xl shadow-lg bg-white relative flex justify-center">
              <img
                className="w-4/5 max-h-96 rounded object-cover mx-auto"
                src={productDetails?.thumbnail}
                alt={productDetails?.title}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 mx-auto">
              {productDetails?.images?.length
                ? productDetails.images.map((imageitem) => (
                    <div className="rounded-xl p-2 shadow-md bg-white" key={imageitem}>
                      <img
                        src={imageitem}
                        alt="productSecondaryImage"
                        className="w-20 h-20 object-cover rounded cursor-pointer border hover:border-blue-500 transition"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default products