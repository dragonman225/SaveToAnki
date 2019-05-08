# SaveToAnki

*A Chrome extension that helps saving Google translate results to Anki via AnkiConnect.*

### Usage

* When URL contains `translate.google.com`, a button "Add to Anki" appears on Google Translate's toolbar.
  * Currently only `translate.google.com` and `translate.google.com.tw` are tested.
* On all sites, select some text, then press `Shift` key or right-click and choose "Look up in Google Translate" to look up in Google Translate.
* To disable synonym, open `src/config.js`, change `synonymEnabled: true` to `synonymEnabled: false`. Then, delete old deck and note type, and reload the extension.

### Known Bugs

* `Shift` key Google Translate invocation may conflict with system input method switching.

### Changelog

* v0.1.0: May.05, 2019: Initial version.
* v0.2.0: May.05, 2019: Use custom model, support `translate.google.com.tw`, better UI.
* v0.2.1: May.05, 2019: Improve code style. Two types of card.
* v0.3.0: May.06, 2019: New feature "Look up in Google Translate". Hover to show synonyms.
* v0.3.1: May.07, 2019: Use keyboard to invoke Translate. Invocations reuse previous Translate tab.
* v0.3.2: May.08, 2019: Add pronunciation. Enhance card template and style for mobile devices.

### Permissions

* `contextMenus`: Add "Look up in Google Translate" item in right-click menu when text selected.
* `tabs`: Open Google Translate URL in a new tab.

### Installation

1. Clone this repository, or download as zip and extract.
2. In Chrome, Go to `More tools` > `Extensions`, enable `Developer mode`.
3. Click on `Load unpacked`, select the folder of this extension.

