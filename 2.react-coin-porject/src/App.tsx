import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GlogalStyle } from './styles/Reset'
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './routes/atoms';

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={ isDark ? darkTheme : lightTheme }>
        <GlogalStyle />
        <Outlet/>
      </ThemeProvider>
    </>
  );
}

export default App;
