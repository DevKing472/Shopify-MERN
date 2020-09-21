import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="page-footer bg-dark mt-5 py-1" id="footer" style={{ color: 'white' }}>
        <div className="text-center py-3">
          <span style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('front', {}); } }>
            <i className="fas fa-boxing-glove my-3"></i>
          </span>
          <span className="ml-1">Shopify</span>
          <p className="text-center">Designed and Developed by Julius Oh</p>
        </div>
      </footer>
    );
  }
}
