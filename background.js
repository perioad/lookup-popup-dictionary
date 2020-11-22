console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
  console.log('button clicked', tab);

  let msg = {
    txt: 'hello',
  }

  chrome.tabs.sendMessage(tab.id, msg);
}