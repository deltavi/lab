var menuContainer = document.querySelector('#menu');
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('buttonTitle')) {
    if (e.target.parentElement.classList.contains('buttonClosed')) {
      e.target.parentElement.classList.remove('buttonClosed');
    } else {
      e.target.parentElement.classList.add('buttonClosed');
    }
  }
  else if (e.target.getAttribute('url')) {
    browser.tabs.create({
      'url': e.target.getAttribute('url')
    });
    window.close();
    return;
  } else if (e.target.id === 'gotoGitHub') {
    
    browser.tabs.create({
      'url': 'https://github.com/deltavi/'
    });
    window.close();
    return;
  }
});

function onError(error) {
  console.error(error);
}

initialize();
function initialize() {
	var resText = 	'## Example menu\n' +
					'* Example 1: [example1.com](https://example1.com)\n' +
					'* Example 2: [example2.com](https://example2.com)\n';
	menuContainer.innerHTML = '';
	var currentBox;
	var lines = resText.split('\n');
	for (line of lines) {
	  var textLine = line.trim();
	  if (textLine.indexOf('##') == 0) {
		textLine = textLine.substr(2).trim();
		currentBox = addButtonsBox(textLine);
	  } else if (textLine.indexOf('*') == 0) {
		textLine = textLine.substr(1).trim();
		addButton(currentBox, textLine);
	  }
	}
}

function addDiv(item, text, cls) {
  var itemSub = document.createElement('div');
  itemSub.innerText = text;
  itemSub.setAttribute('class', cls);
  item.appendChild(itemSub);
  return itemSub;
}
function addButtonsBox(title) {
  var box = document.createElement('div');
  box.setAttribute('class', 'buttonClosed');
  addButtonTitle(box, title);
  menuContainer.appendChild(box);
  return box;
}
function addButton(item, text, url) {
  var data = extractData(text);
  var div = addDiv(item, data.title , 'button');
  var link = document.createElement('div');
  link.innerText = data.text;
  link.setAttribute('class', 'buttonLink');
  link.setAttribute('url', data.url);
  div.appendChild(link);
  div.setAttribute('url', data.url);
}
function addButtonTitle(item, text) {
  addDiv(item, text, 'buttonTitle');
}

function extractData(text) {
  var values = /(.*)\[(.*)\].*\((.*)\)/.exec(text)
  return {
    title: values[1],
    text: values[2],
    url: values[3]
  };
}