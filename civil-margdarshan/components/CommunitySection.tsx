
import React from 'react';
import { config } from '../config';

const CommunitySection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "RAS Aspirant",
      content: "The daily PDF notes on Telegram are a lifesaver. Concise, accurate, and perfect for last-minute revision.",
      initial: "P",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Selected in REET L2",
      content: "Civil Margdarshan's community helped me stay motivated. The quiz polls kept my preparation on track.",
      initial: "R",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      name: "Amit Verma",
      role: "Police Constable",
      content: "Best platform for Rajasthan GK. The video lectures and the community support are unmatched.",
      initial: "A",
      color: "bg-blue-100 text-blue-600"
    }
  ];

  return (
    <section id="community" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Telegram CTA Banner */}
        <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden mb-20">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-saffron opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white mb-6 shadow-lg shadow-blue-500/30">
              <i className="fab fa-telegram-plane text-3xl transform -translate-x-0.5 translate-y-0.5"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the <span className="text-saffron">Student Community</span>
            </h2>
            <p className="text-blue-100 text-lg mb-2 max-w-xl">
              Don't miss out on daily quizzes, instant exam updates, and exclusive PDF notes delivered directly to your phone.
            </p>
            <p className="text-sm text-gray-400">
              <i className="fas fa-users mr-2"></i> Join 50,000+ aspirants preparing together
            </p>
          </div>

          <div className="flex-shrink-0 relative z-10">
            <a 
              href={config.socialLinks.telegram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-white text-blue-600 hover:bg-saffron hover:text-white transition-all transform hover:scale-105 shadow-xl group"
            >
              <i className="fab fa-telegram mr-3 text-2xl group-hover:animate-pulse"></i>
              Join Telegram Channel
            </a>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-navy">What our Students Say</h3>
          <div className="w-16 h-1 bg-saffron mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100 relative">
              <div className="absolute top-6 right-8 text-gray-200 text-6xl font-serif">"</div>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${testimonial.color} mr-4`}>
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-bold text-navy">{testimonial.name}</h4>
                  <span className="text-xs font-semibold text-saffron uppercase tracking-wide">{testimonial.role}</span>
                </div>
              </div>
              <p className="text-gray-600 italic relative z-10">
                {testimonial.content}
              </p>
              <div className="mt-4 flex text-yellow-400 text-xs">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CommunitySection;
