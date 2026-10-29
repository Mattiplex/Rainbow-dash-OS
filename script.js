function updatetime() {
  var currentTime = new Date().toLocaleString();
  var timetext = document.querySelector('#timeElement');
  timetext.innerHTML = currentTime;
  console.log(currentTime);
}

setInterval(updatetime, 1000); 

dragElement(document.getElementById("welcomescreen"));
dragElement(document.getElementById("noteswindows"));
dragElement(document.getElementById("musicWindows"));
dragElement(document.getElementById("chatWindows"));
dragElement(document.getElementById("gameWindows"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;

    if (
      e.target.closest(".seek_slider") ||
      e.target.closest(".playpause-track") ||
      e.target.closest(".next-track")||
      e.target.closest(".prev-track")
    ) {return;}
  
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
    
     var newTop = elmnt.offsetTop - pos2;
    var newLeft = elmnt.offsetLeft - pos1;

    
    if (newTop < 70) {
      newTop = 70;
    }
    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
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
elmnt.style.display = "flex";
biggestIndex++; //Increment biggestIndex by 1 
elmnt.style.zIndex =biggestIndex;
topBar.style.zIndex = biggestIndex +1;
}

welcomeScreenClose.addEventListener("click",function() {
 closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click",function() {
 openWindow(welcomeScreen);
});

var NotesWindow = document.querySelector("#noteswindows")
var NotesClose = document.querySelector("#notesclose")
var NotesOpen = document.querySelector("#notesopen")

NotesOpen.addEventListener("click",function(){
  openWindow(NotesWindow);
});

NotesClose.addEventListener("click",function(){
  event.stopPropagation();
  closeWindow(NotesWindow);
});

var MusicWindow = document.querySelector("#musicWindows")
var MusicOpen = document.querySelector("#musicOpen")
var MusicClose = document.querySelector("#musicClose")

MusicOpen.addEventListener("click",function(){
  openWindow(MusicWindow);
})

MusicClose.addEventListener("click",function(){
  closeWindow(MusicWindow);
})

var ChatWindows = document.querySelector("#chatWindows")
var ChatOpen = document.querySelector("#chatOpen")
var ChatClose = document.querySelector("#chatClose")

ChatOpen.addEventListener("click",function(){
  openWindow(ChatWindows)
})

ChatClose.addEventListener("click",function(){
  closeWindow(ChatWindows)
})

var GameWindows = document.querySelector("#gameWindows")
var GameOpen = document.querySelector("#gameOpen")
var GameClose = document.querySelector("#gameClose")

GameOpen.addEventListener("click",function(){
  openWindow(GameWindows)

})

GameClose.addEventListener("click",function(){
  closeWindow(GameWindows)
})

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add('selected')
  selectedIcon = element
}

function deselectIcon(element) {
  element.classList.remove('selected')
  selectedIcon = undefined
}

function handleIconTap(element, window) {
  if (element.classList.contains('selected')) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}


function addWindowTapHandling(element) {
  element.addEventListener('mousedown', () => handleWindowTap(element))
}

function handleWindowTap(element) {
  biggestIndex++ // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex
  topBar.style.zIndex = biggestIndex + 1
  deselectIcon(selectedIcon)
}

// notes app function

let notes =[]
let editingNoteId = null

function loadNotes() {
  const savedNotes = localStorage.getItem('quickNotes')
  return savedNotes ? JSON.parse(savedNotes) : []
}

function saveNote(event) {
  event.preventDefault()

  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();

if(editingNoteId) {
  // Update Exisitng Note

const noteIndex = notes.findIndex(note => note.id === editingNoteId)
notes[noteIndex] = {
  ...notes[noteIndex],
  title: title,
  content: content
}

} else {
 // Add New Note

  notes.unshift({
    id: generateId(),
    title: title,
    content: content
  })
}

  closeNoteDialog()
  saveNotes()
  renderNotes()
}

function generateId() {
  return Date.now().toString()
}

function saveNotes() {
  localStorage.setItem('quickNotes', JSON.stringify(notes))
}

function deleteNote(noteId) {
  notes = notes.filter(note => note.id != noteId)
  saveNotes()
  renderNotes()
}

function renderNotes() {
  const notesContainer = document.getElementById('notesContainer');

  if(notes.length === 0) {
    notesContainer.innerHTML = `
    <div class="empty-state">
    <h2>No notes yet</h2>
    <p class="position2">did you forget anything important today ?</p>
    <button class="add-note-button" onclick="openNoteDialog()"+> Add Your First Note here !</button>
    </div>
    `

    return
  }

  notesContainer.innerHTML = notes.map(note =>`
    <div class="note-card">
    <h3 class="note-title">${note.title}</h3>
    <p class="note-content">${note.content}</p>
    <div class="note-actions">
    <button class="edit-button" onclick="openNoteDialog('${note.id}')" title="edit Note"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
    </svg> 
    </button>
    <button class="delete-button" onclick="deleteNote('${note.id}')" title="delete Note">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg> 
    </button>
 </div>
 </div>
    `).join('')
}

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById('noteDialog');
  const titleInput = document.getElementById('noteTitle');
  const contentInput = document.getElementById('noteContent');

  if(noteId) {
    //Edit Mode
    const noteToEdit = notes.find(note => note.id === noteId)
    editingNoteId = noteId
    document.getElementById('dialogTitle').textContent = 'Edit Note'
    titleInput.value = noteToEdit.title
    contentInput.value = noteToEdit.content
  }
  else {
    // Add Mode
    editingNoteId = null 
    document.getElementById('dialogTitle').textContent = 'Add New Note'
    titleInput.value = ''
    contentInput.value = ''
  }

  dialog.showModal()
  titleInput.focus()

}

function closeNoteDialog() {
  document.getElementById('noteDialog').close()
}

window.openNoteDialog = openNoteDialog;
window.closeNoteDialog = closeNoteDialog;
window.deleteNote = deleteNote;


document.addEventListener('DOMContentLoaded',function() {
notes = loadNotes()
renderNotes()


  document.getElementById('noteForm').addEventListener('submit',saveNote)

  document.getElementById('noteDialog').addEventListener('click',function(event) {
    if(event.target === this) {
      closeNoteDialog()
    }
  })
})

// special effects and cool open source stuff
// note some of the code are modified to fit my exact needs,
// so always take code directly from the source 

// rainbow text effect
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
  rainbow=setInterval (raining, speed);
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
// rainbow cursor 

 import { rainbowCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";

const targetElement = document.querySelector("#rainbowCursor");
new rainbowCursor({ element: targetElement },{length:15,size:5,});

let relaying = false;
function relay(e) {
  if (relaying) return;
  relaying = true;
  targetElement.dispatchEvent(new MouseEvent(e.type, e));
  relaying = false;
}
window.addEventListener('mousemove', relay);
window.addEventListener('touchmove', relay, { passive: true });
window.addEventListener('touchstart', relay, { passive: true });

//rolling text effect

var text=Array("Rainbow Dash is da best Pony !", "    what's up , Brony ?", "This Site needs to be 20% cooler"); // replace this with an array of your own text
var delay=8; // seconds between each new text item
var speed1=80; // speed of the scroll
 
/***************************\
*    Rolling Text Effect    *
* (c)2014+ mf2fm web-design *
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
\***************************/
var diddly=new Array();
var rolltop;
var referee=0;
delay*=1000;
 
if (typeof window.addRVLoadEvent !=="function") { window.addRVLoadEvent = function (funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!=="function") {window.onload=funky;
  }else{ window.onload=function() {
    if (oldonload) oldonload();
    funky();
   };
  }
 };
}
 
window.addRVLoadEvent(prepare_to_go);
 
function prepare_to_go() {
  var i, r;
  var r=document.getElementById("rolling");
  rolltop=r.clientHeight;
  while (r.childNodes.length) r.removeChild(r.childNodes[0]);
  r.style.position="relative";
  r.style.overflow="hidden";
  r.appendChild(document.createTextNode(String.fromCharCode(160)));
  for (i=0; i<text.length; i++) {
    diddly[i]=document.createElement("div");
	diddly[i].style.position="absolute";
	diddly[i].style.top=rolltop+"px";
	diddly[i].style.left="0px";
	if (text[i].indexOf("www")!=-1) slinkit(diddly[i], text[i]);
	else diddly[i].appendChild(document.createTextNode(text[i]));
	r.appendChild(diddly[i]);
  }
  rolling_in_the_hay();
}
 
function rolling_in_the_hay() {
  var j=referee%text.length;
  for (let i=rolltop; i>= 0; i--) { setTimeout(() => {diddly[j].style.top = i + "px"; }, speed1*(rolltop-i));}
  for (let i=-1; i>-rolltop; i--) { setTimeout(() => {diddly[j].style.top=i + "px";}, delay + speed1* (-i));}
  referee++; 
  setTimeout(rolling_in_the_hay, delay);
 }

 
function slinkit(r, t) {
  var a, s, e;
  s=t.indexOf("www");
  e=t.indexOf(" ", s);
  if (e==-1) e=t.length;
  r.appendChild(document.createTextNode(t.substring(0, s)));
  a=document.createElement("a");
  a.href="http://"+t.substring(s, e);
  a.appendChild(document.createTextNode(t.substring(s, e)));
  r.appendChild(a);
  r.appendChild(document.createTextNode(t.substring(e)));
}

// music player functions 

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let disk_art = document.querySelector(".disk-art")
// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
// Create the audio element for the player
let curr_track = document.createElement("audio");
// Define the list of tracks that have to be played
let track_list = [
	{
		name: "Nyan Cat [original]",
		artist: "PRguitarman, Daniwell",
		image:"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGg3emlmOWs4djVxaHBucnBwZGxud3ZnaG5seW0zbG5pNGxuZnhxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BSx6mzbW1ew7K/giphy.gif",
		path: "Nyan Cat [original].mp3" 
	},
	{
		name: "Blue dream",
		artist: "Cheel",
		image:"https://cdn-images.dzcdn.net/images/cover/65626324e93cc9d56070464d230aaf8e/0x1900-000000-80-0-0.jpg",
		path: "Cheel - Blue Dream (Original) - Free copyright music.mp3"
	},
  {
    name: "Smile Song (remix) ",
    artist: "The living Tombstone, Daniel Ingram",
    image: "https://i.ytimg.com/vi/2okSis_wtls/maxresdefault.jpg",
    path: "TombstoneSmileRemix-Final.mp3"
  },
  {
    name:"Eurobeat Brony Discord (remix)",
    artist: "The Living TombStone, Odyssey Eurobeat",
    image: "https://images.genius.com/b418baa7b6065a4329bd4c43bee8f7e2.1000x1000x1.png",
    path:"TombstoneDiscordRemix-Final.mp3"
  },
  {
    name:"No aka (just a bit crazy)",
    artist:"V i m!, Edd Gould",
    image:"https://static.wikia.nocookie.net/eddsworld/images/9/9d/AnimationJustABitCrazy3.gif/revision/latest?format=original",
    path:"vim - No1.mp3"
  },
  {
    name:"Donuts - NCS",
    artist:"2SCOOPS",
    image:"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjM2ODltbnY0dWt4OWJzd3A2cnU5NWRyamJibW9hdWQycWttcDZ6dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/i5Lr0JcMsxPTzrNGPP/giphy.gif",
    path:"Music/2SCOOPS - Donuts [NCS Release].mp3"
  },
  {
    name:"Everything",
    artist:"Diamond Eyes - NCS ",
    image:"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHF2NWJ0eXAwbmxlMnZraWs1MDAzdHpicjkydjVyNWdhZ2ZycW96aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fXbq46ZJEVvKqyy8vj/giphy.gif",
    path:"Music/Diamond Eyes - Everything Melodic Dubstep NCS - Copyright Free Music.mp3"
  }
];
//
//
function loadTrack(track_index) {
	// Clear the previous seek timer
	clearInterval(updateTimer);
	resetValues();
	// Load a new track
	curr_track.src = track_list[track_index].path;
	curr_track.load();
	// Update details of the track
	track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  disk_art.src = track_list[track_index].image;
	track_name.textContent = track_list[track_index].name;
	track_artist.textContent = track_list[track_index].artist;
	now_playing.textContent =
		"PLAYING " + (track_index + 1) + " OF " + track_list.length;
	// Set an interval of 1000 milliseconds
	// for updating the seek slider
	updateTimer = setInterval(seekUpdate, 1000);
	// Move to the next track if the current finishes playing
	// using the 'ended' event
	curr_track.addEventListener("ended", nextTrack);

	
}
// Function to reset all values to their default
function resetValues() {
	curr_time.textContent = "00:00";
	total_duration.textContent = "00:00";
	seek_slider.value = 0;
}

function playpauseTrack() {
	// Switch between playing and pausing
	// depending on the current state
	if (!isPlaying) playTrack();
	else pauseTrack();
}

function playTrack() {
	// Play the loaded track
	curr_track.play();
	isPlaying = true;
	// Replace icon with the pause icon
	playpause_btn.innerHTML = '<i class="fa fa-pause fa-lg"></i>';
  audiocontext.resume();
}

function pauseTrack() {
	// Pause the loaded track
	curr_track.pause();
	isPlaying = false;
	// Replace icon with the play icon
	playpause_btn.innerHTML = '<i class="fa fa-play fa-lg"></i>';
}

function nextTrack() {
	// Go back to the first track if the
	// current one is the last in the track list
	if (track_index < track_list.length - 1) track_index += 1;
	else track_index = 0;
	// Load and play the new track
	loadTrack(track_index);
	playTrack();
}

function prevTrack() {
	// Go back to the last track if the
	// current one is the first in the track list
	if (track_index > 0) track_index -= 1;
	else track_index = track_list.length - 1;
	// Load and play the new track
	loadTrack(track_index);
	playTrack();
}

function seekTo() { if (!isNaN(curr_track.duration)) {
  	// Calculate the seek position by the
	// percentage of the seek slider
	// and get the relative duration to the track
	let seekto = curr_track.duration * (seek_slider.value / 100);
	// Set the current track position to the calculated seek position
	curr_track.currentTime = seekto;
}
}

function setVolume() {
	// Set the volume according to the
	// percentage of the volume slider set
	curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
	let seekPosition = 0;
	// Check if the current track duration is a legible number
	if (!isNaN(curr_track.duration)) {
		seekPosition = curr_track.currentTime * (100 / curr_track.duration);
		seek_slider.value = seekPosition;
		// Calculate the time left and the total duration
		let currentMinutes = Math.floor(curr_track.currentTime / 60);
		let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
		let durationMinutes = Math.floor(curr_track.duration / 60);
		let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
		// Add a zero to the single digit time values
		if (currentSeconds < 10) {
			currentSeconds = "0" + currentSeconds;
		}
		if (durationSeconds < 10) {
			durationSeconds = "0" + durationSeconds;
		}
		if (currentMinutes < 10) {
			currentMinutes = "0" + currentMinutes;
		}
		if (durationMinutes < 10) {
			durationMinutes = "0" + durationMinutes;
		}
		// Display the updated duration
		curr_time.textContent = currentMinutes + ":" + currentSeconds;
		total_duration.textContent = durationMinutes + ":" + durationSeconds;
	}
}
// Load the first track in the tracklist
loadTrack(track_index);

playpause_btn.addEventListener("click",playpauseTrack);
next_btn.addEventListener("click",nextTrack);
prev_btn.addEventListener("click",prevTrack);
seek_slider.addEventListener("change",seekTo);

// audiocontext linking both the player and EQ visualizer
const audiocontext = new AudioContext();

//realtime graphic EQ Visualizer
(function() {

const Num_of_Bars = 26;

const audiosource = audiocontext.createMediaElementSource(curr_track);
const analyser = audiocontext.createAnalyser();
audiosource.connect(analyser);
analyser.connect(audiocontext.destination);

const frequencyData = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(frequencyData);
console.log("frequencyData", frequencyData);

const eqvisualiser = document.querySelector(".eq-visualiser");

for( let i = 0 ; i < Num_of_Bars; i++) {
  const bar = document.createElement("DIV");
  bar.setAttribute("id","bar" + i);
  bar.setAttribute("class","eq-bar");
  eqvisualiser.appendChild(bar);
}

function renderFrame() {

 analyser.getByteFrequencyData(frequencyData)

 for( let i = 0 ; i < Num_of_Bars; i++){

  const index = (i+40)*2
  const fd =frequencyData[i];
  const bar = document.querySelector("#bar" + i)
  if( !bar) {
    continue;
  }

const barHeight =Math.max(4, fd || 0);
  bar.style.height = barHeight + "px";

 }
window.requestAnimationFrame(renderFrame)
}

renderFrame();

//setInterval(function() {
//console.log("tick")
//  renderFrame();
//},1000); 

})();

chattable.initialize ({
  stylesheet: "chattable.css"
})

//game functions

let board;
let boardWidth = 340;
let boardHeight = 520;
let context;

// Pinkie Pie 
let pinkieWidth = 58;
let pinkieHeight = 58;
let pinkieX = boardWidth/2 - pinkieWidth/2;
let pinkieY = boardHeight*7/8 - pinkieHeight;
let pinkieRightImg;
let pinkieLeftImg;

let pinkie ={
  img : null,
  x : pinkieX,
  y : pinkieY,
  width : pinkieWidth,
  height : pinkieHeight,
}

//game physics
let velocityX =0;
let velocityY =0;
let initialVelocityY = -6;
let gravity = 0.27;

//platforms 
let platformArray = [];
let platformWidth = 72;
let platformHeight = 18;
let platformImg;

// score 
let score =0;
let maxScore = 0;
let gameOver = false;

// exp 
let gameInitialized = false;

document.getElementById("StartGame").addEventListener("click",openGame); 

function openGame() { 
    if (gameInitialized) return;
    gameInitialized = true;
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

// context.fillStyle = "green";
// context.fillRect(pinkie.x,pinkie.y,pinkie.width,pinkie.height);

pinkieRightImg = new Image();
pinkieRightImg.src ="Resources & Stuff/pinkie right.png"
pinkie.img = pinkieRightImg;
pinkieRightImg.onload = function() {
  context.drawImage(pinkie.img,pinkie.x,pinkie.y,pinkie.width,pinkie.height);
}

pinkieLeftImg = new Image();
pinkieLeftImg.src ="Resources & Stuff/pinkie left.png"

platformImg = new Image();
platformImg.src ="Resources & Stuff/cloud platform.png"

velocityY = initialVelocityY;
placePlatforms();
requestAnimationFrame(update);
document.addEventListener("keydown", movePinkie );
}

function update() {
  requestAnimationFrame(update);
  if (gameOver)  {
    return;
  }
  context.clearRect(0,0,board.width,board.height);
  // pinkie
  pinkie.x += velocityX;
  if(pinkie.x > boardWidth) {
    pinkie.x = 0 ;
  }
  else if (pinkie.x + pinkie.width < 0) {
    pinkie.x = boardWidth;
  }

  velocityY += gravity;
  pinkie.y += velocityY;
  if (pinkie.y > board.height) {
    gameOver = true;
  }
  context.drawImage(pinkie.img,pinkie.x,pinkie.y,pinkie.width,pinkie.height);
  
  //platforms
  for (let i = 0; i < platformArray.length; i++) {
    let platform = platformArray[i];
    if (velocityY < 0 && pinkie.y < boardHeight*3/4) {
      platform.y -= initialVelocityY ;
    }
    if (detectCollision(pinkie,platform)&& velocityY >= 0) {
      velocityY = initialVelocityY;
    }
    context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
  }

  // clear plarform and add new platform 
  while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
    platformArray.shift();
    newPlatform();
  }

  // score 
  updateScore();
  context.fillStyle ="black";
  context.font = "16px sans-serif";
  context.fillText(score, 5 ,20);

  if (gameOver) {
    context.fillText("Game Over :o press 'space' to restart" , boardWidth/7, boardHeight*7/8);
  }
  
}

function movePinkie(e) {
  if (e.code == "ArrowRight" || e.code == "KeyD") {//move right
  velocityX = 2;
  pinkie.img = pinkieRightImg;
}
else if 
(e.code == "ArrowLeft" || e.code == "KeyA") {// move left
velocityX = -2;
pinkie.img = pinkieLeftImg;
}
else if (e.code == "Space" && gameOver) {
  // reset
  pinkie ={
  img : pinkieRightImg,
  x : pinkieX,
  y : pinkieY,
  width : pinkieWidth,
  height : pinkieHeight,
}
velocityX = 0;
velocityY = initialVelocityY;
score = 0;
maxScore = 0;
gameOver = false;
placePlatforms();
}
}

function placePlatforms () {
 platformArray = [];
 let platform = {
  img : platformImg,
  x : boardWidth/2,
  y : boardHeight - 50,
  width : platformWidth,
  height : platformHeight
 }

platformArray.push(platform);

for (let i  = 0; i <6; i++) {
  let randomX = Math.floor(Math.random() * boardWidth*3/4); //(0-1) * boardWidth*3/4
   let platform = {
  img : platformImg,
  x : randomX,
  y : boardHeight - 75*i - 150,
  width : platformWidth,
  height : platformHeight
 }

platformArray.push(platform);
}
}

function newPlatform() {
let randomX = Math.floor(Math.random() * boardWidth*3/4); //(0-1) * boardWidth*3/4
   let platform = {
  img : platformImg,
  x : randomX,
  y : -platformHeight,
  width : platformWidth,
  height : platformHeight
 }

platformArray.push(platform);
}

function detectCollision(a,b) {
  return a.x <b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function updateScore() {
  let points = Math.floor(50*Math.random());
  if (velocityY < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  }
  else if (velocityY >= 0) {
    maxScore -= points;
  }
}
