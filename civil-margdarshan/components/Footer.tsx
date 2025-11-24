import React, { useState } from 'react';
import { config } from '../config';
import AdminDashboard from './AdminDashboard';
import Logo from './Logo';

const Footer: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-navy text-gray-300 py-16 border-t border-navy-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Brand Section */}
            <div>
              <div className="mb-6">
                <Logo className="h-14 w-14" showText={true} textSize="lg" />
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-6 pr-4">
                Dedicated to empowering students of Rajasthan with quality education, free resources, and expert guidance for all government competitive exams including RPSC, REET, and RSMSSB.
              </p>
              <div className="flex space-x-5">
                <a href={config.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-saffron transition-all transform hover:scale-110"><i className="fab fa-twitter text-xl"></i></a>
                <a href={config.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-saffron transition-all transform hover:scale-110"><i className="fab fa-facebook text-xl"></i></a>
                <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-saffron transition-all transform hover:scale-110"><i className="fab fa-instagram text-xl"></i></a>
                <a href={config.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-all transform hover:scale-110"><i className="fab fa-youtube text-xl"></i></a>
                <a href={config.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all transform hover:scale-110"><i className="fab fa-telegram text-xl"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:pl-10">
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest border-b border-navy-light pb-2 inline-block">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-saffron transition-colors flex items-center group"><i className="fas fa-chevron-right text-[10px] mr-2 text-gray-600 group-hover:text-saffron transition-colors"></i> About Us</a></li>
                <li><a href="#exams" onClick={(e) => scrollToSection(e, 'exams')} className="hover:text-saffron transition-colors flex items-center group"><i className="fas fa-chevron-right text-[10px] mr-2 text-gray-600 group-hover:text-saffron transition-colors"></i> Exam Categories</a></li>
                <li><a href="#videos" onClick={(e) => scrollToSection(e, 'videos')} className="hover:text-saffron transition-colors flex items-center group"><i className="fas fa-chevron-right text-[10px] mr-2 text-gray-600 group-hover:text-saffron transition-colors"></i> Video Lectures</a></li>
                <li><a href="#notice-board" onClick={(e) => scrollToSection(e, 'notice-board')} className="hover:text-saffron transition-colors flex items-center group"><i className="fas fa-chevron-right text-[10px] mr-2 text-gray-600 group-hover:text-saffron transition-colors"></i> Latest Notifications</a></li>
                <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-saffron transition-colors flex items-center group"><i className="fas fa-chevron-right text-[10px] mr-2 text-gray-600 group-hover:text-saffron transition-colors"></i> Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest border-b border-navy-light pb-2 inline-block">Contact Us</h3>
              <ul className="space-y-4 text-sm mb-8">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-saffron"></i>
                  <span>Gopalpura Bypass, Jaipur,<br/>Rajasthan, 302015</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-saffron"></i>
                  <a href={`mailto:${config.contactEmail}`} className="hover:text-white transition-colors">{config.contactEmail}</a>
                </li>
              </ul>
              
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Subscribe to Newsletter</h4>
                <div className="flex shadow-sm">
                  <input type="email" placeholder="Your email address" className="bg-navy-light text-white px-4 py-2.5 rounded-l-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-saffron border border-transparent focus:border-saffron placeholder-gray-500" />
                  <button type="button" onClick={() => alert('Thanks for subscribing!')} className="bg-saffron hover:bg-orange-600 text-white px-5 py-2.5 rounded-r-lg text-sm font-bold transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-navy-light pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Civil Margdarshan. All rights reserved.</p>
            <div className="flex items-center mt-4 md:mt-0 gap-6">
               <p>Made with <i className="fas fa-heart text-red-500 mx-1 animate-pulse"></i> for Students</p>
               <button 
                onClick={() => setIsAdminOpen(true)}
                className="opacity-50 hover:opacity-100 hover:text-white transition-opacity"
               >
                 <i className="fas fa-lock mr-1"></i> Admin
               </button>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Admin Modal */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </>
  );
};

export default Footer;