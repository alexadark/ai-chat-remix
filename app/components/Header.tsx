import { Link } from "@remix-run/react";

const Header = () => {
  return (
    <header className="fixed top-0 z-40 flex-none w-full py-5 border-b border-border backdrop-filter backdrop-blur-lg bg-transparent">
      <div className="container flex justify-between">
        <Link to="/">
          <h1 className="uppercase font-bold">Remix AI</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
