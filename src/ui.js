/**
 * @module UI - UI injected to Google Translate
 */
var UI = (function (ui) {

  ui.createButton = function (handler) {
    let btn = document.createElement('div');
    let textWrap = document.createElement('div');
    let text = document.createTextNode('Add to Anki');

    btn.classList.add("tlid-input-button", "input-button", "header-button");
    textWrap.classList.add("text");

    textWrap.appendChild(text);
    btn.appendChild(textWrap);

    btn.addEventListener('click', handler);
    return btn;
  }

  return ui;
}(UI || {}));
