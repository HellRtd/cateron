import React, { Component } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
// import shortEats  from "../assets/images/short-eats.jpg";




class Service extends Component {
state = { }
render() {
  return (
  <section id="serv">
    <div className="container">
      <div className="row" id="forService">
        <Controller>
          <Scene duration={2000} offset={100} classToggle="active" triggerElement="#forService" triggerHook="onEnter" reverse={true} indicators={false}>
            <div className="cr-card cr-card--cascade-top cr-card--trim cr-card--shadow-lvl3 cr-animate cr-animate--top mx-3 mx-md-0">
              <p className="cr-card__text cr-card__text--large m-0 text-center font-weight-light">Cateron is a full-service catering and event planning company that can cater for any ocation. Just hit us up, let us know how we can serve you and just step back and relax as we handle the rest.</p>
            </div>
          </Scene>
        </Controller>
      </div> 
    </div>
    <div>
    <article className="container-fluid">    
      <div className="row align-items-center">
        <div className="cr-img cr-img--left col-md-5">
          {/* <a href='https://www.freepik.com/photos/woman' target="__blank">By Cookie Studio - Freepik</a> */}
        </div> 
        <div className="col-md-6" id="event_planing">
        <Controller>
          <Scene duration={2000}  offset={50} classToggle="active" triggerElement="#event_planing" triggerHook="onEnter"reverse={true} indicators={false}>    
              <div className="cr-card cr-card--cascade-left cr-card--trim cr-card--shadow-lvl2 cr-animate cr-animate--right"> 
                <h1 className="cr-title mb-4">Event Planning</h1>
                  <div className="base-font--x-large">Want help to plan a memorable party/celebration with your loved one's?  Look no further, just hit us up, we'll ensure that it'll be memorable within the budget you want! </div> 
              </div>  
          </Scene>
        </Controller>
        </div>
      </div>
    </article> 

    <article className="container-fluid mt-md-5 mt-1">    
      <div className="row align-items-center justify-content-end">
        <div className="cr-img cr-img--right col-md-5 order-md-1">
          {/* <a href='https://www.freepik.com/photos/food' target="__blank"> By Timolina - Freepik</a> */}
        </div> 
        <div className="col-md-6 text-md-right" id="catering">
          <Controller>
            <Scene duration={2000}  offset={50} classToggle="active" triggerElement="#catering" triggerHook="onEnter" reverse={true} indicators={false}>    
                <div className="cr-card cr-card--cascade-right cr-card--trim cr-card--shadow-lvl2 order-md-0 cr-animate cr-animate--left">
                  <h1 className="cr-title mb-4">Catering</h1>
                    <div className="base-font--x-large">We specialize in cakes, pies and pastas. We also have special menues for any special occation. Send us a request with what you need and we'll get back to you</div> 
                </div>  
            </Scene>
          </Controller>
        </div>
      </div>
    </article> 
    </div>
  </section>
  );
}
}

export default Service;