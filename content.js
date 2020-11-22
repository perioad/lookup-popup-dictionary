console.log('Lookup popup extension is working :)');

const owlbot_api_key = 'fc926d559d2c7f97b3820da34a514c03e2d6944c';
const godZIndex = 9999; // to add to styles

const styles = document.createElement('style');
// todo: find all text tags
styles.innerHTML = `
  p::selection,
  span::selection,
  em::selection {
    background: #ffa500 !important;
    color: #f2f2f2 !important;
  }

  .lookupPopupDictionary {
    width: 200px;
    height: 100px;
    color: #f2f2f2;
    background-color: rgba(18, 18, 18, 0.97);
    position: absolute;
    border-radius: 3px;
    box-shadow: 0 0 4px #f2f2f2;
    z-index: 9999;
  }
`;
document.getElementsByTagName('head')[0].append(styles);

// document.onmousedown = (event) => {
//   const isEventOnPopup = event.target.className === 'lookupPopupDictionary';
  
//   if (isEventOnPopup) {
//     return;
//   }

//   const oldPopups = document.getElementsByClassName('lookupPopupDictionary');

//   if (oldPopups.length > 0) {
//     for (let popup of oldPopups) {
//       popup.remove();
//     }
//   }
// }

// todo: avoid bubbling?
document.onmouseup = async () => {

  const selection = document.getSelection();
  const selectionText = selection.toString();

  if (selectionText.length < 2) {
    return;
  }

  console.log(getSelectionCoordinates(selection));

  const selectionCoordinates = getSelectionCoordinates(selection);
  const popup = document.createElement('div');

  popup.innerText = selectionText;
  popup.className = 'lookupPopupDictionary';
  document.body.append(popup);

  computePopupCoordinates(popup, selectionCoordinates);

  const wordInfo = await lookupWord(selectionText, owlbot_api_key);
  
}

const computePopupCoordinates = (popup, selectionCoordinates) => {

  if (window.innerHeight - selectionCoordinates.bottom - popup.offsetHeight > 0) {
    popup.style.top = selectionCoordinates.bottom + window.scrollY + 'px';
  } else {
    popup.style.top = selectionCoordinates.top - popup.offsetHeight + window.scrollY + 'px';

  }

  // check if it works when there is y-axis scroll bar
  if (window.innerWidth / 2 - selectionCoordinates.left > 0) {
    popup.style.left = selectionCoordinates.left + window.scrollX + 'px';
  } else {
    popup.style.right = window.innerWidth - selectionCoordinates.right + 'px';

  };

  console.log('popup width', popup.offsetWidth);
};

const getSelectionCoordinates = (selection) => {
  const oRange = selection.getRangeAt(0); // get the text range
  const oRect = oRange.getBoundingClientRect();

  return oRect;
}

const lookupWord = async (word, api_key) => {
  const responce = await fetch(
    `https://owlbot.info/api/v4/dictionary/${word}`,
    {
      headers: {
          'Authorization': `Token ${api_key}`,
      },
    }
  )
  const wordInfo = await responce.json();
  
  return wordInfo;
}

// const imgs = document.getElementsByTagName('img');

// for (let img of imgs) {
//   const url = chrome.extension.getURL('kitten.jpg');
//   img.src = url;
// }

// chrome.runtime.onMessage.addListener(gotMessage);

// function gotMessage(message, sender, sendResponse) {
//   console.log(message.txt);
// }