function updatetime() {
  var currentTime = new Date().toLocaleString();
  var timetext = document.querySelector('#timeElement');
  timetext.innerHTML = currentTime;
  console.log(currentTime);
}

setInterval(updatetime, 1000); 

dragElement(document.getElementById("welcomescreen"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcomescreen")
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
var topBar = document.querySelector("#top")

function closeWindow(elmnt) {
  elmnt.style.display = "none";
}
function openWindow(elmnt) { 
elmnt.style.display = "flex";
biggestIndex++; //Increment biggestIndex by 1 
elmnt.style.zIndex = biggestIndex;
topbar.style.zIndex = biggestIndex +1;
}

welcomeScreenClose.addEventListener("click",function() {
 closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click",function() {
 openWindow(welcomeScreen);
});

