'use strict';
var $ = require('jquery');

$(document).ready(function() {
  var menuToggle = $("#js-mobile-menu").unbind();
  $("#js-navigation-menu").removeClass("show");

  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navigation-menu").slideToggle(function(){
      if($("#js-navigation-menu").is(":hidden")) {
        $("#js-navigation-menu").removeAttr("style");
      }
    });
  });
});

var didScroll;
var lastScrollTop = 0;
var navbarHeight = $('header').outerHeight();
var heroHeight = $('.hero').outerHeight();
var delta = 10;
//$('.hero').outerHeight();

// on scroll, let the interval function know the user has scrolled
$(window).scroll(function(event){
  didScroll = true;
});
// run hasScrolled() and reset didScroll status
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  // store scroll position
  var st = $(window).scrollTop();
  console.log('st:'+st);
  console.log('lst:'+lastScrollTop);
  console.log('wh:'+$(window).height()+'---'+$(document).height());
  console.log("diff::" + Math.abs(lastScrollTop - st));

  // scroll more than hero height?
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // scrolled past header?
  // scrolled up or down?
  // If current position > last position AND scrolled past hero...
  console.log('nbh:'+navbarHeight);
  if ( st > lastScrollTop && st > (heroHeight - navbarHeight) ){
    // Scroll Down
    $('header').removeClass('header--down').addClass('header--up');
  } else {
    // Scroll Up
    // If did not scroll past the document (possible on mac)...
    if(st + $(window).height() < $(document).height() && st < (heroHeight - navbarHeight)) {
      $('header').removeClass('header--up').addClass('header--down');
    }
  }

  // set current position
  lastScrollTop = st;
  console.log('lst--:'+lastScrollTop);

}
