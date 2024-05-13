import React from 'react';
import { User } from '../models/user';
import {Navbar, Container, Nav } from 'react-bootstrap';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';

interface NavBarProps {
    loggedInUser : User | null,
    onSignupClicked:()=> void,
    onLoginClicked:()=> void,
    onLogoutSuccessful:()=> void,

}

const NavBar: React.FC<NavBarProps> = ({loggedInUser, onSignupClicked, onLoginClicked ,onLogoutSuccessful } : NavBarProps ) => {
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
        <Container>
            <Navbar.Brand>
                Cool Notes App
            </Navbar.Brand>
           <Navbar.Toggle aria-controls="main-navbar" />
           <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
                {  loggedInUser
                ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignupClicked={onSignupClicked}/>
            }
            </Nav>
           </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
