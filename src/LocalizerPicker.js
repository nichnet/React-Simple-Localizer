import React, { Component } from 'react';
import LocalizerContext from './LocalizerContext';

class LocalizerPicker extends Component {
	render() {
		return (
			/* TODO if a language that did not previously exist in the original language data
			 * is added as a result of any additional language data, 
			 * then we should reflect that additional language option in the picker
			 */  
			<LocalizerContext.Consumer>
			  {value  => 
					<select value={value.selected} onChange={e => value.onLanguageChanged(e.target.value)}>
					{
					value.availableLanguages.map((element) => 
        				<option key={element.code} value={element.code}>{element.name === undefined  ? element.code : element.name }</option>
    				)}  
					</select>
				}
			</LocalizerContext.Consumer>
		);
	}
}

export default LocalizerPicker;