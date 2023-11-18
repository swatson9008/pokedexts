import { Outlet } from 'react-router-dom';
import LightDarkSwitch from './lightDarkSwitch';
import { Global } from '../styles/global';
import Footer from './footer';
import { useDarkMode } from '../pages/darkModeContext';

export default function MainPage() {
  const { isDarkMode } = useDarkMode();

  return (
    <main>
      <LightDarkSwitch />
      <Global isDarkMode={isDarkMode} />
      <Outlet />
      <Footer isDarkMode={isDarkMode} />
    </main>
  );
}
