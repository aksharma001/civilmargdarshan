
import React, { useState } from 'react';
import { config } from '../config';
import { api } from '../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'notifications' | 'notes' | 'videos'>('notifications');

  // Form States
  const [notificationText, setNotificationText] = useState('');
  const [isHighlight, setIsHighlight] = useState(false);
  
  const [noteTitle, setNoteTitle] = useState('');
  const [noteCategory, setNoteCategory] = useState('1'); // Default to first category
  const [noteSize, setNoteSize] = useState('1.5 MB');

  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('History');
  const [videoUrl, setVideoUrl] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === config.adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Password');
    }
  };

  const handleSubmitNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addNotification({
      id: Date.now().toString(),
      text: notificationText,
      isHighlight
    });
    setNotificationText('');
    alert('Notification Added!');
  };

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addNote({
      id: Date.now().toString(),
      title: noteTitle,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      size: noteSize,
      categoryId: noteCategory
    });
    setNoteTitle('');
    alert('Note Added!');
  };

  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock thumbnail generation
    const mockThumb = 'https://picsum.photos/600/340'; 
    await api.addVideo({
      id: Date.now().toString(),
      title: videoTitle,
      category: videoCategory,
      thumbnailUrl: mockThumb
    });
    setVideoTitle('');
    alert('Video Added!');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
        
        <div className="bg-navy p-4 flex justify-between items-center text-white">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-tools"></i> Admin Dashboard
          </h3>
          <button onClick={onClose} className="hover:text-red-400 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto py-10">
              <div className="text-center mb-4">
                <i className="fas fa-lock text-4xl text-navy mb-2"></i>
                <p className="text-gray-500">Enter password to manage content</p>
                <p className="text-xs text-gray-400 mt-1">(Hint: use 'admin')</p>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:outline-none"
              />
              <button type="submit" className="bg-saffron text-navy font-bold py-2 rounded-lg hover:bg-orange-500 transition-colors">
                Login
              </button>
            </form>
          ) : (
            <div>
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'notifications' ? 'text-navy border-b-2 border-navy' : 'text-gray-500 hover:text-navy'}`}
                >
                  Ticker News
                </button>
                <button 
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'notes' ? 'text-navy border-b-2 border-navy' : 'text-gray-500 hover:text-navy'}`}
                >
                  Upload Notes
                </button>
                <button 
                  onClick={() => setActiveTab('videos')}
                  className={`px-4 py-2 font-medium text-sm ${activeTab === 'videos' ? 'text-navy border-b-2 border-navy' : 'text-gray-500 hover:text-navy'}`}
                >
                  Add Video
                </button>
              </div>

              {/* Notifications Form */}
              {activeTab === 'notifications' && (
                <form onSubmit={handleSubmitNotification} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ticker Text</label>
                    <input 
                      type="text" 
                      required
                      value={notificationText}
                      onChange={(e) => setNotificationText(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-navy focus:border-navy"
                      placeholder="e.g., RPSC Admit Cards Released"
                    />
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="highlight"
                      checked={isHighlight}
                      onChange={(e) => setIsHighlight(e.target.checked)}
                      className="h-4 w-4 text-navy border-gray-300 rounded"
                    />
                    <label htmlFor="highlight" className="ml-2 block text-sm text-gray-900">
                      Highlight (Bold/Red)
                    </label>
                  </div>
                  <button type="submit" className="w-full bg-navy text-white py-2 rounded-md hover:bg-navy-light">
                    Add to Ticker
                  </button>
                </form>
              )}

              {/* Notes Form */}
              {activeTab === 'notes' && (
                <form onSubmit={handleSubmitNote} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Note Title</label>
                    <input 
                      type="text" 
                      required
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-navy focus:border-navy"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category ID</label>
                      <select 
                        value={noteCategory}
                        onChange={(e) => setNoteCategory(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      >
                        <option value="1">RPSC RAS</option>
                        <option value="2">Police</option>
                        <option value="3">REET</option>
                        <option value="4">Patwari</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Size (e.g. 2MB)</label>
                      <input 
                        type="text" 
                        value={noteSize}
                        onChange={(e) => setNoteSize(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-navy text-white py-2 rounded-md hover:bg-navy-light">
                    Upload Note
                  </button>
                </form>
              )}

              {/* Videos Form */}
              {activeTab === 'videos' && (
                <form onSubmit={handleSubmitVideo} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Video Title</label>
                    <input 
                      type="text" 
                      required
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input 
                      type="text" 
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="History, Polity, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
                    <input 
                      type="text" 
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <button type="submit" className="w-full bg-navy text-white py-2 rounded-md hover:bg-navy-light">
                    Add Video
                  </button>
                </form>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
