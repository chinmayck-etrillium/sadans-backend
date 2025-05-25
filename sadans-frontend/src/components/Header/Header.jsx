import { Link } from "react-router-dom";

export default function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleLogout,
}) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                CrediLedger
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/get-transaction" className="nav-link">
                Transactions
              </Link>
              <Link to="/new-transaction" className="nav-link">
                New Transaction
              </Link>
              <Link to="/delete-transaction" className="nav-link">
                Delete Transaction
              </Link>
              <Link to="/add-client" className="nav-link">
                Add Client
              </Link>
              <Link to="/complete-client-details" className="nav-link">
                Client Info
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logout button */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/get-transaction"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Transactions
          </Link>
          <Link
            to="/new-transaction"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            New Transaction
          </Link>
          <Link
            to="/delete-transaction"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Delete Transaction
          </Link>
          <Link
            to="/add-client"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add Client
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left mobile-nav-link text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
