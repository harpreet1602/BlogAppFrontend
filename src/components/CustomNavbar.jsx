import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
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
  } from 'reactstrap';
import { doLogOut, getCurrentUser, isLoggedIn } from '../auth';
import userContext from '../context/userContext';
  
const CustomNavbar = (args)=>{
    const [isOpen,setIsOpen] = useState(false);
    const toggle = ()=>{
        setIsOpen(!isOpen);
    }
    const navigate = useNavigate();
    const userContextData = useContext(userContext);

    const [login,setLogin] = useState(false);
    const [user,setUser] = useState(undefined);

    useEffect(()=>{
      setLogin(isLoggedIn());
      setUser(getCurrentUser());
    },[login]);

    const logout = ()=>{
      doLogOut(()=>{
        setLogin(false);
        userContextData.setUser({
          data: {},
          loggedIn: false
        })
        navigate("/");
      });

    }

    return (
        <div>
        <Navbar 
        color = "dark"
        dark = {true}
        expand = "md"
        {...args}
        className="px-5"
        >
          <NavbarBrand tag={ReactLink} to="/">My Blogs</NavbarBrand>
          <NavbarToggler onClick={()=>{toggle()}} />
          <Collapse isOpen = {isOpen} navbar>
           
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink tag={ReactLink} to="/">News Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/services">Services</NavLink>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Contact Us</DropdownItem>
                  <DropdownItem>YouTube</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Instagram</DropdownItem>
                  <DropdownItem>Facebook</DropdownItem>
                  <DropdownItem>LinkedIn</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav navbar>
              {
                login && 
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to={`/user/profileinfo/${user.id}`}>
                      Profile Info
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/user/dashboard">
                      {user.email}
                    </NavLink>
                  </NavItem>
                  <NavItem onClick={logout}>
                    <NavLink tag={ReactLink}>
                      Log Out
                    </NavLink>
                  </NavItem>
                </>
              }
              {
                !login && 
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/login">
                      Login
                    </NavLink>
                  </NavItem><NavItem>
                    <NavLink tag={ReactLink} to="/signup">
                      Sign Up
                    </NavLink>
                  </NavItem>
                </>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}
export default CustomNavbar;