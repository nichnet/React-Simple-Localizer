# React Simple Localizer


### Installation
```
npm install simple-localizer
``` 

## Implementing in your Project
 
### Wrapper
Wrap any portion of your React project with the **_Localizer_** component. You can set the default language, with the **_languages_** property, **_showKeys_** will return the provided key if a value is not found, and **_debug_** will print messages to the developer console. This component can be at the top level of your React DOM like so:
```javascript
import my_localizations from './lang';


ReactDOM.render(
  <React.StrictMode>
    <Localizer languages={my_localizations} default="en" showKeys debug>
      <App />
    </Localizer>
  </React.StrictMode>,
  document.getElementById('root')
);
```
 
### Defining Locales 
Define the **_languages_** array like so:
```javascript
const my_localizations = 
[{
  code:"de",
  name:"Deutsche",
  data: {
    "hello": "Hallo",
    "goodbye": "Auf Wiedersehen",
    "thank_you": "Danke schön"
  }
},
{
  code:"jp",
  name:"日本語",
  data: {
    "hello": "こんにちは",
    "goodbye": "さようなら",
    "thank_you": "ありがとうございました"
  }
}];

export default my_localizations;
```
 
### Implementing the Components 
Localized language components can easily be added to your existing pages, using a combination of the **_LocalizerItem_**, **_LocalizerData_**, & **_LocalizerPicker_** components. Using the **_lang_** property you can force a value to always take on a certain locale. You can also add more language values, per page, this is useful for blog pages with unique data.
```javascript
render() {
  var additional = [
    {
      "code": "sp",//adding a new language with its own values
      "name": "Spanish",
      data: {
        "how_are_you": "¿cómo estás?"
      }
    },{
      "code": "jp",
      data: {
        "how_are_you": "元気ですか？"//adding a new value
      }
    },{
      "code": "en",
      data: {
        "how_are_you": "How are you?"//adding a new value
        "hello": "Hi!"//updating an existing value
      }
    }
  ]

 return(
    <div>
      <LocalizerPicker/>
      <LocalizerData content={additional}/>
      <h2><LocalizerItem lkey="hello"/></h2>
      <p><LocalizerItem lkey="goodbye" lang="jp"/></p>
      <a href="#"><LocalizerItem lkey="how_are_you"/></a>
    </div>
  );
}
```



## License

MIT © [nichnet](https://github.com/nichnet)
