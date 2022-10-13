import React from 'react';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useAppDispatch } from '../redux/hooks';
import { setTheme } from '../redux/reducers/userInfoSlice';

function ThemeToggle() {
  const dispatch = useAppDispatch();
  const switchDarkMode = () => {
    if (localStorage.getItem('theme') === ''){localStorage.setItem('theme', 'lightMode');}
    //set sessionStorage dark mode to true when this function is called.
    if (localStorage.getItem('theme') !== 'darkMode'){
      localStorage.setItem('theme','darkMode');
    }
    //set it to false if called when it is already true.
    else localStorage.setItem('theme','lightMode');
  
    dispatch(setTheme(localStorage.getItem('theme')));
    // useAppDispatch((state) => {state.UserInfo.setTheme();});
  };

  return (
    <>
      <div id="darkmode">
        <input type="checkbox" onChange={switchDarkMode} className="checkbox" id="checkbox" />
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
// the get method just gets the currently set.

// Issue here is on re-render? How to reload state on a re-render.