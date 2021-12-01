import React, { Component } from 'react';
import LocalizerContext from './LocalizerContext';

class LocalizerItem extends Component {
	render() { 
		return(
			<LocalizerContext.Consumer>
				{context => context.get(this.props.lang, this.props.lkey)}
			</LocalizerContext.Consumer>
		); 
	}
}

export default LocalizerItem;