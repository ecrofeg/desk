import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

export default class Layout extends React.Component {
	render() {
		return <section className="desk-root">
			<AppBar className="toolbar">
				<Toolbar>
					<IconButton color="contrast" aria-label="Menu">
						<MenuIcon />
					</IconButton>

					<Typography type="title" color="inherit">
						Title
					</Typography>
				</Toolbar>
			</AppBar>

			<div>
				{this.props.children}
			</div>
		</section>;
	}
}
