import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, LOCAL_URL } from "../config";

const SearchItems = ({ setSearchInfo, searchInfo, setFocus }) => {
  const [paths, setPaths] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Products);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${LOCAL_URL}kids-store/products/all`);
      dispatch({ type: "PRODUCTS", payload: res.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInfo.toLowerCase())
  );

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setPaths([...paths, location.pathname]);
  };

  useEffect(() => {
    getProducts();
  }, [paths]);

  return (
    <ul className="h-full w-full md:h-[40em] md:w-[40em] bg-[#fff] m-auto rounded-md overflow-y-scroll">
      {products.length > 0 && searchInfo === "" ? (
        products.map((product) => (
          <li
            key={product._id}
            className="bg-[#176b8721] flex items-center gap-5 p-3 m-3 rounded-lg drop-shadow-sm"
            onClick={() => handleProductClick(product._id)}
          >
            <p className="w-[3em] h-[3em] rounded-full">
              <img
                className="w-full h-full rounded-full object-center"
                src={product.url}
                alt={product.name}
              />
            </p>
            <p className="text-black font-bold">{product.name}</p>
          </li>
        ))
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <li
            key={product._id}
            className="bg-[#176b8721] flex items-center gap-5 p-3 m-3 rounded-lg drop-shadow-sm"
            onClick={() => handleProductClick(product._id)}
          >
            <p className="w-[3em] h-[3em] rounded-full">
              <img
                className="w-full h-full rounded-full object-center"
                src={product.url}
                alt={product.name}
              />
            </p>
            <p className="text-black font-bold">{product.name}</p>
          </li>
        ))
      ) : (
        <li className="bg-[#00000021] rounded-lg h-full flex items-center justify-center w-96 md:w-full">
          <img
            className="w-[90%] h-[50%] rounded-lg"
            src="https://www.clipartmax.com/png/middle/153-1533013_sorry-no-results-found.png"
            alt="No results found"
          />
        </li>
      )}
    </ul>
  );
};

export default SearchItems;
