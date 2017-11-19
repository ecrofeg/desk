import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

export default class Layout extends React.Component {
	render() {
		return <section className="desk-root">
			<AppBar className="toolbar">
				<Toolbar/>
			</AppBar>

			{this.props.children}
		</section>;
	}
}
