'use strict'
let eventTimer = 0;
let faceRight = true;

let windowTest = document.getElementById('window');
const onMouseClick = (e) =>{
    eventTimer++;
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    //windowTest.style.top = e.pageY + 'px';
    console.log(windowTest.getBoundingClientRect().top + ":" + windowTest.getBoundingClientRect().left)
    console.log(mouseX + ":" + mouseY)

    if(mouseX>windowTest.getBoundingClientRect().left && mouseX<windowTest.getBoundingClientRect().right && mouseY > windowTest.getBoundingClientRect().top && mouseY < windowTest.getBoundingClientRect().bottom){
        shock();
        setTimeout(() =>{
            idle()
        }, 500);
    }
    else if(mouseY > 40){
        let distX = mouseX - windowTest.getBoundingClientRect().left;
        let distY = mouseY - windowTest.getBoundingClientRect().top;
        if(distY < 0){
            if(distX > 0){
                if(faceRight === false){
                    windowTest.style.transform = "rotateY(0deg)";
                    faceRight = true;
                }
                skip();
                windowTest.animate({left : mouseX + "px"} , {duration : 2000, queue: true,fill:"forwards"} )
                setTimeout(() =>{
                    jump();
                    windowTest.animate({bottom : mouseY + "px"} , {duration : 1000,queue: true})
                    windowTest.animate({bottom : "10px"} , {duration : 1000,queue: true, fill:"forwards"})
                }, 2000)
                setTimeout(() =>{
                    idle();
                },4000)
            }else{
                if(faceRight){
                    windowTest.style.transform = "rotateY(180deg)";
                    faceRight = false;
                }
                skip();
                windowTest.animate({left : mouseX + "px"} , {duration : 2000, queue: true,fill:"forwards"} )
                setTimeout(() =>{
                    jump();
                    windowTest.animate({bottom : mouseY + "px"} , {duration : 1000,queue: true})
                    windowTest.animate({bottom : "10px"} , {duration : 1000,queue: true, fill:"forwards"})
                }, 2000)
                setTimeout(() =>{
                    idle();
                },4000)
            }
        }else{
            if(distX > 0){
                if(faceRight === false){
                    windowTest.style.transform = "rotateY(0deg)";
                    faceRight = true;
                }
                skip();
                windowTest.animate({left : mouseX + "px"} , {duration : 2000, queue: true,fill:"forwards"} )
                setTimeout(() =>{
                    idle();
                },2000)
            }else{
                if(faceRight){
                    windowTest.style.transform = "rotateY(180deg)";
                    faceRight = false;
                }
                skip();
                windowTest.animate({left : mouseX + "px"} , {duration : 2000, queue: true,fill:"forwards"} )
                setTimeout(() =>{
                    idle();
                },2000)
            }
        }
        //if dist Y is positive, do not move the fox
        //if it is negative this means that mouse Y is lower
            //if we slowly add a fraction of the gap then it will move up
            //add the full gap to reach the zenith and then go back down by subtracting a fraction of the gap
            //this method takes the negative into mind
        
        //x is positive if we need to move right
            //this means that mouseX is greater and we need to subtract to get to the point
        //to go left we would slowly add the gap back in
        
        console.log("Distances to move:" + distX + ":" + distY);
        //do a for loop that takes the specified amount of time? break it down into a specific interval
        //then same for the jump

    }
}
document.addEventListener('click', onMouseClick) 

let inactivityTime = function () {
    let time;
    window.onload = resetTimer;
    document.onclick = resetTimer;
    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(sleep, 10000)
    }
  };
  inactivityTime();
//what do i need to do

//get the mouse click location
//if sleeping, wakes up and goes into looking and then idle or shock if mouse is on itself
//if in idle it will either do the goto mouse location or look around or shock if mouse is on itself
//if in looking, it will goto the mouse or shock if its on itself

//goto
//the goto function will have the fox run/skip and then jump if the mouse location is too high
//then it will go into idle

//timer starts after the cycle is done
//if the timer hits like 5s, it will look once and then idle
//if the timer hits like 10s, it will go to sleep


function sleep(){
    var fox = document.getElementById("Fox");
    fox.setAttribute("class", "Character_sleep");
}

function idle(){
    var fox = document.getElementById("Fox");
    fox.setAttribute("class", "Character_idle");
}

function skip(){
    var fox = document.getElementById("Fox");
    fox.setAttribute("class", "Character_skip");
}

function look(){
    var fox = document.getElementById("Fox");
    fox.setAttribute("class", "Character_looking");
}

function shock(){
    var fox = document.getElementById("Fox");
    fox.setAttribute("class", "Character_shock");
}

function fall(){
    var fox = document.getElementById("Fox");
    fox.setAttribute("class", "Character_fall");
}

function jump(){
    var fox = document.getElementById("Fox");
    fox.setAttribute("class", "Character_jump");
}