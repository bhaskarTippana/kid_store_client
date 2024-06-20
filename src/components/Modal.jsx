import React from "react";

const Modal = ({ selectedProduct, closeModal }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-100 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex items-center justify-end mb-4">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={closeModal}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {selectedProduct.items.length > 0 &&
          selectedProduct.items.map((item, index) => (
            <div key={index} className="bg-blue-100 mb-4 p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  src={item.url}
                  className="h-16 w-16 rounded-full  mr-4"
                  alt=""
                />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600">
                    {`${(
                      parseFloat(item.price.replace("$", "")) -
                      (parseFloat(item.price.replace("$", "")) *
                        item.discount) /
                        100
                    ).toFixed(2)} x ${item.quantity || 1}`}
                  </p>
                  <p className="text-gray-600">
                    {" "}
                    GST :
                {(
                      (parseFloat(item.price.replace("$", "")) -
                      (parseFloat(item.price.replace("$", "")) *
                        item.discount) /
                        100
                    )*0.18).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {selectedProduct.items.length === 0 && (
          <div className="bg-blue-100 mb-4 p-4 rounded-lg">
            <div className="flex items-center">
              <img
                src={selectedProduct.url}
                className="h-16 w-16 rounded-full object-contain mr-4"
                alt=""
              />
              <div>
                <p className="text-lg font-semibold">{selectedProduct.name}</p>
                <p className="text-gray-600">
                  {selectedProduct.price + "x" + selectedProduct.quantity || 1}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
