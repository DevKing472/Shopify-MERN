import React from 'react';

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'front'
    };
  }

  render() {
    return (
      <>
        <div className="carousel slide" style={{ width: '100%' }} data-ride="carousel" data-interval="2000">
          <div className="carousel-inner">
            <div className="carousel-item active front-image front-image-1" >
            </div>
            <div className="carousel-item front-image front-image-2" >
            </div>
            <div className="carousel-item front-image front-image-3" >
            </div>
          </div>
        </div>
        <div className="container" >
          <div className="card-deck d-flex flex-nowrap justify-content-center " >
            <div
              className="category col-md-6 bgImg1 product m-3"
              onClick={() => { this.props.setView('catalog', { type: 'striking' }); }}>
              <div className="content p-3">
                <h1>Boxing and Muay Thai</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
            <div
              className="category col-md-6 bgImg2 product m-3"
              onClick={() => { this.props.setView('catalog', { type: 'grappling' }); }}>
              <div className="content p-3">
                <h1>Brazillian Jiu Jitsu</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
            <div
              className="category col-md-6 bgImg3 product m-3"
              onClick={() => { this.props.setView('catalog', { type: 'fitness' }); }}>
              <div className="content p-3">
                <h1>Fitness Supplement</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
