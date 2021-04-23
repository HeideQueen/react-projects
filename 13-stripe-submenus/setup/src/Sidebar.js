import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from './context';
import sublinks from './data';

const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useGlobalContext();

  return (
    <aside
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <div className='sidebar'>
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className='sidebar-links'>
          {sublinks.map((link, index) => {
            const { links, page } = link;
            return (
              <article key={index}>
                <h4>{page}</h4>
                <article className='sidebar-sublinks'>
                  {links.map((link, index) => {
                    const { url, icon, label } = link;
                    return (
                      <a href={url} key={index}>
                        {icon} {label}
                      </a>
                    );
                  })}
                </article>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
