'use strict';
var $ = require('jquery');
var slick = require('slick-carousel');

$(function() {
  console.log('slick!');
  $('.hero__slideshow').slick({
    autoplay: false,
    dots: false,
    speed: 500,
    arrows: false,
  })
})
