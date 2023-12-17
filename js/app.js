

import Main from './Main.js';


/*
 * Property names in imgData objects match those found in unsplash
 * JSON data to simplify adding future integration.
 * Here is where new images need to be added (for each image shown, there 
 * needs to be four different sizes).
 * 
 * This data is injected into the main object.
 */

let allImages = [ 
  {srcSetVals: ["1800w", "1365w", "1000w", "500w"],
   path: "./images/", thumbsOnPage: 3 },
  {imgData: [
    {full: "largebadger-01.jpg", regular: "medbadger-01.jpg", 
      small: "smallbadger-01.jpg", thumb: "thumbbadger-01.jpg", 
      altText: "A badger on an armchair surveying his surroundings."},

    {full: "largebadger-02.jpg", regular: "medbadger-02.jpg", 
      small: "smallbadger-02.jpg", thumb: "thumbbadger-02.jpg",
      altText: "A badger prising itself off a sharp branch."},

    {full: "largebadger-03.jpg", regular: "medbadger-03.jpg", 
      small: "smallbadger-03.jpg", thumb: "thumbbadger-03.jpg", 
      altText: "A badger who has his beady eyes on you."},

    {full: "largebadger-04.jpg", regular: "medbadger-04.jpg", 
      small: "smallbadger-04.jpg", thumb: "thumbbadger-04.jpg",  
      altText: "A badger embarks on a solemn journey."},
    
    {full: "largebadger-05.jpg", regular: "medbadger-05.jpg", 
      small: "smallbadger-05.jpg", thumb: "thumbbadger-05.jpg",  
      altText: "Badger romps through the woodlands."}]
  }
];


// This is where the main work is done.
// Using it allows a separation of the object itself from the event 
// listener code on this page. 
const main = new Main(allImages); 



// Setting up all event listeners.

const buttonClkL = document.getElementById("clickbtnl"); // Left
const buttonClkR = document.getElementById("clickbtnr"); // Right


// Left HTML button.
buttonClkL.addEventListener("click", function(){
  main.renderNextImageBackward();
});


// Right HTML button.
buttonClkR.addEventListener("click", function(){
  main.renderNextImageForward();
});


// For mouse clicks on the thumbnail images.
setEventListenersForThumbs();


// For keyboard input.
window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        main.renderNextImageBackward();
        break;
      case "ArrowRight":
        main.renderNextImageForward();
        break;
        case "ArrowDown":
          main.pushMenuDown();
        break;
        case "ArrowUp":
          main.pushMenuUp();
        break;
      default:
        return;
    }
    event.preventDefault();
  },
  true,
);


// Pull 'data-id' values from the div images, so that we know
// which of the images have been clicked.
function setEventListenersForThumbs(){
  const thumbsClk = document.querySelectorAll(".img-inst");

  for(let counter=0;counter < main.getNumThumbsOnPage();counter++){
    thumbsClk[counter].addEventListener("click", function() {
      const dataId = thumbsClk[counter].getAttribute('data-id');
      main.openImageViaThumbClick(Number(dataId));
    })
  }
}
