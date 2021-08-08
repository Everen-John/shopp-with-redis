import React from "react";

export default function product({
  productID,
  productName,
  productDescription,
  productImagePath,
  addCartHandler,
}) {
  const handleAddCart = (e) => {
    addCartHandler(e.target.value);
  };

  return (
    <div className="col">
      <div className="card" style={{ width: "18rem" }}>
        {productImagePath ? (
          <img
            className="card-img-top"
            src={productImagePath}
            width="286"
            height="180"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <img
            className="card-img-top"
            src="images/100px180.svg"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{productName}</h5>
          <p className="card-text">{productDescription}</p>
          <button
            className="btn btn-primary"
            value={productID}
            onClick={handleAddCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
