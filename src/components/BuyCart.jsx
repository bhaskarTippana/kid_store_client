import React, { useEffect } from "react";

const BuyCart = ({ data,setSubTotal }) => {
  console.log(data);

  useEffect(()=>{
    setSubTotal(  (prev) =>
    prev +
    Math.round(
      Number(data.price.replace("$", "")) * Number(data.occurrences) -
        Number(data.price.replace("$", "")) *
          Number(data.discount / 100) *
          Number(data.occurrences)
    ))
  },[data])


  return (
    <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
      <div className="w-full flex items-center">
        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
          <img className="h-full w-full object-cover" src={data.url} alt="" />
        </div>
        <div className="flex-grow pl-3">
          <h6 className="font-semibold uppercase text-gray-600">{data.name}</h6>
          <p className="text-gray-400">x {data.occurrences}</p>
        </div>
       
        <div className="line-through mr-3">
          <span className="font-semibold text-gray-600 text-xl">
            {" "}
            ${" "}
            {Math.round(
              Number(data.price.replace("$", "")) * Number(data.occurrences)
            )}
          </span>
          <span className="font-semibold text-gray-600 text-sm">.00</span>
        </div>
        <div >
          <span className="font-semibold text-gray-600 text-xl">
            {" "}
            ${" "}
            {Math.round(
              Number(data.price.replace("$", "")) * Number(data.occurrences) -
                Number(data.price.replace("$", "")) *
                  Number(data.discount / 100) *
                  Number(data.occurrences)
            )}
          </span>
          <span className="font-semibold text-gray-600 text-sm">.00</span>
        </div>
      </div>
    </div>
  );
};

export default BuyCart;
