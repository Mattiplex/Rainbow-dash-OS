function updatetime() {
  var currentTime = new Date().toLocaleString();
  var timetext = document.querySelector('#timeElement');
  timetext.innerHTML = currentTime;
  console.log(currentTime);
}

setInterval(updatetime, 1000); 

dragElement(document.getElementById("welcomescreen"));
dragElement(document.getElementById("noteswindow"));


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

var NotesWindow = document.querySelector("#noteswindow")
var NotesClose = document.querySelector("#notesclose")
var NotesOpen = document.querySelector("#notesopen")

NotesOpen.addEventListener("click",function(){
  openWindow(NotesWindow);
});

NotesClose.addEventListener("click",function(){
  event.stopPropagation();
  closeWindow(NotesWindow);
});

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
window.


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
new rainbowCursor({ element: targetElement });

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

var text=Array("TALA", "TALA", "TALA"); // replace this with an array of your own text
var delay=4; // seconds between each new text item
var speed=10; // speed of the scroll
 
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
  for (let i=rolltop; i>= 0; i--) { setTimeout(() => {diddly[j].style.top = i + "px"; }, speed*(rolltop-i));}
  for (let i=-1; i>-rolltop; i--) { setTimeout(() => {diddly[j].style.top=i + "px";}, delay + speed* (-i));}
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
