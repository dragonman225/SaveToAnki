/**
 * @module Config - Configuration of the extension.
 */

const Config = {
  shortcutEnabled: true,
  activateKey: 16,
  sourceLang: "auto",
  destinationLang: "zh-TW",
  defaultDeckName: "GoogleTranslate",
  modelFields: ["Input", "Output", "Pronunciation", "Definition", "Example"],
  synonymEnabled: false,
  cardTemplates: [
    {
      "Front":
        '<div>' +
        '<p><span class="title">{{Input}}</span></p>' +
        '<p><span class="sub-title">{{Pronunciation}}</span></p>' +
        '</div>',
      "Back":
        '<div>' +
        '<p><span class="title">{{Input}}</span><span class="sub-title"> / {{Output}}</span></p>' +
        '<p><span class="sub-title">{{Pronunciation}}</span></p>' +
        '</div>' +
        '<div id="def">{{Definition}}</div>' +
        '<div id="example">{{Example}}</div>'
    }
  ],
  cardStyle:
    '.card {\
    font-family: arial;\
    color: white;\
    text-align: center;\
    margin: 20px 35px;\
    background-color: #333;\
   }\
   \
   .title {\
    font-size: 44px;\
    font-weight: bold;\
   }\
   .sub-title {\
    font-size: 22px;\
   }\
   \
   #def {\
    text-align: left;\
    font-size: 16px;\
    line-height: 1.4;\
   }\
   \
   #example {\
    margin: 30px 10px;\
    font-size: 20px;\
   }\
   \
   .gt-cd-pos {\
    color: #4285f4;\
    text-transform: capitalize;\
    font-weight: 500;\
    margin: 5px 0 2px 0;\
    padding-bottom: 10px;\
   }\
   \
   .gt-def-list {\
    margin-left: 50px;\
    margin-right: 0;\
   }\
   \
   .gt-def-info {\
    margin-bottom: 12px;\
   }\
   \
   .gt-def-example {\
    margin-top: 4px;\
    color: #bbb;\
   }\
   \
   .gt-def-num {\
    position: absolute;\
    left: 25px;\
    border: 1px solid white;\
    border-radius: 100%;\
    width: 18px;\
    height: 18px;\
    line-height: 18px;\
    font-size: 14px;\
    text-align: center;\
   }\
   \
   .gt-def-synonym {\
    margin-top: 2px;\
    color: #bbb;\
    overflow: hidden;\
    text-overflow: ellipsis;\
   }\
   \
   .gt-def-synonym-title {\
    display: block;\
    font-style: normal;\
    text-transform: capitalize;\
    margin: 16px 0 10px;\
   }\
   \
   .gt-cd-cl {\
    font-weight: 400;\
    border: 1px solid #888;\
    border-radius: 32px;\
    margin: 0 4px 6px 0;\
    padding: 0 8px;\
    display: inline-block;\
    height: 24px;\
    line-height: 24px;\
   }\
   .gt-def-synonym {\
    transition: max-height 0.3s ease-in-out 0.15s;\
    max-height: 45px;\
   }\
   \
   .gt-def-synonym:hover {\
    transition: max-height 0.3s ease-in-out 0.15s;\
    max-height: 500px;\
   }',
  cardStyleSynonymOff:
    '.gt-def-synonym {\
    display:none;\
   }',
}
