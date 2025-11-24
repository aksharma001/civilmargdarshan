
import React, { useState, useEffect } from 'react';
import { NoteResource } from '../types';
import { api } from '../services/api';

interface DownloadsProps {
  filter: { id: string; title: string } | null;
  onClearFilter: () => void;
}

const Downloads: React.FC<DownloadsProps> = ({ filter, onClearFilter }) => {
  const [notes, setNotes] = useState<NoteResource[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // Fetch notes based on current filter or fetch all
        const data = await api.getNotes(filter?.id);
        setNotes(data);
      } catch (error) {
        console.error("Failed to load notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [filter]); // Re-run when filter changes

  return (
    <section id="downloads" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-navy">Free PDF Notes</h2>
          <p className="mt-2 text-gray-600">Download essential study materials for offline revision.</p>
        </div>

        {filter && (
          <div className="mb-6 flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded-xl animate-fade-in-up">
            <div className="flex items-center">
               <i className="fas fa-filter text-blue-500 mr-3"></i>
               <span className="text-navy font-medium">Showing resources for: <span className="font-bold text-saffron">{filter.title}</span></span>
            </div>
            <button 
              onClick={onClearFilter}
              className="text-sm text-gray-500 hover:text-red-500 font-semibold transition-colors flex items-center"
            >
              <i className="fas fa-times mr-1"></i> Clear Filter
            </button>
          </div>
        )}

        <div className="bg-white shadow-lg overflow-hidden sm:rounded-2xl border border-gray-200 min-h-[300px] relative">
          {loading && (
             <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-saffron"></div>
             </div>
          )}

          {!loading && notes.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {notes.map((note) => (
                <li key={note.id} className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer group">
                  <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center min-w-0">
                      <div className="flex-shrink-0 h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shadow-sm border border-red-100 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                        <i className="fas fa-file-pdf text-xl"></i>
                      </div>
                      <div className="ml-4 truncate">
                        <p className="text-base font-semibold text-navy truncate group-hover:text-navy-light">{note.title}</p>
                        <p className="text-sm text-gray-500 flex items-center mt-0.5">
                          <i className="far fa-calendar-alt mr-2 text-xs"></i> {note.date}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex items-center gap-4">
                      <span className="hidden sm:inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                        {note.size}
                      </span>
                      <button className="text-navy hover:text-saffron transition-colors p-2 rounded-full hover:bg-white">
                        <i className="fas fa-download text-lg"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : !loading && (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="far fa-folder-open text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No notes found</h3>
              <p className="text-gray-500 mt-1">We haven't uploaded specific notes for {filter?.title || 'this category'} yet.</p>
              <button 
                onClick={onClearFilter}
                className="mt-4 text-saffron font-semibold hover:underline"
              >
                View all available notes
              </button>
            </div>
          )}
        </div>
        
        {!filter && !loading && notes.length > 0 && (
          <div className="mt-8 text-center">
            <button 
              type="button"
              className="text-sm text-navy font-bold hover:text-saffron transition-colors flex items-center justify-center mx-auto gap-2"
              onClick={(e) => e.preventDefault()}
            >
              View Archive <i className="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Downloads;
