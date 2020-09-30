import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer className="page-footer bg-dark  py-4" id="footer" style={{ color: 'white' }}>
        <div className="text-center py-3">
          <span style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('front', {}); } }>
            <span className="ml-1">Shopify</span>
          </span>
          <p className="text-center">Designed and Developed by Julius Oh</p>
        </div>
      </footer>
    );
  }
}
