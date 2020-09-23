import React from 'react'
import { useState } from 'react'

//context object
export const ProductsContext = React.createContext({
   products: []
})


//provider component
export default props => {
   const initialState =
      [
         {
            id: 'p1',
            title: 'Red Scarf',
            description: 'A pretty red scarf.',
            isFavorite: false
         },
         {
            id: 'p2',
            title: 'Blue T-Shirt',
            description: 'A pretty blue t-shirt.',
            isFavorite: false
         },
         {
            id: 'p3',
            title: 'Green Trousers',
            description: 'A pair of lightly green trousers.',
            isFavorite: false
         },
         {
            id: 'p4',
            title: 'Orange Hat',
            description: 'Street style! An orange hat.',
            isFavorite: false
         }
      ]

   const [productsList, setproductsList] = useState(initialState)

   return (
      <ProductsContext.Provider value={{ products: productsList }}>
         {props.children}
      </ProductsContext.Provider>
   )
}