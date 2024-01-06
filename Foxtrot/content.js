// Create a new div element
var newDiv = document.createElement("div");

// Set some attributes for the div element
newDiv.style.width = "1px";
newDiv.style.height = "1px";
newDiv.style.background = "transparent";
newDiv.style.position = "fixed";  
newDiv.style.bottom = "0";
newDiv.style.left = "0";
newDiv.style.zIndex = "9999";
newDiv.id="FoxtrotDivFoxtrotDiv"

// Add the div element to the page
document.body.appendChild(newDiv);

var style = document.createElement('style');
  style.innerHTML = `
  :root {
    --pixel-size: 20;
 }

 .pixelart {
   image-rendering: pixelated;
}
 
 .Character {
    width: calc(8px * var(--pixel-size));
    height: calc(8px * var(--pixel-size));
    overflow: hidden;
    position: absolute;
    image-rendering: pixelated;
    bottom: 0;
 }

 .Character_idle{
    animation: idleAnim 1s steps(5) infinite;
    width: calc(128px * var(--pixel-size));
    position: absolute;
    top: calc(-1.5px * var(--pixel-size));
    max-width: calc(128px * var(--pixel-size));
 }

 .Character_looking{
    animation: lookingAnim 2s steps(14) infinite;
    width: calc(128px * var(--pixel-size));
    position: absolute;
    top: calc(-10.5px * var(--pixel-size));
    max-width: calc(128px * var(--pixel-size));
 }

 .Character_skip{
   animation: skipAnim 2s steps(8) infinite;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   top: calc(-20.5px * var(--pixel-size));
   max-width: calc(128px * var(--pixel-size));
 }

 .Character_jump{
   animation: jumpAnim 2.5s steps(11) infinite;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   top: calc(-29px * var(--pixel-size));
   max-width: calc(128px * var(--pixel-size));
 }

 .Character_shock{
   animation: shockAnim 0.5s steps(5) infinite;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   top: calc(-38px * var(--pixel-size));
   max-width: calc(128px * var(--pixel-size));
 }

 .Character_sleep{
   animation: sleepAnim 2s steps(6) infinite;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   top: calc(-47px * var(--pixel-size));
   max-width: calc(128px * var(--pixel-size));
 }

 .Character_fall{
   animation: fallAnim 2s steps(6) 1;
   animation-fill-mode: forwards;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   top: calc(-56.5px * var(--pixel-size));
   max-width: calc(128px * var(--pixel-size));
 }

 .Character_drag{
   animation: dragAnim 0s steps(1) 1;
   animation-fill-mode: forwards;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   top: calc(-29px * var(--pixel-size));
   max-width: calc(128px * var(--pixel-size));
 }

 .Character_drop{
   animation: dropAnim 1s steps(6) 1;
   animation-fill-mode: forwards;
   width: calc(128px * var(--pixel-size));
   position: absolute;
   top: calc(-29px * var(--pixel-size));
   max-width: calc(128px * var(--pixel-size));
 }

 @keyframes idleAnim {
    from{
       transform: translate3d(0px,0,0);
    }
    to {
       transform: translate3d(calc(-100%*(5/14)),0,0);
    }
 }
 
 @keyframes lookingAnim {
   from{
      transform: translate3d(0px,0,0);
   }
   to {
      transform: translate3d(calc(-100%),0,0);
   }
}

 @keyframes skipAnim {
   from{
      transform: translate3d(0px,0,0);
   }
   to {
      transform: translate3d(calc(-100%*(8/14)),0,0);
   }
}
 
 @keyframes jumpAnim {
   from{
      transform: translate3d(0px,0,0);
   }
   to {
      transform: translate3d(calc(-100%*(11/14)),0,0);
   }
}

 @keyframes shockAnim {
   from{
      transform: translate3d(0px,0,0);
   }
   to {
      transform: translate3d(calc(-100%*(5/14)),0,0);
   }
}

 @keyframes sleepAnim {
   from{
      transform: translate3d(0px,0,0);
   }
   to {
      transform: translate3d(calc(-100%*(6/14)),0,0);
   }
}

 @keyframes fallAnim {
   from{
      transform: translate3d(0px,0,0);
   }
   to {
      transform: translate3d(calc(-100% * (6/14)),0,0);
   }
}

 @keyframes dragAnim {
   from{
      transform: translate3d(0px,0,0);
   }
   to {
      transform: translate3d(calc(-100% * (3/14)),0,0);
   }
}

 @keyframes dropAnim {
   from{
      transform: translate3d(calc(-100% * (5/14)),0,0);
   }
   to {
      transform: translate3d(calc(-100% * (11/14)),0,0);
   }
}
  `;
  document.head.appendChild(style);

  var imagePath = chrome.runtime.getURL("/Fox_Sprite_Sheet.png");
  console.log(imagePath);

  var characterHTML = `<div class="Character" id="window"><img id="Fox" class="Character_sleep" src="${imagePath}" alt="Fox" loading="eager" /></div>`;

  document.getElementById('FoxtrotDivFoxtrotDiv').insertAdjacentHTML("afterbegin", characterHTML);

  var accessCharacter = document.getElementById("FoxtrotDivFoxtrotDiv");

var lastScrollTime = null;
var lastScrollY = null;

var offset = [0,0];
var lastPos = [[accessCharacter.style.left, accessCharacter.style.top, Date.now()-1], [accessCharacter.style.left, accessCharacter.style.top, Date.now()]];
var isDown = false;

window.addEventListener("wheel", function(event) {
  if (lastScrollTime !== null) {
    var scrollTimeDiff = event.timeStamp - lastScrollTime;
    var scrollYDiff = event.pageY - lastScrollY;
    var scrollSpeed = Math.abs(scrollYDiff / scrollTimeDiff);
    var div = document.getElementById("FoxtrotDivFoxtrotDiv");
    console.log("scroll speed is: " + scrollSpeed);
    if (scrollSpeed > 2) {
      div.style.backgroundColor = "green";
    } else {
      div.style.backgroundColor = "red";
    }
  }
  lastScrollTime = event.timeStamp;
  lastScrollY = event.pageY;
});

window.addEventListener("fullscreenchange", function(event) {
   console.log("Detected fullscreen");
})

accessCharacter.addEventListener("click", function(event) {
   console.log("Fox Clicked?");
})

accessCharacter.addEventListener("dblclick", function(event) {
   console.log("Fox DOUBLE Clicked?");
   shock();
   setTimeout(() => {if(!isDown) idle();}, 500);
})

accessCharacter.addEventListener('mousedown', function(e) {
   if(!isDown){
      dragFox();
   }
   isDown = true;
   offset = [
      accessCharacter.offsetLeft - e.clientX,
      accessCharacter.offsetTop - e.clientY
   ];
}, true);
document.addEventListener('mouseup', function(e) {
   if(isDown){
      letFoxGo();
      //calc the speed?
      //In theory it should be like the most recent gap to get instantaneous velo?
      console.log(lastPos);
      console.log("ms passed:" + (lastPos[1][2] - lastPos[0][2]));
      console.log("Horiz Change:" + (parseFloat(lastPos[1][0]) - parseFloat(lastPos[0][0])));
      console.log("Vertical Change:" + (parseFloat(lastPos[1][1]) - parseFloat(lastPos[0][1])));
      //send those values to a fall function that loops until the bottom is hit
      //if the sides of the screen are hit, bounce and change velo direction
      //if it goes above the screen it should eventually come back down
      isDown = false;
      var timeUnit = lastPos[1][2] - lastPos[0][2];
      var horiz_v = Math.round((parseFloat(lastPos[1][0]) - parseFloat(lastPos[0][0])) / timeUnit);
      var vert_v = Math.round((parseFloat(lastPos[1][1]) - parseFloat(lastPos[0][1])) / timeUnit);
      if(vert_v > 0){
         vert_v + 2;
      }else if(vert_v < 0){
         vert_v - 2;
      }
      fall(horiz_v * 20, vert_v * -10);
      setTimeout(() => {if(!isDown) idle();},950);
   }
   isDown = false;
}, true);

document.addEventListener('mousemove', function(e) {
   event.preventDefault();
   if (isDown) {
      //dragFox();
      if(Date.now() - lastPos[1][2] > 10){
         lastPos.shift();
         lastPos.push([accessCharacter.style.left, accessCharacter.style.top, Date.now()]);
      }
      accessCharacter.style.left = (e.clientX + offset[0]) + 'px';
      accessCharacter.style.top  = (e.clientY + offset[1]) + 'px';
   }
}, true);

function jump(){
   var fox = document.getElementById("Fox");
   fox.setAttribute("class", "Character_jump");
}
 
function idle(){
   var fox = document.getElementById("Fox");
   fox.setAttribute("class", "Character_idle");
}

function dragFox(){
   var fox = document.getElementById("Fox");
   console.log("drag anim")
   fox.setAttribute("class", "Character_drag");
}

function letFoxGo(){
   var fox = document.getElementById("Fox");
   fox.setAttribute("class", "Character_drop");
}

function shock(){
   var fox = document.getElementById("Fox");
   fox.setAttribute("class", "Character_shock");
}

function fall(horizontal_v, vertical_v){
   if(!isDown){
      //move one step?
      var new_left = parseFloat(accessCharacter.style.left) + horizontal_v;
      var new_top = parseFloat(accessCharacter.style.top) - vertical_v;
      if(new_left < 0){
         new_left = 0;
         horizontal_v = horizontal_v * (3/4) * -1;
      }else if(new_left > (window.innerWidth - 100)){
         new_left = window.innerWidth - 100;
         horizontal_v = horizontal_v * (3/4) * -1;
      }

      if(new_top > (window.innerHeight)){
         new_top = (window.innerHeight);
      }

      if(new_top === (window.innerHeight) && vertical_v < -10){
         //change direction but lose like 1/4 the velo?
         vertical_v = (vertical_v * -3) / 4;
         horizontal_v = horizontal_v * (6/8);
      }


      accessCharacter.style.left = new_left + 'px';
      accessCharacter.style.top = new_top + 'px';
      //console.log("New Top:" + new_top + " vert_v:" + vertical_v);
      //console.log("New Left:" + new_left + " horiz_v:" + horizontal_v);
      if(new_top === (window.innerHeight) && vertical_v <= 4 && Math.abs(horizontal_v) <= 4){
         return
      }else{
         setTimeout(() => {fall(horizontal_v, vertical_v - 3)}, 25);
      }
   }
}

/* */

window.addEventListener("load", function(event) {
  console.log("Set to idle");
  idle();
  setTimeout(() => {console.log("jumping");jump()}, 10000);
  setTimeout(() => {console.log("idling");idle()},20000);
});

//so what do I want to add
   //on scroll the fox gets a breeze effect if scrolling down or up
      //Could be done using svg I believe
   //Gets a smush effect if scrolling up?
      //Would change to the lying down death frame and add a shake
   //If the scroll speed goes from high to 0, have the fox do a little jump in the air 
   //Or if the speed is really high have the fox slightly float up
      //Just increase the bottom prop and then set back down


   //have the fox randomly move around
      //Timeout intervals would start on the page load
      //at the end of each interval, a new possible action is chosen
      //Need to make a diagram of which actions can be connected
   //on click have the shiver or attentive action
      //Would be from listener on the fox div
   //goes to sleep after some time
      //Just needs to change to sleep anim
   //need to add an on and off button?
      //Should be connected to chrome ext click
      //simple add fox/remove fox
   
   //can slide around every once and awhile
      //would change the left property and set the frame to a specific one of him lying down from death anim
   //Default walk animation is a little goofy so may try to either re do it or try to hide it


   //have different kinds of jumps
      //small hops, just move up and down
         //Just changing the Bottom property up and then back to 0
      //big hops, goes up and sideways
         //would "bounce" off walls and continue montum in opposite direction
         //would get the left property and increase/decrease along with bottom prop to move in the correct direction

   //jump into page on tab rejoin/load/wakeup and out of page when full screened?

   //double click to send away? Have to request it to come back in the extention popup

   //Could jump to different div tops or bottoms but that is in version 2 after v1 is deployed