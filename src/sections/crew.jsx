import React, { Component } from 'react';
import { Controller, Scene } from 'react-scrollmagic';


class Crew extends Component {
  state = {  }
  render() { 
    return ( 
      <section id="crew">
        <div className='text-center'>
          <Controller>
            <Scene duration={1000}  offset={250} classToggle="active" triggerElement="#crew" triggerHook="onEnter" reverse={true} indicators={false}>    
              <div className="cr-title-wrapper cr-title-wrapper--trim cr-animate cr-animate--focus mb-4">
                <h1 className="cr-title font-weight-light">Who We Are</h1>
                <h4 className="cr-title-tag">A heart to heart</h4>
              </div>
            </Scene>
          </Controller>
        </div>
        <article className="cr-hero-block d-flex align-items-center justify-content-center"> 
          <div className="container">
            <p className="text-white text-center font-weight-light text-italic text-responsive text-responsive--small">We are a company starting from humble beginings dedicated on making your events memorable. It's pretty simple too, you just contact us
             directly or send an email mentioning what you want and we'll be ready to help. </p>
          </div>
        </article>
        <article className='text-center my-4' id="the_quote">
          <Controller>
            <Scene duration={1000}  offset={50} classToggle="active" triggerElement="#the_quote" triggerHook="onEnter" reverse={true} indicators={false}>
              <blockquote className="cr-quote">
                <h4 className="cr-quote__text">
                  Psst.., since you came this far, just hit us up,  we just might be <br/>what you are looking for. 
                </h4>
              </blockquote>
            </Scene>
          </Controller>
        </article>
      </section>
       );
  }
}
 
export default Crew;