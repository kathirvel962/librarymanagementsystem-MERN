import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-gray-900 text-white shadow-lg z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Library Management</h1>
                                <p className="text-xs text-gray-300">Digital Library System</p>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-6">
                            <button onClick={() => navigate("/")} className="hover:text-indigo-400">
                                Home
                            </button>
                            <button onClick={() => navigate("/about")} className="hover:text-indigo-400">
                                About
                            </button>
                            <button onClick={() => navigate("/services")} className="hover:text-indigo-400">
                                Services
                            </button>
                            <button onClick={() => navigate("/books")} className="hover:text-indigo-400">
                                E-Resources
                            </button>
                            <button onClick={() => navigate("/contact")} className="hover:text-indigo-400">
                                Contact
                            </button>
                            <button onClick={() => navigate("/login-selection")} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
      <div 
        className="pt-20 min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Digital Library Management System
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-200 font-medium drop-shadow-lg">
            Gateway to Discover, Connect & Learn
          </p>
          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-12 text-gray-200 drop-shadow-md">
            Our library management system provides a comprehensive digital solution for managing books,
            tracking borrowing activities, and connecting students with knowledge. Experience modern
            library management with our intuitive and powerful platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/login-selection")} 
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold shadow-xl transition transform hover:scale-105"
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate("/signup-selection")} 
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold shadow-xl transition transform hover:scale-105"
            >
                Login
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Services</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <div className="bg-indigo-50 p-8 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Book Management</h3>
                            <p className="text-gray-600">
                                Comprehensive catalog of books with advanced search, categorization, and availability tracking.
                            </p>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="bg-purple-50 p-8 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">User Management</h3>
                            <p className="text-gray-600">
                                Separate dashboards for students and admins. Track borrowing history and manage profiles efficiently.
                            </p>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="bg-green-50 p-8 rounded-xl shadow-lg">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Borrowing System</h3>
                            <p className="text-gray-600">
                                Issue and return books seamlessly. Track due dates and automate fine calculations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">1000+</div>
                            <div className="text-xl">Books Available</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">500+</div>
                            <div className="text-xl">Active Students</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">24/7</div>
                            <div className="text-xl">Online Access</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">99%</div>
                            <div className="text-xl">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Library Management</h3>
                            <p className="text-gray-400">
                                A modern digital solution for managing your library efficiently.
                            </p>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><button onClick={() => navigate("/about")} className="hover:text-white">About Us</button></li>
                                <li><button onClick={() => navigate("/services")} className="hover:text-white">Services</button></li>
                                <li><button onClick={() => navigate("/contact")} className="hover:text-white">Contact</button></li>
                                <li><button onClick={() => navigate("/login-selection")} className="hover:text-white">Login</button></li>
                            </ul>
                        </div>
                        
                        {/* Contact */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Email: library@example.com</li>
                                <li>Phone: +1 234 567 890</li>
                                <li>Address: 123 Library St, City</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Copyright */}
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Library Management System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
