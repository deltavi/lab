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
    var itemContainer = document.createElement('div');
    var itemName = document.createElement('h2');
    var itemScript = document.createElement('p');

    itemName.textContent = scriptName;
    itemScript.textContent = scriptContent;

    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemScript);
    scriptsContainer.appendChild(itemContainer);
}


