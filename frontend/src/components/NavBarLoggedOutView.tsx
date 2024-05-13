import React from 'react';
import { Button } from 'react-bootstrap';

interface NavBarLoggedOutViewProps {
    onSignupClicked:()=>void,
    onLoginClicked:()=>void

}

const NavBarLoggedOutView: React.FC<NavBarLoggedOutViewProps> = ({onSignupClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
  return (
    <div>
        <Button onClick={onSignupClicked}>Sign Up</Button>
        <Button onClick={onLoginClicked}> Log in </Button>
      
    </div>
  );
}

export default NavBarLoggedOutView;
