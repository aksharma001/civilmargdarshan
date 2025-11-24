
import React, { useState, useEffect } from 'react';
import { VideoResource } from '../types';
import { api } from '../services/api';
import { config } from '../config';

const VideoResources: React.FC = () => {
  const [videos, setVideos] = useState<VideoResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await api.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load videos", error);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  return (
    <section id="videos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-navy">Latest Video Lectures</h2>
            <p className="mt-2 text-gray-600">Free high-quality content directly from our YouTube channel.</p>
          </div>
          <a 
            href={config.socialLinks.youtube} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 text-saffron font-semibold hover:text-orange-600 flex items-center"
          >
            View All Videos <i className="fas fa-external-link-alt ml-2"></i>
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
             <div className="w-2 h-2 bg-navy rounded-full animate-bounce mr-1"></div>
             <div className="w-2 h-2 bg-navy rounded-full animate-bounce mr-1 delay-100"></div>
             <div className="w-2 h-2 bg-navy rounded-full animate-bounce delay-200"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <a 
                key={video.id} 
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.title + " Civil Margdarshan")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group block"
              >
                <div className="relative pb-[56.25%] bg-gray-200 cursor-pointer overflow-hidden">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <i className="fas fa-play ml-1 text-lg"></i>
                    </div>
                  </div>
                  <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    20:45
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-saffron uppercase tracking-wider">{video.category}</span>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-navy-light">{video.title}</h3>
                  <div className="mt-4 flex items-center text-sm text-gray-500 justify-between">
                    <span><i className="far fa-clock mr-2"></i> 2 days ago</span>
                    <span><i className="far fa-eye mr-2"></i> 1.2k views</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoResources;
