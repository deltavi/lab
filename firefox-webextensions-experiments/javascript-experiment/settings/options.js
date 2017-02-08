var scriptNameItem = document.querySelector('#scriptName');
var scriptContentItem = document.querySelector('#scriptContent');

var scriptsContainer = document.querySelector('#scripts-container');

var addBtn = document.querySelector('#add');
addBtn.addEventListener('click', addScript);

function onError(error) {
  console.error(error);
}

initialize();

function initialize() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var scriptNames = Object.keys(results);
    for(scriptName of scriptNames) {
      var scriptContent = results[scriptName];
      displayScript(scriptName, scriptContent);
    }
  }, onError);
}

function addScript() {
  var scriptName = scriptNameItem.value;
  var scriptContent = scriptContentItem.value;
  var gettingItem = browser.storage.local.get(scriptName);
  gettingItem.then((result) => {
    var objTest = Object.keys(result);
    if(objTest.length < 1 && scriptName !== '' && scriptContent !== '') {
      scriptNameItem.value = '';
      scriptContentItem.value = '';
      storeScript(scriptName, scriptContent);
    }
  }, onError);
}

function storeScript(scriptName, scriptContent) {
  var storingScript = browser.storage.local.set({ [scriptName] : scriptContent });
  storingScript.then(() => {
    displayScript(scriptName, scriptContent);
  }, onError);
}


/*function displayScript(scriptName, scriptContent) {
    var itemContainer = document.createElement('div');
    var itemName = document.createElement('h2');
    var itemScript = document.createElement('p');

    itemName.textContent = scriptName;
    itemScript.textContent = scriptContent;

    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemScript);
    scriptsContainer.appendChild(itemContainer);
}*/
function displayScript(scriptName, scriptContent) {

  /* create note display box */
  var note = document.createElement('div');
  var noteDisplay = document.createElement('div');
  var noteH = document.createElement('h2');
  var notePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');

  note.setAttribute('class','note');

  noteH.textContent = scriptName;
  notePara.textContent = scriptContent;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete note';
  clearFix.setAttribute('class','clearfix');

  noteDisplay.appendChild(noteH);
  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);

  note.appendChild(noteDisplay);

  /* set up listener for the delete functionality */

  deleteBtn.addEventListener('click',function(e){
    evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(scriptName);
  })

  /* create note edit box */
  var noteEdit = document.createElement('div');
  var noteTitleEdit = document.createElement('input');
  var noteBodyEdit = document.createElement('textarea');
  var clearFix2 = document.createElement('div');

  var updateBtn = document.createElement('button');
  var cancelBtn = document.createElement('button');

  updateBtn.setAttribute('class','update');
  updateBtn.textContent = 'Update note';
  cancelBtn.setAttribute('class','cancel');
  cancelBtn.textContent = 'Cancel update';

  noteEdit.appendChild(noteTitleEdit);
  noteTitleEdit.value = scriptName;
  noteEdit.appendChild(noteBodyEdit);
  noteBodyEdit.textContent = scriptContent;
  noteEdit.appendChild(updateBtn);
  noteEdit.appendChild(cancelBtn);

  noteEdit.appendChild(clearFix2);
  clearFix2.setAttribute('class','clearfix');

  note.appendChild(noteEdit);

  scriptsContainer.appendChild(note);
  noteEdit.style.display = 'none';

  /* set up listeners for the update functionality */

  noteH.addEventListener('click',function(){
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  })

  notePara.addEventListener('click',function(){
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  })

  cancelBtn.addEventListener('click',function(){
    noteDisplay.style.display = 'block';
    noteEdit.style.display = 'none';
    noteTitleEdit.value = scriptName;
    noteBodyEdit.value = scriptContent;
  })

  updateBtn.addEventListener('click',function(){
    if(noteTitleEdit.value !== scriptName || noteBodyEdit.value !== scriptContent) {
      updateNote(scriptName,noteTitleEdit.value,noteBodyEdit.value);
      note.parentNode.removeChild(note);
    }
  });
}


/* function to update notes */

function updateNote(delNote,newTitle,newBody) {
  var storingNote = browser.storage.local.set({ [newTitle] : newBody });
  storingNote.then(() => {
    if(delNote !== newTitle) {
      var removingNote = browser.storage.local.remove(delNote);
      removingNote.then(() => {
        displayNote(newTitle, newBody);
      }, onError);
    } else {
      displayNote(newTitle, newBody);
    }
  }, onError);
}

/* Clear all notes from the display/storage */

function clearAll() {
  while (scriptsContainer.firstChild) {
      scriptsContainer.removeChild(scriptsContainer.firstChild);
  }
  browser.storage.local.clear();
}


