
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { NotificationItem } from '../types';

const NotificationTicker: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications");
      }
    };
    fetchNews();
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="bg-saffron text-navy border-b border-orange-400 overflow-hidden relative z-40 h-10 flex items-center">
       <div className="absolute left-0 bg-saffron z-10 px-3 py-2 font-bold shadow-md text-sm uppercase tracking-wider h-full flex items-center">
         <i className="fas fa-bell mr-2 animate-pulse"></i> Latest
       </div>
       <div className="animate-marquee whitespace-nowrap flex items-center w-full font-semibold text-sm">
          {notifications.map((note, index) => (
             <React.Fragment key={note.id}>
                <span className="mx-6">
                  {note.isHighlight ? (
                    <>🚨 <span className="underline decoration-navy font-bold">{note.text}</span></>
                  ) : (
                    <>📝 {note.text}</>
                  )}
                </span>
                {index < notifications.length - 1 && <span className="text-navy/50">|</span>}
             </React.Fragment>
          ))}
       </div>
    </div>
  );
}

export default NotificationTicker;
