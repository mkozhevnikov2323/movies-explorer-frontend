import React from 'react';
import './Navigation.css';
import NavigationAccount from './NavigationAccount/NavigationAccount';
import NavigationAuthorization from './NavigationAuthorization/NavigationAuthorization';

export default function Navigation({ login }) {

  return (
    <>
      {login ? <NavigationAccount /> : <NavigationAuthorization />}
    </>
  )
}
