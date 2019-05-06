/**
 * Background scripts.
 */

"use strict";

/**
 * Define external modules
 */
const config = Config;

/**
 * Open URL in a new tab.
 * Need permission "tabs"
 * @param {string} url - The URL to open.
 */
function openNewTab(url) {
  chrome.tabs.create({ 'url': url });
}

/**
 * Look up a string in Google Translate.
 * @param {string} str - The string to look up.
 */
function lookUpGoogleTranslate(str) {
  const baseUrl = 'https://translate.google.com';
  const srcLang = '#' + config.sourceLang;
  const destLang = config.destinationLang;
  const payload = encodeURIComponent(str);
  const url = `${baseUrl}/${srcLang}/${destLang}/${payload}`
  openNewTab(url);
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

createContextMenuItem(lookUpGoogleTranslate);