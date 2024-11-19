import React from 'react';

const SecondSection = () => {
  return (
    <div className="second-section">
      <img className="base-img" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/500x500/img/599eillustration-hft1.png" alt="" />
      <img className="props-mobile-screen" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/350x350/img/1cf1mobile.png" alt="" />
      <img className="model-img prop-ref zoom-in-effect-model drop-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/350x400/img/7ed1model.a5c04323.png" alt="" />
      <img className="prop-money prop-ref drop-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/250x250/img/ebaamoneystack.png" alt="" />
      <img className="prop-heart prop-ref drop-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/img/1d52heart.png" alt="" />
      <img className="prop-gift prop-ref drop-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/250x250/img/3249gift.png" alt="" />
      <img className="prop-play-button prop-ref drop-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/250x250/img/5a72play-button.png" alt="" />
      <img className="props-blocks prop-ref drop-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/250x250/img/6ccfcollab.png" alt="" />
      <img className="props-hashtag prop-ref drop-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/250x250/img/64adhashtag.png" alt="" />
      <img className="props-pebble screen-ref zoom-in-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/250x250/img/9641pebble-screen.png" alt="" />
      <img className="props-product-1 screen-ref zoom-in-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/150x150/img/c978product-1.png" alt="" />
      <img className="props-product-2 screen-ref zoom-in-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/150x150/img/1beeproduct-2.png" alt="" />
      <img className="props-collection screen-ref zoom-in-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/150x150/img/3894collection.png" alt="" />
      <img className="props-withdraw screen-ref zoom-in-effect" src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/250x250/img/4dd2withdraw.png" alt="" />
      
      {[...Array(7)].map((_, index) => (
        <div className="orbital-container" key={index}>
          <div className={`orbital-path path-${index + 1}`}>
            <div className={`celestial-${index + 1}`}>
              <img src={`https://dmk9je7eclmvw.cloudfront.net/assets/img/${getImageName(index)}`} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getImageName = (index) => {
  const imageNames = [
    '5d92like.png',
    '6e70ig.png',
    '8098emoji-money.png',
    'a84btwitter.png',
    'b8f5notification-heart.png',
    'c6d8yt.png',
    'd46cfb.png'
  ];
  return imageNames[index];
};

export default SecondSection;
