/**
 * Class to handle the display of images from event listener and
 * HTML button input.
 * 
 * Generates the image navigation functionality.
 * 
 * Handles DOM manipulation for display of images.
 * 
 * D Brien 2023
 */

export default class Main{

  constructor(images) {
    this.images = images[1].imgData;
    this.thumbData = [];
    this.srcSetVals = images[0].srcSetVals;
    this.path = images[0].path;
    
    
    // Value Of thumbsOnPage sets how many images are displayed in the
    // navigation menu. However, if you need to increase the value, you need
    // to change the CSS file. More thumbnail images on the page will have
    // an effect on the viewing of the page on smaller devices. 
    this.thumbsOnPage = images[0].thumbsOnPage;
    this.numOfImages = this.images.length;

    this.navThumbStart = 0;
    this.navThumbEnd = this.thumbsOnPage - 1;
    this.currImgNum = 0;

    this.setSrcSetValue();
    this.srcSetVals = this.getSrcSetValue();
    this.setThumbData();
    this.setBackgroundImage();
    this.initialiseThumbsOnPage();
    this.makeAnnouncementViaAccessibiltySoftware();

    this.imageIdsInThumbs = [];
    this.initialiseImageIdsInCurrentNav();
  }


  // Only run on initialisation.
  // It reads and stores all of the thumbnail url's 
  setThumbData(){
    this.thumbData = [];
    for(let counter = 0; counter < this.numOfImages; counter++){
      this.thumbData.push(this.images[counter].thumb);
    }
  }


  // Only run on initialisation.
  initialiseImageIdsInCurrentNav(){
    for(let counter = 0;counter < this.thumbsOnPage;counter++){
      this.imageIdsInThumbs.push(counter);
    }
  }


  // First of two main entry points: (From thumbnail image click).
  openImageViaThumbClick(id){
    id = this.imageIdsInThumbs[id] ;
    this.currImgNum = id;
    this.setSrcSetValue();
    this.srcSetVals = this.getSrcSetValue();
    this.setBackgroundImage();
    this.setStartAndFinishVals();
    this.overwriteDataInThumbsForNavRefresh();
    this.makeAnnouncementViaAccessibiltySoftware();
  }


  // Second of two main entry points: (From left/right buttons or cursor keys)
  // via methods: renderNextImageForward() and renderNextImageBackward()
  renderImage(){
    this.setSrcSetValue();
    this.setBackgroundImage();
    this.setStartAndFinishVals();
    this.overwriteDataInThumbsForNavRefresh();
    this.makeAnnouncementViaAccessibiltySoftware();
  }


  getSrcSetValue(){
    return this.srcSetVals;
  }


  // Example output: 
  /*
      "./images/largebadger-01.jpg 1800w, ./images/medbadger-01.jpg 1365w, 
      ./images/smallbadger-01.jpg 1000w"
  */
  setSrcSetValue(){
    const id = this.currImgNum;

    this.srcSetVals = `${this.path}${this.images[id].full} ${this.srcSetVals[0]}, ` +
      `${this.path}${this.images[id].regular} ${this.srcSetVals[1]}, ` +
      `${this.path}${this.images[id].small} ${this.srcSetVals[2]}`;
  }


  getThumbData(){
    return this.thumbData;
  }


  getNumThumbsOnPage(){
    return this.thumbsOnPage;
  }


  //  Writes the srcset, src and alt text values to DOM to force image change.
  setBackgroundImage(){
    const id = this.currImgNum;
    const primeImgEll = document.querySelectorAll(".resp-img"); 
    primeImgEll[0].srcset = this.srcSetVals;
    primeImgEll[0].src = `${this.path}${this.images[id].full}`;
    primeImgEll[0].alt = `${this.images[id].altText}`;
    this.writeAltText(id);
  }


  // Triggered by right button and right cursor key. 
  renderNextImageForward(){
    this.currImgNum++;
    
    if(this.currImgNum === this.numOfImages) {
      this.currImgNum--;
    }
      this.renderImage();
  }


  // Triggered by left button and left cursor key.
  renderNextImageBackward(){
    this.currImgNum--;
    
    if(this.currImgNum < 0) {
      this.currImgNum = 0;
    }
      this.renderImage();
  }


  // This should only be run on initialisation. If you run it afterwards
  // it wipes out the event listeners for the thumbnails. We need to initialise 
  // these to create a wrapper for each image and then push an image element 
  // inside.
  initialiseThumbsOnPage(){
    const thumbWindow = document.getElementById("all-images");
    thumbWindow.innerHTML = "";

    for(let counter = 0;counter < this.thumbsOnPage; counter++){
      let borderBox = document.createElement("div");
      borderBox = this.setImageParentBorderProperties(borderBox, counter);

      let thumbInst = document.createElement("img");
      thumbInst = this.setThumnailStyleProperties(thumbInst, counter);

      borderBox.appendChild(thumbInst);
      document.getElementById("all-images").appendChild(borderBox);
    }

    this.setDataIdsOnThumbs();
  }


  // This function clears the borders of each displayed image in the navigation
  // box. When it detects the current image displayed, it puts a blue box
  // around it, to highlight that it is the currently displayed image.
  setImageParentBorderProperties(borderElement, counter){
    borderElement.className = "box";
    borderElement.style.display = "inline-flex";
    borderElement.style.flexDirection = "row";
    borderElement.style.borderColor = "initial";
    borderElement.style.borderWidth = "0";
    borderElement.style.borderStyle = "none";

    if(counter === this.currImgNum) borderElement.style.border = "1px solid blue";
    return borderElement;
  }


  setThumnailStyleProperties(thumb, counter){
    thumb.src = `${this.path}${this.thumbData[counter]}`;
    thumb.alt = `${this.images[counter].altText}`;
    thumb.className = "img-inst";
    return thumb;
  }


  writeAltText(){
    const alternate = document.getElementById("alt-value");
    alternate.innerHTML = `${this.images[this.currImgNum].altText}`;
  }


  setDataIdsOnThumbs(){
    const thumbsClk = document.querySelectorAll(".img-inst");

    for(let counter=this.navThumbStart;counter <= this.navThumbEnd;counter++){
      thumbsClk[counter].setAttribute('data-id' , counter);
    }
  }


  // Data written into existing thumbnail objects when the navigation
  // section is re-drawn. This is so that the existing event listeners 
  // monitoring thumbnail clicks are not disturbed.
  overwriteDataInThumbsForNavRefresh(){
    let thumb = document.querySelectorAll(".img-inst");
    let borders = document.querySelectorAll(".box");

    let offset = 0;
    if(this.currImgNum > (this.thumbsOnPage - 1)) offset = (this.currImgNum - 2);
    
    for(let counter= 0 ;counter < this.thumbsOnPage; counter++){
      let adjusted = counter + offset;
      thumb[counter].src = `${this.path}${this.thumbData[adjusted]}`;
      thumb[counter].alt = `${this.images[adjusted].altText}`;
      borders[counter].style.border = "0";
      this.imageIdsInThumbs[counter] = adjusted; 

      if((adjusted) === this.currImgNum) borders[counter].style.border = "1px solid blue";
    }
  }


  // We can only display a set number of thumbnails to the page.
  // This works out the start and end range values of thumbs that are rendered
  // on the page.
  setStartAndFinishVals(){
    if(this.currImgNum >= (this.thumbsOnPage - 1)){
      this.navThumbEnd = this.currImgNum;
      this.navThumbStart = this.currImgNum - (this.thumbsOnPage - 1);
    }
  }


  pushMenuUp(){
    const header = document.getElementById('thumb-browser');
    header.style.top = "3.5rem";
    header.style.bottom = "initial";
  }


  // CSS also changes menu location to the bottom of the page when
  // using a tiny screen resolution device.
  pushMenuDown(){
    const header = document.getElementById('thumb-browser');
    header.style.top = "initial";
    header.style.bottom = "2.5rem";
  }


  // Pulls the contents of the newly written alt text entry, so that 
  // the text is read out.
    makeAnnouncementViaAccessibiltySoftware(){
    const altText =document.getElementById("alt-value");
    const announce = document.getElementById("announcer");
    announce.textContext = altText.innerText;
  }

}