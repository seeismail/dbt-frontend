import React from 'react';
import { Link } from 'react-router-dom';
import { sidebarRoutes } from '../routes/index';

function Sidebar() {
  return (
    <nav id="sidebar">
      <div className="p-4 pt-5">
        <a
          href="#"
          className="img logo rounded-circle mb-5"
          styles={{
            backgroundImage: 'background-image: url(images/logo.jpg)',
          }}
        >
          Click Here
        </a>
        <ul className="list-unstyled components mb-5">
          {sidebarRoutes.map(function (route) {
            if (!route.component)
              return (
                <li key={`dropdown-title-${route.title}`}>
                  <a
                    href={`#dropdown-${route.title}`}
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    {route.title}
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id={`dropdown-${route.title}`}
                  >
                    {route.routes.map((r) => (
                      <li key={`multi-route-${r.path}`}>
                        <Link to={r.path}>{r.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );

            return (
              <li key={`sidebar-route-${route.title}`}>
                <Link to={route.path}>{route.title}</Link>
              </li>
            );
          })}
        </ul>

        <div className="footer">
          <p>Muhammad Ismail </p>
          <p>4079-FBAS/BSCS/F18-A</p>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
