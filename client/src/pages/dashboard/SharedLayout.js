//SharedLayout wrapped inside ProtectedRoute in App.js
import { Navbar, BigSidebar, SmallSidebar } from '../../components';
import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout'

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <BigSidebar />
        <SmallSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
