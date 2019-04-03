import Flickity from "flickity";
import "flickity-imagesloaded";

var elem = document.querySelector(".carousel");
var flkty = new Flickity(elem, {
  // options
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  autoPlay: 4000,
  pauseAutoPlayOnHover: false,
  imagesLoaded: true,
  prevNextButtons: false
});
