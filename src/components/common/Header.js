import React, { Component } from 'react';
import { 
  Navbar,
  NavbarBrand
} from 'reactstrap';


class Header extends Component {

	render(){

		return (
			<Navbar expand = "md" color = "dark" className = "text-white" >
			  <NavbarBrand>WD</NavbarBrand> 
			</Navbar>
		);

	}

}


export default Header;