import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
