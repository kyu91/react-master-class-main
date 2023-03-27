
import { Outlet } from 'react-router-dom';
import { GlogalStyle } from './styles/Reset'

function App() {
  return (
    <>
      <GlogalStyle />
      <Outlet/>
    </>
  );
}

export default App;
