import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="flex text-[0.7rem] flex-col bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Link 
            to="https://github.com/francisnicholasramos"
            target="_blank"
            rel="noopener noreferer"
            className="flex items-center justify-center text-gray-500 gap-2 cursor-pointer hover:text-gray-900">
            <FaGithub className="text-sm" />
            Developed by Francis Nicholas Ramos
        </Link>
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center space-x-4 md:mb-0">
            <span className="text-gray-500">
              © {new Date().getFullYear()} <b className="text-gray-700">Crafts of Expression.  </b>
                All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
