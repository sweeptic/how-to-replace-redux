import React from 'react';
// import { useContext } from 'react';
import { useStore } from '../hooks-store/store';
// import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
// import { ProductsContext } from '../context/products-context';

import './Products.css';


const Products = props => {

  const [state, dispatch] = useStore();


  // const productList = useSelector(state => state.shop.products);

  //recreated when ever we change something in that list
  // const productList = useContext(ProductsContext).products;

  return (
    <ul className="products-list">
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
