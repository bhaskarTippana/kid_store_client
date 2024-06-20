import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#176b8757] mt-3 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10">
          <div className="hidden md:block text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden md:block text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Toys
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Clothing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          <div className=" text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Follow Us
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                   target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                   target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bhaskarTippana"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                target="_blank"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden md:block text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Subscribe
            </h3>
            <p className="text-gray-600 mb-3">
              Join our newsletter for exclusive updates
            </p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white border border-gray-300 rounded-l-md py-2 px-4 mb-2 sm:mb-0 sm:mr-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md py-2 px-4 transition-colors duration-200 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500">
            © 2024 KidsStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
