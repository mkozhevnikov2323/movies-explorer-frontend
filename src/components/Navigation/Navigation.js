import React, { useState } from 'react';
import './Navigation.css';
import NavigationAccount from './NavigationAccount/NavigationAccount';
import NavigationAuthorization from './NavigationAuthorization/NavigationAuthorization';

export default function Navigation() {
  const [login, setLogin] = useState(true);

  return (
    <>
      {login ? <NavigationAccount /> : <NavigationAuthorization />}
    </>
  )
}
