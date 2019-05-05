/**
 * @module Config - Configuration of the extension.
 */

const Config = {
  defaultDeckName: "GoogleTranslate",
  modelFields: ["Input", "Output", "Definition", "Example"],
  cardTemplates: [
    {
      "Front": '<div id="title-front"><h1>{{Input}}</h1></div>',
      "Back":
        '<div id="title-back"><h1>{{Output}}</h1></div>' +
        '<div id="def">{{Definition}}</div>' +
        '<div id="example">{{Example}}</div>'
    },
    {
      "Front": '<div id="title-front"><h1>{{Output}}</h1></div>',
      "Back":
        '<div id="title-back"><h1>{{Input}}</h1></div>' +
        '<div id="def">{{Definition}}</div>' +
        '<div id="example">{{Example}}</div>'
    }
  ],
  cardStyle:
    '.card {\
    font-family: arial;\
    color: white;\
    text-align: center;\
    margin: 10px 50px;\
    background-color: #333;\
   }\
   \
   #title-front, #title-back {\
    font-size: 24px;\
   }\
   \
   #def {\
    text-align: left;\
    font-size: 16px;\
    line-height: 1.4;\
   }\
   \
   #example {\
    margin: 30px;\
    font-size: 20px;\
   }\
   \
   .gt-cd-pos {\
    color: #4285f4;\
    text-transform: capitalize;\
    font-weight: 500;\
    margin: 5px 0 2px 8px;\
    padding-bottom: 10px;\
   }\
   \
   .gt-def-list {\
    margin-left: 56px;\
    margin-right: 20px;\
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
    left: 66px;\
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
   }'
}