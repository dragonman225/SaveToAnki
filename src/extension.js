/** 
 * SaveToAnki by dragonman225
 * v0.1.0: May.05, 2019: Initial version.
 * v0.2.0: May.05, 2019: Use custom model, support "translate.google.com.tw", better UI.
 * v0.2.1: May.05, 2019: Improve code style. Two types of card.
 */

"use strict";

/**
 * Define external modules
 */
const config = Config;
const ui = UI;

/**
 * Make a request to AnkiConnect
 * @param {string} action - API action supported by AnkiConnect
 * @param {number} version - API version
 * @param {object} params - Payload to the API
 * @returns {Promise}
 */
function invoke(action, version, params = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('error', () => reject('failed to issue request'));
    xhr.addEventListener('load', () => {
      try {
        const response = JSON.parse(xhr.responseText);
        if (Object.getOwnPropertyNames(response).length != 2) {
          throw 'response has an unexpected number of fields';
        }
        if (!response.hasOwnProperty('error')) {
          throw 'response is missing required error field';
        }
        if (!response.hasOwnProperty('result')) {
          throw 'response is missing required result field';
        }
        if (response.error) {
          throw response.error;
        }
        resolve(response.result);
      } catch (e) {
        reject(e);
      }
    });

    xhr.open('POST', 'http://127.0.0.1:8765');
    xhr.send(JSON.stringify({ action, version, params }));
  });
}

/**
 * Check if a deck exists
 * @param {string} targetDeckName - The name of the deck
 * @returns {boolean} True if exists, false if not exists
 */
async function targetDeckExists(targetDeckName = config.defaultDeckName) {
  const result = await invoke('deckNames', 6);
  for (let i = 0; i < result.length; ++i) {
    let deckName = result[i];
    if (deckName === targetDeckName) return true;
  }
  return false;
}

/**
 * Create a new deck
 * @param {string} name - The name of the deck
 */
async function createDeck(name = config.defaultDeckName) {
  const result = await invoke('createDeck', 6, { deck: name });
  console.log(`Deck created. ID: ${result}`);
}

/**
 * Create a new model (note type)
 * @param {string} name - The name of the model
 */
async function createModel(name = config.defaultDeckName) {
  const params = {
    modelName: name,
    inOrderFields: config.modelFields,
    css: config.cardStyle,
    cardTemplates: config.cardTemplates
  }
  const result = await invoke('createModel', 6, params);
  console.log(`Model created. ID: ${result.id}`);
}

/**
 * Add a note to a deck
 * @param {string} input - Input word
 * @param {string} output - Output word
 * @param {string} def - Definition of the input word
 * @param {string} ex - Example sentence of the input word
 * @param {string} name - The name of a deck
 */
async function addNote(input, output, def, ex, name = config.defaultDeckName) {
  const params = {
    note: {
      deckName: name,
      modelName: name,
      fields: {
        "Input": input,
        "Output": output,
        "Definition": def,
        "Example": ex
      },
      options: {
        allowDuplicate: false
      },
      tags: []
    }
  }
  const result = await invoke('addNote', 6, params);
  console.log(`Note created. ID: ${result}`);
}

/**
 * Handle click events of "Add To Anki" button
 */
function addToAnkiBtnHandler() {
  const wordIn = document.querySelectorAll("#input-wrap > div.text-dummy")[0].textContent;
  const wordOut = document.querySelectorAll("div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-source-target.main-header > div.source-target-row > div.tlid-results-container.results-container > div.tlid-result.result-dict-wrapper > div.result.tlid-copy-target > div.text-wrap.tlid-copy-target > div > span.tlid-translation.translation > span")[0].textContent;
  const _definition = document.querySelectorAll("div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-result-view.cllist > div.gt-lc.gt-lc-mobile > div.gt-cc > div.gt-cc-r > div > div.gt-cd.gt-cd-mmd > div.gt-cd-c")[0];
  const _example = document.querySelectorAll("div.frame > div.page.tlid-homepage.homepage.translate-text > div.homepage-content-wrap > div.tlid-result-view.cllist > div.gt-lc.gt-lc-mobile > div.gt-cc > div.gt-cc-r > div > div.gt-cd.gt-cd-mex > div.gt-cd-c > div.gt-ex-info > div.gt-ex-top > div")[0];
  const definition = _definition ? _definition.innerHTML : "No Definition";
  const example = _example ? _example.textContent : "No Example";
  console.log(`Got word "${wordIn}" -> "${wordOut}"`);
  console.log(`Got def ${definition}`);
  console.log(`Got example ${example}`);
  addNote(wordIn, wordOut, definition, example);
}

/**
 * Inject "Add To Anki" button to Google Translate toolbar
 */
function initUI() {
  const injectRoot = document.querySelectorAll("div.input-button-container > div.tlid-input-button-container")[0];
  const button = ui.createButton(addToAnkiBtnHandler);
  injectRoot.appendChild(button);
}

/**
 * Main program
 */
async function main() {

  console.log("SaveToAnki is running on " + window.location);

  let deckReady = await targetDeckExists();
  if (deckReady) {
    console.log("Deck ready");
  } else {
    console.log(`Deck not ready. Let me create one called "${config.defaultDeckName}".`);
    createDeck();
    createModel();
  }

  let isGoogleTranslate = window.location.href.indexOf("translate.google.com") !== -1;
  if (isGoogleTranslate) {
    console.log("This is Google Translate! Let me inject the UI.");
    initUI();
  }
}

try {
  main();
} catch (error) {
  console.error(error);
}