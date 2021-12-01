import React, { Component } from "react";
import LocalizerContext from './LocalizerContext';

class LocalizerData extends Component {

	render() {
        if(this.props.content) {
            return(
                <LocalizerContext.Consumer>
                    {context => context.addAdditionalData(this.props.content)}
                </LocalizerContext.Consumer>
            ); 
        } 
	}
}

export default LocalizerData;