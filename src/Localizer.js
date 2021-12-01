import React, {Component} from 'react';
import LocalizerContext from './LocalizerContext';

class Localizer extends Component {

	constructor(props) {
		super(props);

		this.state = { availableLanguages: [] };

		this.get = this.get.bind(this);
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
		this.refreshLanguageOptions = this.refreshLanguageOptions.bind(this);
		this.addAdditionalData = this.addAdditionalData.bind(this);
		this.debug = this.debug.bind(this);

		this.additionalData = [];
	}

	componentDidMount(){
		//set default language
		var lastLanguage = localStorage.getItem('language');

		if(lastLanguage !== undefined && lastLanguage !== null && lastLanguage !== "") {
			this.onLanguageChanged(lastLanguage);
		} else {
			if(this.props.default !== undefined) {
				this.onLanguageChanged(this.props.default);
			} else {
				//just set as first in the list if the default wasnt provided as a prop
				this.onLanguageChanged(this.refreshLanguageOptions()[0].code);
			}
		}
	}

	render() {
		return (
			<LocalizerContext.Provider value={{
				get:this.get,
				onLanguageChanged: this.onLanguageChanged,
				addAdditionalData: this.addAdditionalData,
				selected: this.state.selected,
				availableLanguages: this.refreshLanguageOptions(),
			}}>
				{this.props.children}
			</LocalizerContext.Provider>
		);
	}
	
	refreshLanguageOptions() {
		var options = [];
		//map
		this.props.languages.forEach((language) => {
			options.push({code:language.code, name:language.name});
		});

		//TODO add additional langs here 

		return options;
	}

	addAdditionalData(ammended) {
		//iterate each lang in new lang. 
		ammended.forEach((lang) => {
			var code = lang.code;
			//does new lang exist in current lang,
			var langObj = this.additionalData.filter(obj => obj.code === code)[0];
			if(langObj === undefined) {
				//add new lang
				this.additionalData.push(lang);
			} else {
				//iterate the words in the new lang and add to existing lang.
				for (var word in lang.data) {
					var key = word;
					var value = lang.data[word];
					langObj.data[key] = value;
				}
			}
		});

		//refresh available languages
		this.refreshLanguageOptions()
	}
	
	get(lang, key) {
		if(key === undefined) {
			this.debug("Unable to retrieve localized value because no key was provided.");
			return undefined;
		}

		//if lang var is passed then force the language to the selected one,
		//otherwise just use the global language. 
		var language = lang ? lang : this.state.selected;

		//ensure the chosen language exists in the available options
		var langValues = this.props.languages.filter(obj => obj.code === language)[0];
		var langValuesAdditional = this.additionalData.filter(obj => obj.code === language)[0];
		
		//language does not exist in additional data or original, return the key (if that option is set, otherwise undefined)
		if(langValues === undefined && langValuesAdditional === undefined) {
			return this.props.showKeys === true ? key : undefined;
		}

		//using the passed in key, get the value 
		//override if necessary
		var value = langValues.data[key];
		var overrideValue = undefined;

		if(langValuesAdditional !== undefined) {
			overrideValue = langValuesAdditional.data[key];
		}

		//if both values are undefined, return the key (if that option is set, otherwise undefined)
		if(value === undefined && overrideValue === undefined) {
			this.debug("Unable to retrieve localized value because  key: '", key, "' in language pack: '", language, "' was not found. Returning key.");
			return this.props.showKeys ? key : undefined;
		}

		//return override value if it exists
		if(overrideValue !== undefined) {
			return overrideValue;
		}
		
		//if reaching here, then the original value must be present, return it.
		return value;
	}

	debug(message) {
		if(message) {
			if(this.props.debug === true) {
				console.log(message);
			}
		}
	}

	onLanguageChanged(lang) {
		if(lang === undefined) {
			this.debug("No language code supplied. Cannot change.");
			return;
		}

		this.setState({ selected: lang},()=> {
			this.debug("Language code set as:", this.state.selected);
			localStorage.setItem('language', this.state.selected);
		});
	}
}

export default Localizer;
