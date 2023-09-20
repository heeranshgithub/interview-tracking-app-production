import { useAppContext } from '../context/appContext';
import StatItem from './StatItem';
import {
  FaSuitcaseRolling,
  FaCalendar,
  FaCalendarCheck,
  FaBug,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
  const { stats, handleChange } = useAppContext();

  const defaultStats = [
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendar />,
      color: '#8964d9',
      bcg: '#e0e8f9',
      handleClick: function () {
        handleChange({ name: 'searchStatus', value: 'interview' });
      },
    },
    {
      title: 'accepted applications',
      count: stats.accepted || 0,
      icon: <FaCalendarCheck />,
      color: '#03fc6b',
      bcg: '#048506',
      handleClick: function () {
        handleChange({ name: 'searchStatus', value: 'accepted' });
      },
    },
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
      handleClick: function () {
        handleChange({ name: 'searchStatus', value: 'pending' });
      },
    },
    {
      title: 'declined applications',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
      handleClick: function () {
        handleChange({ name: 'searchStatus', value: 'declined' });
      },
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return (
          <NavLink
            to='all-jobs'
            className='nav-link'
            key={index}
            onClick={item.handleClick}
          >
            <StatItem {...item} />
          </NavLink>
        );
      })}
    </Wrapper>
  );
};
export default StatsContainer;
