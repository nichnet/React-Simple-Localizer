import React from 'react';

import {LocalizerItem, LocalizerPicker, LocalizerData} from 'simple-localizer';


function App() {

  var additional = [
    {
      "code": "sp",//adding a new language with its own values
      "name": "Spanish",
      data: {
        "how_much": "¿Cuánto cuesta?"
      }
    },{
      "code": "jp",
      data: {
        "how_much": "いくらですか？"//adding a new value
      }
    },{
      "code": "en",
      data: {
        "hello": "Hi"//updating an existing value
      }
    }
  ]

  return (
    <div>
          <LocalizerPicker/>
          <LocalizerData content={additional}/>
            <div>
              <h2>the content will be dynamically updated based on the user's current lang selection</h2>
              <h2><LocalizerItem lkey="hello"/></h2>
              <p><LocalizerItem lkey="goodbye"/></p>
              <a href="#"><LocalizerItem lkey="thank_you"/></a>
            </div>
            <br></br>
            <div>
              <h2>The "lang" parameter will force a language regardless of current localizer state</h2>
              <h2><LocalizerItem lkey="hello" lang="de"/></h2>
              <p><LocalizerItem lkey="goodbye" lang="jp"/></p>
              <a href="#"><LocalizerItem lkey="thank_you" lang="cn"/></a>
            </div>
            <br></br>
            <div>
              <h2>dynamic data thats not in the lang files.. this exists in the LocalizerData set up in a page by the author. It can be different per page, such as blog post</h2>
              <p>here: <LocalizerItem lkey="how_much"/></p>
            </div>
            <br></br>
            <div>
              <h2>If no key is provided, then an empty tag is created</h2>
              <p><LocalizerItem lkey=""/></p>
              <br></br>
              <h2>this key doesnt exist in the English localization, it will show values for all except when English is selected. If the "showKeys" flag is set in the Localizer component, then the key is returned</h2>
              <p>result: '<LocalizerItem lkey="how_are_you"/>'</p>
              <br></br>
              <p>This key exists, but we are forcing it to Chinese using the "lang" parameter.</p>
              <p>result: <LocalizerItem lkey="how_are_you" lang="cn"/></p>
              <br></br>
            </div>
			</div>
  );
}

export default App;
