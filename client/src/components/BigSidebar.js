import Wrapper from '../assets/wrappers/BigSidebar';
import { useAppContext } from '../context/appContext';
import { NavLink } from 'react-router-dom';
// import Logo from './Logo';
import links from '../utils/links';

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            {/* <Logo /> */}
            <h3>InterTrack</h3>
          </header>
          <div className='nav-links'>
            {links.map((link) => {
              const { id, text, path, icon } = link;
              return (
                <NavLink
                  to={path} //onClick takes to the given path
                  key={id}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
