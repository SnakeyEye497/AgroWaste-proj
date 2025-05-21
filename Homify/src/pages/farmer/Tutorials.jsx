import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar, FaComment, FaVideo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

function Tutorials() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = () => {
    const savedTutorials = JSON.parse(localStorage.getItem('tutorials') || '[]');
    setTutorials(savedTutorials);
  };

  const handleAddComment = (tutorialId) => {
    try {
      const updatedTutorials = tutorials.map(tutorial => {
        if (tutorial.id === tutorialId) {
          const newComments = [...tutorial.comments, {
            id: Date.now(),
            farmerId: currentUser.uid,
            farmerName: currentUser.displayName,
            text: newComment,
            createdAt: new Date().toISOString()
          }];
          return { ...tutorial, comments: newComments };
        }
        return tutorial;
      });

      localStorage.setItem('tutorials', JSON.stringify(updatedTutorials));
      setTutorials(updatedTutorials);
      setNewComment('');
      toast.success(t('CommentSuccess'));
    } catch (error) {
      toast.error(t('farmer.tutorials.commentError'));
    }
  };

  const handleRating = (tutorialId, rating) => {
    try {
      const updatedTutorials = tutorials.map(tutorial => {
        if (tutorial.id === tutorialId) {
          // Remove existing rating by this user
          const filteredRatings = tutorial.ratings.filter(r => r.farmerId !== currentUser.uid);
          
          // Add new rating
          const newRatings = [...filteredRatings, {
            farmerId: currentUser.uid,
            rating: rating
          }];
          
          // Calculate new average
          const averageRating = newRatings.reduce((sum, r) => sum + r.rating, 0) / newRatings.length;

          return { ...tutorial, ratings: newRatings, averageRating };
        }
        return tutorial;
      });

      localStorage.setItem('tutorials', JSON.stringify(updatedTutorials));
      setTutorials(updatedTutorials);
      setUserRating(rating);
      toast.success(t('farmer.tutorials.ratingSuccess'));
    } catch (error) {
      toast.error(t('farmer.tutorials.ratingError'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t('Watch Tutorials ')}
      </h1>

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

              {/* Rating Section */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${
                        star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      onClick={() => handleRating(tutorial.id, star)}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({tutorial.ratings.length} ratings)
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Average: {tutorial.averageRating.toFixed(1)}
                </p>
              </div>

              {/* Video Link */}
              <a
                href={tutorial.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
              >
                <FaVideo className="mr-2" />
                {t('WatchVideo')}
              </a>

              {/* Comments Section */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2">{t('Comments')}</h4>
                <div className="space-y-2 mb-4">
                  {tutorial.comments.map((comment, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      <p className="font-medium">{comment.farmerName}</p>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('farmer.tutorials.addComment')}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <button
                    onClick={() => handleAddComment(tutorial.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <FaComment />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tutorials; 