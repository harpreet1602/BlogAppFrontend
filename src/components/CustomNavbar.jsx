import React, { useState } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
  
const CustomNavbar = (args)=>{
    const [isOpen,setIsOpen] = useState(false);
    const toggle = ()=>{
        setIsOpen(!isOpen);
    }
    return (
        <div>
        <Navbar 
        color = "dark"
        dark = {true}
        expand = "md"
        {...args}>
          <NavbarBrand tag={ReactLink} to="/">My Blogs</NavbarBrand>
          <NavbarToggler onClick={()=>{toggle()}} />
          <Collapse isOpen = {isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink tag={ReactLink} to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/login">
                  Login
                </NavLink>
              </NavItem><NavItem>
                <NavLink tag={ReactLink} to="/signup">
                  Sign Up
                </NavLink>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag = {ReactLink} to = "/services">Services</DropdownItem>
                  <DropdownItem>Contact Us</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>YouTube</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>YouTube</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
}
export default CustomNavbar;