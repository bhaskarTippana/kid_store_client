import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import deleted from "../Assets/delete.svg"
const BuyCart = ({ data, setSubTotal }) => {
  console.log(data, "nnnn");
  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5500/buyCart",
        { action: "SINGLE_PRODUCT_REMOVE", product: data },
        { headers: { token: token } }
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: "SINGLE_PRODUCT_ADD", payload: res.data.buyCart });
        setSubTotal(prev=>prev-  Math.round(
          Number(data.price.replace("$", "")) -
            Number(data.discount / 100) * Number(data.price.replace("$", ""))
        ));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSubTotal(
      (prev) =>
        prev +
        Math.round(
          Number(data.price.replace("$", "")) -
            Number(data.discount / 100) * Number(data.price.replace("$", ""))
        )
    );
  }, []);

  return (
    <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
      <div className="w-full flex items-center">
        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
          <img className="h-full w-full object-cover" src={data.url} alt="" />
        </div>
        <div className="flex-grow pl-3">
          <h6 className="font-semibold uppercase text-gray-600">{data.name}</h6>
          <p className="text-gray-400">
            x {data.quantity > 1 ? data.quantity : 1}
          </p>
        </div>

        <div className="line-through mr-3">
          <span className="font-semibold text-gray-600 text-xl">
            {" "}
            $ {Math.round(Number(data.price.replace("$", "")))}
          </span>
          <span className="font-semibold text-gray-600 text-sm">.00</span>
        </div>
        <div>
          <span className="font-semibold text-gray-600 text-xl">
            {" "}
            ${" "}
            {Math.round(
              Number(data.price.replace("$", "")) -
                Number(data.discount / 100) *
                  Number(data.price.replace("$", ""))
            )}
          </span>
          <span className="font-semibold text-gray-600 text-sm">.00</span>
        </div>
        <button onClick={()=>handleRemove()} className="text-3xl pl-5"><img src={deleted} alt="" /></button>
      </div>
    </div>
  );
};

export default BuyCart;
