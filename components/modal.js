import { React, useState, useEffect } from "react";

export default function modal({ showModal, setShowModal }) {
  const [cartData, setcartData] = useState([]);
  const [price, setPrice] = useState(0);
  useEffect(async () => {
    const response = await fetch("/api/showCartItems", {
      method: "GET",
    });
    const data = await response.json();
    let tempPrice = 0;
    let processor = 0;
    data.map((item) => {
      processor = item.price.replace("RM", "");
      processor = parseFloat(processor);
      tempPrice += processor;
    });
    setPrice(tempPrice.toFixed(2));
    setcartData(data);
  }, [showModal ? showModal : null]);

  return (
    <div
      className="modal-fullscreen shadow-lg position-fixed modal-custom"
      tabindex="-1"
      role="dialog"
    >
      <div className="modal-modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Shopping Cart {"  "}</h5>
            <button
              type="button"
              className="btn close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={setShowModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-dialog-scrollable">
            {cartData.map((item) => (
              <div className="row">
                <p className="col-9 p-4">{item.name}</p>
                <p className="col-3 p-4">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <p>{price}</p>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={setShowModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .modal-custom {
            z-index: 1;
            box-shadow: 5px 10px 10px #1a35ff17;
          }
        `}
      </style>
    </div>
  );
}
