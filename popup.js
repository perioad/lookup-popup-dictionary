chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
  document.getElementById("output").innerHTML = selection[0];
});
console.log('here')
// const turnOnButton = document.getElementById("turnOnButton");
// const turnOffButton = document.getElementById("turnOffButton");

// function consolelogSelection() {
//   console.log(document.getSelection().toString());
// }

// turnOnButton.addEventListener('click', function subscribeSelectionChange() {
//   document.addEventListener('selectionchange', consolelogSelection);
//   console.log('subscribed!');
// });

// turnOffButton.addEventListener('click', function unsubscribeSelectionChange() {
//   document.removeEventListener('selectionchange', consolelogSelection);
//   console.log('unsubscribed!');
// });