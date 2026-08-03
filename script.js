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
var biggestIndex = 1

function closeWindow(elmnt) {
  elmnt.style.display = "none";
}
function openWindow(elmnt) { 
elmnt.style.display = "block";
biggestIndex++; //Increment biggestIndex by 1 
elmnt.style.zIndex = biggestIndex;
topBar.style.zIndex = biggestIndex +1;
}

welcomeScreenClose.addEventListener("click",function() {
 closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click",function() {
 openWindow(welcomeScreen);
});

var selectedIcon = undefined ;

function selectIcon(elmnt) {
  elmnt.classList.add("selected");
  selectedIcon = elmnt; 
} 

function deselectIcon(elmnt) {
  elmnt.classList.remove("selected");
  selectedIcon = undefined ; 
}

function handleIconTap(elmnt) {
  if (elmnt.classList.contains("selected")) {
   deselectIcon(elmnt);
   openWindow(window); 
  } else {
    selectIcon(elmnt);
  }
}

dragElement(document.getElementById("noteswindow"))

var noteswindow = document.querySelector("#noteswindow")
var notesclose = document.querySelector("#notesclose")
var notesopen = document.querySelector("#notesopen")

notesopen.addEventListener("click",function(){
  openWindow(notesWindow);
})

notesclose.addEventListener("click",function(){
  closeWindow(noteswindow);
})

function addwindowTapHandling(elmnt) {
  elmnt.addEventListener("mousedown",() => handleWindowTap(elmnt))
}

addwindowTapHandling(document.getElementById("header"))


// <![CDATA[
var speed=100; // speed colours change, 1 second = 1000
var glow=5; // can be set from '0' for no glow, to 10
var raincol=new Array("#ff0000", "#ff5500", "#ffaa00", "#ffff00", "#aaff00", "#55ff00", "#00ff00", "#00ff55", "#00ffaa", "#00ffff", "#00aaff", "#0055ff", "#0000ff", "#5500ff", "#aa00ff", "#ff00ff", "#ff00aa", "#ff0055"); // change the colours if you want to
var alink=""; // page to link text to (set to ="" for no link)

/****************************
*    Rainbow Text Effect    *
*(c)2003-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/
var rainbow, raintxt, raincnt=0;

function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(regenbogen);

function regenbogen() { if (document.getElementById) {
  var i, rainbeau;
  rainbow=document.getElementById("rainbow");
  raintxt=rainbow.firstChild.nodeValue;
  while (rainbow.childNodes.length) rainbow.removeChild(rainbow.childNodes[0]);
  for (i=0; i<raintxt.length; i++) {
    rainbeau=document.createElement("span");
    rainbeau.setAttribute("id", "rain"+i);
    rainbeau.appendChild(document.createTextNode(raintxt.charAt(i)));
    if (alink) {
      rainbeau.style.cursor="pointer";
      rainbeau.onclick=function() { top.location.href=alink; }
    }
    rainbow.appendChild(rainbeau);
  }
  rainbow=setInterval ("raining()", speed);
}}

function raining() {
  var i, c;
  for (i=0; i<raintxt.length; i++) {
    c=raincol[(i+raincnt)%raincol.length];
    document.getElementById("rain"+i).style.color=c;
	if (glow) document.getElementById("rain"+i).style.textShadow=c+" 0px 0px "+glow+"px";
  }
  raincnt++;
}

