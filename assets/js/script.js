'use strict';

$(function() {


  /*
  |--------------------------------------------------------------------------
  | Configure your website
  |--------------------------------------------------------------------------
  |
  | We provided several configuration variables for your ease of development.
  | Read their complete description and modify them based on your need.
  |
  */

  page.config({

    /*
    |--------------------------------------------------------------------------
    | Google Analytics Tracking
    |--------------------------------------------------------------------------
    |
    | If you want to use Google Analytics, you can specify your Tracking ID in
    | this option. Your key would be a value like: UA-12345678-9
    |
    */

    googleAnalyticsId: '',

    /*
    |--------------------------------------------------------------------------
    | Smooth Scroll
    |--------------------------------------------------------------------------
    |
    | If true, the browser's scrollbar moves smoothly on scroll and gives your
    | visitor a better experience for scrolling.
    |
    */

    smoothScroll: true

  });



  /*
  |--------------------------------------------------------------------------
  | Custom Javascript code
  |--------------------------------------------------------------------------
  |
  | Now that you configured your website, you can write additional Javascript
  | code below this comment. You might want to add more plugins and initialize
  | them in this file.
  |
  */
 const heroInner = document.querySelector('.js-hero__inner');
 const heroImage = document.querySelector('.js-hero__image');
 const heroText = document.querySelector('.js-hero__text');

  const heroTransforms = () => {

    function getComputedTranslateXY(obj) {
      const transArr = [];

      if (!window.getComputedStyle) {
        return;
      }

      if ('attributeStyleMap' in obj && obj.attributeStyleMap.get('transform')) {
        const elementTransforms = obj.attributeStyleMap.get('transform');
        return [
          elementTransforms[0].x.value,
          elementTransforms.length > 1 ? elementTransforms[1].y.value : 0
        ];
      }

      const style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
      let mat = transform.match(/^matrix3d\((.+)\)$/);
      if(mat) return parseFloat(mat[1].split(', ')[13]);
      mat = transform.match(/^matrix\((.+)\)$/);
      mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
      mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
      return transArr;
    }

    function handleHeroMouseMove({ currentTarget: target, clientX, clientY }) {
      const { pos: { x: posX, y: posY } = {} } = target;
      const posDiff = {
        x: (clientX - (posX || clientX)),
        y: (clientY - (posY || clientY))
      };

      const [ imageTransformX = 0, imageTransformY = 0 ] = getComputedTranslateXY(heroImage);
      const [ textTransformX = 0, textTransformY = 0 ] = getComputedTranslateXY(heroText);

      // New hero position
      target.pos = {
        x: clientX,
        y: clientY
      };

      heroImage.style.transform = `translateX(${imageTransformX + (posDiff.x / 90)}px) translateY(${imageTransformY + (posDiff.y / 90)}px)`;
      heroText.style.transform = `translateX(${textTransformX - (posDiff.x / 30)}px) translateY(${textTransformY - (posDiff.y / 30)}px)`;
    }

    heroInner.addEventListener('mousemove', handleHeroMouseMove);
  };

  new WOW().init();
  heroImage.addEventListener('animationend', heroTransforms)
});
