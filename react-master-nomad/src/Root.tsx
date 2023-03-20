
import Header from './components/Header';
import { Outlet } from 'react-router-dom';


function Root() {

  return( 
    <div>
      <Header></Header>
      <Outlet/>
    </div>
  )
}

export default Root;
