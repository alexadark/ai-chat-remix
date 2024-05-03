import { NavLink, Link } from "@remix-run/react";

const Header = () => {
  return (
    <header className="  py-5  border-t-2 border-t-purple-600 border-b border-border">
      <div className="container flex justify-between">
        <Link to="/">
          <h1 className="uppercase font-bold">My blog</h1>
        </Link>
        <nav>
          <ul className="flex gap-3 font-bold uppercase text-sm">
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/about/team">Team</NavLink>
            </li>
            <li>
              <NavLink to="about/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
