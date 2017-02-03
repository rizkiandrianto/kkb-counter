import React, { Component } from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, useRouterHistory, Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from 'react-router-bootstrap';
import '../dist/assets/scss/styles.scss';

class App extends Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	render(){
		return(
			<component>
				<div className="container">
					{this.props.children}
				</div>
			</component>
		)
	}
}

export default App
