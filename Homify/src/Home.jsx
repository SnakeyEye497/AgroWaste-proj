import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-green-700 bg-opacity-90 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">AgriWaste Connect</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-green-200 transition duration-300">HOME</a>
            <a href="#about" className="hover:text-green-200 transition duration-300">ABOUT</a>
            <a href="#services" className="hover:text-green-200 transition duration-300">SERVICES</a>
            <a href="#contact" className="hover:text-green-200 transition duration-300">CONTACT US</a>
          </div>
          <div>
            <Link to="/login" className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-100 transition duration-300">LOGIN</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Connecting Agricultural Waste to Value</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Transform agricultural waste into valuable resources. Join our platform to buy, sell, or exchange crop residues and agricultural byproducts.</p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
                <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 text-lg">Get Started</Link>
                <a href="#learn-more" className="bg-transparent border-2 border-white hover:bg-white hover:text-green-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 text-lg">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose AgriWaste Connect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">Sustainable Solutions</h3>
              <p className="text-gray-600 text-center">Convert agricultural waste into valuable resources, reducing environmental impact and creating economic opportunities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">Connect Communities</h3>
              <p className="text-gray-600 text-center">Connect farmers with industries and recyclers to create a circular economy around agricultural byproducts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">Economic Benefits</h3>
              <p className="text-gray-600 text-center">Create additional income sources for farmers while helping industries source raw materials at competitive prices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-green-700">For Farmers</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>List your agricultural waste for sale</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Connect with potential buyers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Learn about sustainable waste management practices</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-green-700">For Industries</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Source agricultural byproducts for production</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Find reliable suppliers for your needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Reduce your carbon footprint with sustainable sourcing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="learn-more" className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Agricultural Waste?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">Join our platform today and be part of the solution. Whether you're a farmer looking to sell waste or a business seeking sustainable materials.</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/register" className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-green-100 transition duration-300 text-lg">Sign Up Now</Link>
            <Link to="/login" className="bg-transparent border-2 border-white hover:bg-white hover:text-green-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 text-lg">Login</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
                <p className="mb-6 text-gray-600">Have questions about our platform? Contact us and we'll get back to you as soon as possible.</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">123 Agri Lane, Green City, Country</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">info@agriwasteconnect.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">+1 234 567 8900</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-green-50">
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">Name</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="text" id="name" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="email" id="email" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">Message</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" id="message" rows="4"></textarea>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 w-full" type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AgriWaste Connect</h3>
              <p className="text-gray-400">Connecting agricultural waste to value, creating sustainable solutions for farmers and industries.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Services</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Waste Listing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Buyer Connect</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Knowledge Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Marketplace</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm6.798 4.512c1.143 1.359 1.843 3.1 1.879 4.992-1.028-.177-2.291-.324-3.377-.324-.253 0-.508.012-.75.025 0-.063-.013-.123-.013-.184 0-1.507.468-3.212 2.261-4.509zm-3.26 1.91c-.253.482-.456 1.028-.594 1.62-.76-.101-1.379-.152-1.945-.152s-1.186.051-1.945.152c-.139-.592-.342-1.138-.595-1.62.696-.304 1.611-.505 2.54-.505.927 0 1.842.201 2.539.505zm-6.364-1.91c1.793 1.297 2.261 3.002 2.261 4.51 0 .062-.012.122-.012.184-.253-.013-.508-.025-.762-.025-1.086 0-2.348.147-3.376.324.036-1.893.736-3.635 1.889-4.993zm-2.54 9.477c-.595-1.036-.927-2.212-.927-3.483 0-.278.025-.544.05-.81 1.149-.187 2.727-.403 4.352-.403.279 0 .57.013.849.025-.088 3.735-2.068 5.521-4.324 4.671zm5.37 4.011c-1.034 0-1.83-.392-2.387-1.086 2.433-1.073 3.84-3.382 3.89-6.551.355.05.723.075 1.097.075.471 0 .953-.05 1.43-.125.076 3.312-1.716 7.687-4.03 7.687zm6.868-4.011c-2.257.85-4.236-.936-4.325-4.671.278-.012.57-.025.85-.025 1.62 0 3.199.216 4.35.403.025.266.051.532.051.81 0 1.271-.329 2.447-.926 3.483z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AgriWaste Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;