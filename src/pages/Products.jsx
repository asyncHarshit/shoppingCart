import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShoppingCardContext } from '../Context';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productDetails, setProductDetails, loading, setLoading ,handleAddToCart} = useContext(ShoppingCardContext);

  useEffect(() => {
    setLoading(true);
    fetchProductDetails(id);
    // eslint-disable-next-line
  }, [id]);

  async function fetchProductDetails(id) {
    try {
      const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await apiResponse.json();
      if (result) {
        setProductDetails(result);
      }
    } catch (error) {
      setProductDetails(null);
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-red-500">Product not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900">{productDetails.title}</h2>
          <span className="text-xl font-bold text-blue-600 mt-2 md:mt-0">${productDetails.price}</span>
        </div>
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-12 shadow-sm p-6 bg-gray-50 rounded-lg">
          <div className="w-full flex flex-col items-center">
            <div className="px-4 py-10 rounded-xl shadow-lg bg-white relative flex justify-center w-full">
              <img
                className="w-full max-w-md max-h-96 rounded object-cover mx-auto"
                src={productDetails.thumbnail}
                alt={productDetails.title}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 mx-auto">
              {productDetails.images?.length
                ? productDetails.images.map((imageitem, idx) => (
                    <div className="rounded-xl p-1 shadow bg-white" key={imageitem + idx}>
                      <img
                        src={imageitem}
                        alt="productSecondaryImage"
                        className="w-16 h-16 object-cover rounded cursor-pointer border hover:border-blue-500 transition"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-gray-700 text-lg">{productDetails.description}</p>
            <div className="flex items-center gap-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                In Stock: {productDetails.stock}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Rating: {productDetails.rating}
              </span>
            </div>
            <button onClick={()=>handleAddToCart(productDetails)} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;