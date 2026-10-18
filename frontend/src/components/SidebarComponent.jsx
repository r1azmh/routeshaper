import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaCaravan, FaNetworkWired } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import { MdLeaderboard, MdWork } from 'react-icons/md';
import { JOBS } from './constants';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { IoMdLogOut } from 'react-icons/io';

const JOB_ICON = {
  Dashboard: MdLeaderboard,
  Job: MdWork,
  Work: FaNetworkWired,
  Fleet: FaCaravan,
  VehicleProfile: GiCarWheel,
  JobCategory: BiSolidCategory,
};

export default function SidebarComponent() {
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState("");
  const logoutFormRef = useRef(null);

  useEffect(() => {
    if (window.CSRF_TOKEN) {
      setCsrfToken(window.CSRF_TOKEN);
    }
  }, []);

  const handleLogoutClick = () => {
    if (logoutFormRef.current) {
      logoutFormRef.current.submit();
    }
  };

  return (
    <Sidebar aria-label="Default sidebar" className="w-full bg-gray-100">
      <SidebarItems>
        <SidebarItemGroup>
          {JOBS.map((e, index) => (
            <SidebarItem
              labelColor="red"
              key={index}
              className="cursor-pointer justify-items-start"
              onClick={() => navigate(e.path)}
              icon={JOB_ICON[e.name]}
            >
              {e.name}
            </SidebarItem>
          ))}
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem
            className="cursor-pointer"
            icon={IoMdLogOut}
            onClick={handleLogoutClick} // submit the form when sidebar item clicked
          >
            Logout
          </SidebarItem>

          {/* Hidden form */}
          <form
            ref={logoutFormRef}
            method="POST"
            action="/logout/"
            className="hidden"
          >
            <input
              type="hidden"
              name="csrfmiddlewaretoken"
              value={csrfToken}
            />
          </form>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
