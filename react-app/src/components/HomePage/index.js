import React from "react";

function HomePage() {

  return (
    <div className="bg-blue-0bf">
      <div className="txt-ali-center pad-t-4rem">
        <h1 className="color-white mrg-t-0p fontS-300rem">The smart to-do app for busy people.</h1>
      </div>
      <div className="width-max-700p mrg-lr-auto flx-col flx-ai-center">
        <div className="flx gap15p">
          <div className="bg-white width-fit pad10p borderR-10p width-max-250p">
            <span className="fontW-600 fontS-115rem">
                Watch "Return of Iron Man" on Friday night.
              </span>
          </div>
          <div className="bg-white width-fit pad10p borderR-10p height-fit">
            <span className="fontW-600 fontS-115rem">
              Go to Picnic Day tomorrow.
            </span>
          </div>
        </div>
        <div className="pad-t-4rem">
          <img src="https://www.rememberthemilk.com/img/hp_steve_2.png?1663390145" alt="a person" />
        </div>
        <div className="color-white txt-ali-center">
          <h1>Get reminded, from here now</h1>
          <p className="">
            Stop thinking about to-dos, and let the app remember for you.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
