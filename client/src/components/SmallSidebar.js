import Wrapper from '../assets/wrappers/SmallSidebar';
import { useAppContext } from '../context/appContext';
import links from '../utils/links';
import { FaTimes } from 'react-icons/fa';
// import Logo from './Logo';
import { NavLink } from 'react-router-dom';

const SmallSidebar = () => {
  const { toggleSidebar, showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <h3>InterTrack</h3>
            {/* <Logo /> */}
          </header>
          {/* <NavLinks toggleSidebar={toggleSidebar}/> */}
          <div className='nav-links'>
            {links.map((link) => {
              const { id, text, path, icon } = link;
              return (
                <NavLink
                  to={path} //onClick takes to the given path
                  key={id}
                  onClick={toggleSidebar}
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
export default SmallSidebar;
