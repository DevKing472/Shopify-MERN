import React from 'react';

export default class FrontModal extends React.Component {
  render() {
    return (
      <div className="background-modal position-fixed d-flex h-100 w-100" >
        <div className="modal-contents m-auto bg-white border rounded mt-5 p-3">
          <h2 className="m-2">Welcome to Shopify!</h2>
          <hr></hr>
          <p className="m-2">Please note that this website is for demonstration purposes only and that no real purchases will be made.</p>
          <form onSubmit={event => {
            event.preventDefault();
            this.props.close();
          }}>
            <div className="form-check m-2">
              <input className="form-check-input" type="checkbox" id="acknowledgement" required />
              <label className="form-check-label" htmlFor="acknowledgement">I understand and agree with the statement above.</label>
            </div>
            <div className="btn-group w-100 p-1">
              <button className="btn btn-success w-100">Time to shop!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
