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

    function getComputedTranslateXYZ(obj) {

      if (!window.getComputedStyle) {
        return;
      }

      if ('attributeStyleMap' in obj && obj.attributeStyleMap.get('transform')) {
        const elementTransforms = obj.attributeStyleMap.get('transform');

        return [
          elementTransforms[0].x ? elementTransforms[0].x.value : 0,
          elementTransforms[0].y ? elementTransforms[0].y.value : 0,
          elementTransforms[0].z ? elementTransforms[0].z.value : 0
        ];
      }

      const style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;

      let mat = transform.match(/^matrix3d\((.+)\)$/);
      let indexes = [12, 13, 14];

      if (!mat) {
        mat = transform.match(/^matrix\((.+)\)$/);
        indexes = [4, 5, 6];
      }

      const matSplited = mat[1].split(', ');
      const transformArray = indexes.map(index => matSplited.length > index ? parseFloat(matSplited[index]) : 0);
      console.log(transformArray);
      return transformArray;
    }

    function handleHeroMouseMove({ currentTarget: target, clientX, clientY }) {
      const { pos: { x: posX, y: posY } = {} } = target;
      const posDiff = {
        x: (clientX - (posX || clientX)),
        y: (clientY - (posY || clientY))
      };

      const [ imageTransformX, imageTransformY, imageTransformZ ] = getComputedTranslateXYZ(heroImage);
      const [ textTransformX, textTransformY, textTransformZ ] = getComputedTranslateXYZ(heroText);

      // New hero position
      target.pos = {
        x: clientX,
        y: clientY
      };

      heroImage.style.transform = `translate3d(${imageTransformX - (posDiff.x / 30)}px,${imageTransformY + (posDiff.y / 30)}px,${imageTransformZ - (posDiff.x / 10)}px)`;
      heroText.style.transform = `translate3d(${textTransformX + (posDiff.x / 60)}px, ${textTransformY - (posDiff.y / 60)}px, ${textTransformZ + (posDiff.x / 10)}px)`;
      heroText.style.opacity = '1';
      heroImage.style.opacity = '1';
      heroText.style.animationFillMode = 'none';
      heroImage.style.animationFillMode = 'none';
    }

    heroInner.addEventListener('mousemove', handleHeroMouseMove);
  };

  new WOW().init();
  heroImage.addEventListener('animationend', heroTransforms)
});
