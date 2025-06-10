import { useContext } from 'react'
import { ShoppingCardContext } from '../Context'
import ProductTile from '../Component/ProductTile';


const productList = () => {

  const {listOfProducts , loading} = useContext(ShoppingCardContext);
  // console.log(listOfProducts)
  if(loading)  return <h1> Loading ....</h1>
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 min-h-screen">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-full">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 lg:mt-16 lg:gap-8 w-full">
          {listOfProducts && listOfProducts.length > 0 ? (
            listOfProducts.map((singleProductTile, idx) => (
              <ProductTile key={singleProductTile.id || idx} singleProductTile={singleProductTile} />
            ))
          ) : (
            <h3 className="col-span-full text-center">No Products Found</h3>
          )}
        </div>
      </div>
    </section>
  )
}

export default productList