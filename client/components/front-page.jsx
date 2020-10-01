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
          <div className="card-deck d-flex justify-content-center " >
            <div
              className="category col-md-4 bgImg1 product my-3"
              onClick={() => { this.props.setView('catalog', { categoryId: 3 }); }} >
              <div className="content p-3">
                <h1>Striking</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
            <div
              className="category col-md-4 bgImg2 product my-3"
              onClick={() => { this.props.setView('catalog', { categoryId: 4 }); }}>
              <div className="content p-3">
                <h1>Grappling</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
            <div
              className="category col-md-4 bgImg3 product my-3"
              onClick={() => { this.props.setView('catalog', { categoryId: 5 }); }}>
              <div className="content p-3">
                <h1>Fitness</h1>
                <h6 className="text-center">SHOP NOW</h6>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
