import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} Hecho por [Experiencias Tech]
        </p>
      </div>
    </footer>
  );
};

export default Footer;
