import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaVideo, FaStar, FaComment, FaTrash, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ManageTutorials() {
  const { t } = useTranslation();
  const [tutorials, setTutorials] = useState([]);
  const [newTutorial, setNewTutorial] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    category: 'waste-management'
  });
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = () => {
    const savedTutorials = JSON.parse(localStorage.getItem('tutorials') || '[]');
    setTutorials(savedTutorials);
  };

  const handleAddTutorial = (e) => {
    e.preventDefault();
    try {
      const tutorial = {
        id: `tutorial_${Date.now()}`,
        ...newTutorial,
        createdAt: new Date().toISOString(),
        ratings: [],
        comments: [],
        averageRating: 0
      };

      const updatedTutorials = [...tutorials, tutorial];
      localStorage.setItem('tutorials', JSON.stringify(updatedTutorials));
      setTutorials(updatedTutorials);
      setShowAddModal(false);
      setNewTutorial({
        title: '',
        description: '',
        videoUrl: '',
        thumbnailUrl: '',
        category: 'waste-management'
      });
      toast.success(t('admin.tutorials.addSuccess'));
    } catch (error) {
      toast.error(t('admin.tutorials.addError'));
    }
  };

  const handleDeleteTutorial = (tutorialId) => {
    try {
      const updatedTutorials = tutorials.filter(t => t.id !== tutorialId);
      localStorage.setItem('tutorials', JSON.stringify(updatedTutorials));
      setTutorials(updatedTutorials);
      toast.success(t('Delete Success'));
    } catch (error) {
      toast.error(t('DeleteError'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('Add Tutorials ')}
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaUpload />
          {t('Add New')}
        </button>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {tutorial.thumbnailUrl && (
              <img
                src={tutorial.thumbnailUrl}
                alt={tutorial.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm">
                    {tutorial.averageRating.toFixed(1)} ({tutorial.ratings.length})
                  </span>
                </div>
                <div className="flex items-center">
                  <FaComment className="text-blue-500 mr-1" />
                  <span className="text-sm">{tutorial.comments.length}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <a
                  href={tutorial.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <FaVideo className="mr-1" />
                  {t('Watch Video')}
                </a>
                <button
                  onClick={() => handleDeleteTutorial(tutorial.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            {tutorial.comments.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <h4 className="font-medium mb-2">{t('RecentComments')}</h4>
                <div className="space-y-2">
                  {tutorial.comments.slice(0, 3).map((comment, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      <p className="font-medium">{comment.farmerName}</p>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Tutorial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{t('Add New Tutorial')}</h2>
            <form onSubmit={handleAddTutorial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('Tutorials Title')}
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newTutorial.title}
                  onChange={(e) => setNewTutorial({...newTutorial, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('Tutorials description')}
                </label>
                <textarea
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows="3"
                  value={newTutorial.description}
                  onChange={(e) => setNewTutorial({...newTutorial, description: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t(' Uplode Tutorial videoUrl')}
                </label>
                <input
                  type="url"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newTutorial.videoUrl}
                  onChange={(e) => setNewTutorial({...newTutorial, videoUrl: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('Uplode thumbnail Url')}
                </label>
                <input
                  type="url"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newTutorial.thumbnailUrl}
                  onChange={(e) => setNewTutorial({...newTutorial, thumbnailUrl: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('Tutorials category')}
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newTutorial.category}
                  onChange={(e) => setNewTutorial({...newTutorial, category: e.target.value})}
                >
                  <option value="waste-management">Waste Management</option>
                  <option value="composting">Composting</option>
                  <option value="recycling">Recycling</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {t('Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  {t('Add Tutorial')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTutorials; 