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

function displayScript(scriptName, scriptContent) {
  var scriptBox = document.createElement('div');
  var scriptDisplay = document.createElement('div');
  var scriptHeader = document.createElement('h2');
  var scriptParagraph = document.createElement('p');
  var deleteBtn = document.createElement('div');
  var clearFix = document.createElement('div');

  scriptBox.setAttribute('class','script');

  scriptHeader.textContent = scriptName;
  var editScript = document.createElement('span');
  editScript.setAttribute('class','editScript');
  editScript.setAttribute('title','Edit');
  scriptHeader.appendChild(editScript);

  scriptParagraph.textContent = scriptContent;
  deleteBtn.setAttribute('class','buttonDelete');
  deleteBtn.setAttribute('title','Delete');
  clearFix.setAttribute('class','clearfix');

  scriptDisplay.appendChild(scriptHeader);
  scriptDisplay.appendChild(scriptParagraph);
  scriptDisplay.appendChild(deleteBtn);
  scriptDisplay.appendChild(clearFix);

  scriptBox.appendChild(scriptDisplay);

  /* set up listener for the delete functionality */

  deleteBtn.addEventListener('click',function(e){
    evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(scriptName);
  })

  /* create script edit box */
  var scriptEdit = document.createElement('div');
  var scriptTitleEdit = document.createElement('input');
  var scriptBodyEdit = document.createElement('textarea');
  var clearFix2 = document.createElement('div');

  var updateBtn = document.createElement('div');
  var cancelBtn = document.createElement('div');

  updateBtn.setAttribute('class','buttonUpdate');
  updateBtn.setAttribute('title','Update');
  cancelBtn.setAttribute('class','buttonUndo');
  cancelBtn.setAttribute('title','Cancel');

  scriptEdit.appendChild(scriptTitleEdit);
  scriptTitleEdit.value = scriptName;
  scriptEdit.appendChild(scriptBodyEdit);
  scriptBodyEdit.textContent = scriptContent;
  scriptEdit.appendChild(updateBtn);
  scriptEdit.appendChild(cancelBtn);

  scriptEdit.appendChild(clearFix2);
  clearFix2.setAttribute('class','clearfix');

  scriptBox.appendChild(scriptEdit);

  scriptsContainer.appendChild(scriptBox);
  scriptEdit.style.display = 'none';

  /* set up listeners for the update functionality */

  scriptHeader.addEventListener('click',function(){
    scriptDisplay.style.display = 'none';
    scriptEdit.style.display = 'block';
  })

  scriptParagraph.addEventListener('click',function(){
    scriptDisplay.style.display = 'none';
    scriptEdit.style.display = 'block';
  })

  cancelBtn.addEventListener('click',function(){
    scriptDisplay.style.display = 'block';
    scriptEdit.style.display = 'none';
    scriptTitleEdit.value = scriptName;
    scriptBodyEdit.value = scriptContent;
  })

  updateBtn.addEventListener('click',function(){
    if(scriptTitleEdit.value !== scriptName || scriptBodyEdit.value !== scriptContent) {
      updateScript(scriptName,scriptTitleEdit.value,scriptBodyEdit.value);
      scriptBox.parentNode.removeChild(scriptBox);
    }
  });
}


/* function to update scripts */
function updateScript(delScript,newScriptName,newScriptBody) {
  var storingScript = browser.storage.local.set({ [newScriptName] : newScriptBody });
  storingScript.then(() => {
    if(delScript !== newScriptName) {
      var removingScript = browser.storage.local.remove(delScript);
      removingScript.then(() => {
        displayScript(newScriptName, newScriptBody);
      }, onError);
    } else {
      displayScript(newScriptName, newScriptBody);
    }
  }, onError);
}

/* Clear all scripts from the display/storage */

function clearAll() {
  while (scriptsContainer.firstChild) {
      scriptsContainer.removeChild(scriptsContainer.firstChild);
  }
  browser.storage.local.clear();
}