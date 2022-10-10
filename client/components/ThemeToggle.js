import React from 'react';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

function ThemeToggle() {
  return (
    <>
      <div id="darkmode">
        <input type="checkbox" className="checkbox" id="checkbox" />
        <label htmlFor="checkbox" className="label">
          <BsMoonStarsFill color="white" />
          <BsFillSunFill color="yellow" />
          <div className="ball"></div>
        </label>
      </div>
    </>
  );
}

export default ThemeToggle;


//Strategy:
// To toggle the theme, we have this button which when clicked will hopefully change the theme.
// Let's use localStorage set and get methods to save our theme.
// the set method just sets if we are in light or dark mode depenging on our ThemeToggle component.
// the get method just gets the currently set 