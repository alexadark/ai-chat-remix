import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5  border-t border-border  text-center">
      <div className="container">
        <p>&copy; {currentYear} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
