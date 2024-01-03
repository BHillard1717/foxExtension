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
  `;
  document.head.appendChild(style);

  var imagePath = chrome.runtime.getURL("/Fox_Sprite_Sheet.png");
  console.log(imagePath);

  var characterHTML = `<div class="Character" id="window"><img id="Fox" class="Character_sleep" src="${imagePath}" alt="Fox" loading="eager" /></div>`;

  document.getElementById('FoxtrotDivFoxtrotDiv').insertAdjacentHTML("afterbegin", characterHTML);

var lastScrollTime = null;
var lastScrollY = null;

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

function jump(){
   var fox = document.getElementById("Fox");
   fox.setAttribute("class", "Character_jump");
 }
 
 function idle(){
   var fox = document.getElementById("Fox");
   fox.setAttribute("class", "Character_idle");
 }

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
