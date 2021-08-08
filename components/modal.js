import React from "react";

export default function modal({ showModal, setShowModal }) {
  return (
    <div
      className="modal-lg position-fixed modal-custom"
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
          <div className="modal-body">
            <div className="row">
              <div>Test</div>
            </div>
            <div className="row">
              <div>Test</div>
            </div>
            <div className="row">
              <div>Test</div>
            </div>
            <div className="row">
              <div>Test</div>
            </div>
            <div className="row">
              <div>Test</div>
            </div>
          </div>
          <div className="modal-footer">
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
