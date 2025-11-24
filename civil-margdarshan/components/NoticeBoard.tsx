
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { NoticeItem } from '../types';

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await api.getNotices();
        setNotices(data);
      } catch (error) {
        console.error("Failed to fetch notices");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <section id="notice-board" className="bg-gray-50 py-10 relative">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row">
            
            {/* Left Header Panel */}
            <div className="bg-navy md:w-1/4 p-6 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-navy-light opacity-50 transform rotate-12 scale-150 pointer-events-none"></div>
               <div className="relative z-10">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                    <i className="fas fa-bullhorn text-3xl text-saffron animate-pulse"></i>
                 </div>
                 <h2 className="text-2xl font-bold mb-2">Notice Board</h2>
                 <p className="text-blue-200 text-sm">Official Updates & Announcements</p>
                 <div className="mt-6 inline-block px-4 py-1 rounded-full bg-saffron text-navy text-xs font-bold uppercase tracking-wider">
                    Live Updates
                 </div>
               </div>
            </div>

            {/* Right Content List */}
            <div className="flex-1 p-0 md:p-2 bg-white h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                   {notices.map((notice) => (
                      <li key={notice.id} className="p-4 hover:bg-blue-50 transition-colors group cursor-pointer">
                         <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                               {notice.isNew ? (
                                 <i className="fas fa-certificate text-red-500 text-sm animate-pulse"></i>
                               ) : (
                                 <i className={`fas ${notice.type === 'pdf' ? 'fa-file-pdf text-red-400' : 'fa-info-circle text-blue-400'} text-sm`}></i>
                               )}
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex justify-between items-start">
                                  <p className="text-sm font-semibold text-gray-800 group-hover:text-navy leading-snug">
                                     {notice.title}
                                  </p>
                                  {notice.isNew && (
                                     <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                        NEW
                                     </span>
                                  )}
                               </div>
                               <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center">
                                     <i className="far fa-calendar-alt mr-1.5"></i>
                                     {notice.date}
                                  </span>
                                  <span className="flex items-center text-saffron group-hover:underline">
                                     Click to view <i className="fas fa-arrow-right ml-1 text-[10px]"></i>
                                  </span>
                               </div>
                            </div>
                         </div>
                      </li>
                   ))}
                </ul>
              )}
            </div>
          </div>
       </div>
    </section>
  );
};

export default NoticeBoard;
