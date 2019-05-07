/**
 * Background scripts.
 */

"use strict";

/**
 * Define external modules
 */
const config = Config;

/**
 * Background states
 */
let state = {
  lastGTTabId: 0
}

/**
 * Open URL in a new tab.
 * Need permission "tabs"
 * @param {string} url - The URL to open.
 */
function openNewTab(url) {
  chrome.tabs.create({ 'url': url }, (tab) => {
    if (tab.id) state.lastGTTabId = tab.id;
  });
}

/**
 * Update URL of a tab.
 * Need permission "tabs"
 * @param {number} id - The tab ID.
 * @param {string} url - The URL.
 * @param {boolean} active - Whether to go to the tab. 
 */
function updateTab(id, url, active) {
  const opts = { url, active };
  chrome.tabs.update(id, opts);
}

/**
 * Check if a tab exists.
 * Need permission "tabs"
 * @param {number} id - The tab ID.
 * @returns {Promise} - True if exists. False if not.
 */
function tabExists(id) {
  let _asyncFunc = new Promise(function (resolve, reject) {
    //const opts = { 'lastFocusedWindow': true };
    const opts = {};
    chrome.tabs.query(opts, function (tabs) {
      for (let i = 0; i < tabs.length; ++i) {
        if (tabs[i].id === id) resolve(true);
      }
      resolve(false);
    });
  });
  return _asyncFunc;
}

/**
 * Look up a string in Google Translate.
 * @param {string} str - The string to look up.
 */
async function lookUpGoogleTranslate(str) {
  const baseUrl = 'https://translate.google.com';
  const srcLang = '#' + config.sourceLang;
  const destLang = config.destinationLang;
  const payload = encodeURIComponent(str);
  const url = `${baseUrl}/${srcLang}/${destLang}/${payload}`;
  const tabId = state.lastGTTabId;
  const lastGTTabExists = await tabExists(tabId);
  if (lastGTTabExists) {
    updateTab(tabId, url, true);
  } else {
    openNewTab(url);
  }
}

/**
 * Create a "Look up in Google Translate" context menu item.
 * Need permission "contextMenus"
 * Working only in background scripts.
 * @param {function} handler - Function to handle the context menu item click.
 */
function createContextMenuItem(handler) {
  chrome.contextMenus.create({
    title: 'Look up in Google Translate',
    contexts: ['selection'],
    onclick: (info) => {
      handler(info.selectionText);
    }
  });
  console.log('ContextMenuItem "Look up in Google Translate" created.');
}

/**
 * Handle Chrome extension runtime message.
 * https://developers.chrome.com/extensions/runtime#event-onMessage
 * @param {*} message 
 * @param {MessageSender} sender 
 * @param {function} sendResponse 
 */
function extensionMessageHandler(message, sender, sendResponse) {
  const action = message.action;
  const params = message.params;
  switch (action) {
    case 'lookUpGoogleTranslate':
      lookUpGoogleTranslate(params.string);
      break;
    default:
      console.error('Unknown action.');
  }
}

chrome.runtime.onMessage.addListener(extensionMessageHandler);

createContextMenuItem(lookUpGoogleTranslate);