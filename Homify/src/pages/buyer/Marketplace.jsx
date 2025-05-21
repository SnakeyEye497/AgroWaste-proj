// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaFilter, FaSearch, FaMapMarkerAlt, FaLeaf, FaRupeeSign, FaSort, FaShoppingCart, FaTimes } from 'react-icons/fa';
// import api from '../../services/api';
// import { toast } from 'react-toastify';
// import { useAuth } from '../../contexts/AuthContext';

// function Marketplace() {
//   const { t } = useTranslation();
//   const { currentUser } = useAuth();
//   const [wasteItems, setWasteItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     location: '',
//     wasteType: '',
//     minPrice: '',
//     maxPrice: '',
//   });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortOption, setSortOption] = useState('newest');
  
//   // Order modal state
//   const [showOrderModal, setShowOrderModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [orderQuantity, setOrderQuantity] = useState(1);
//   const [orderNotes, setOrderNotes] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   useEffect(() => {
//     fetchWasteListings();
//   }, []);

//   const fetchWasteListings = () => {
//     setIsLoading(true);
//     try {
//       // Get farmer listings from localStorage
//       const farmerWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
      
//       // Map the waste data to match the marketplace structure
//       const formattedWastes = farmerWastes.map(waste => ({
//         id: waste.id,
//         wasteType: waste.type, // Match the field names
//         description: waste.description,
//         quantity: waste.quantity,
//         unit: waste.unit,
//         price: waste.price,
//         location: waste.location,
//         farmerId: waste.farmerId,
//         farmerName: waste.farmerName,
//         createdAt: waste.createdAt,
//         availableFrom: waste.availableFrom,
//         images: ['/default-waste-image.jpg'], // Add a default image
//         status: waste.status
//       }));

//       setWasteItems(formattedWastes);
//     } catch (error) {
//       console.error('Error fetching waste listings:', error);
//       toast.error(t('marketplace.errorFetchingListings'));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   const resetFilters = () => {
//     setFilters({
//       location: '',
//       wasteType: '',
//       minPrice: '',
//       maxPrice: '',
//     });
//     setSearchQuery('');
//     setSortOption('newest');
//   };

//   const applyFilters = () => {
//     // This would normally send the filters to the API
//     // For demo, we'll just close the filter panel
//     setShowFilters(false);
//   };

//   // Filter and sort the waste items
//   const filteredWasteItems = wasteItems
//     .filter((item) => {
//       // Search query filter
//       if (searchQuery && !item.wasteType?.toLowerCase().includes(searchQuery.toLowerCase()) && 
//           !item.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
//           !item.location?.toLowerCase().includes(searchQuery.toLowerCase())) {
//         return false;
//       }
      
//       // Location filter
//       if (filters.location && item.location !== filters.location) {
//         return false;
//       }
      
//       // Waste type filter
//       if (filters.wasteType && item.wasteType !== filters.wasteType) {
//         return false;
//       }
      
//       // Price range filter
//       if (filters.minPrice && item.price < parseFloat(filters.minPrice)) {
//         return false;
//       }
      
//       if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) {
//         return false;
//       }
      
//       return true;
//     })
//     .sort((a, b) => {
//       // Sort options
//       switch (sortOption) {
//         case 'newest':
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         case 'oldest':
//           return new Date(a.createdAt) - new Date(b.createdAt);
//         case 'priceLowToHigh':
//           return a.price - b.price;
//         case 'priceHighToLow':
//           return b.price - a.price;
//         default:
//           return 0;
//       }
//     });

//   // Get unique locations and waste types for filter options
//   const locations = [...new Set(wasteItems.map((item) => item.location))];
//   const wasteTypes = [...new Set(wasteItems.map((item) => item.wasteType))];

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const handlePlaceOrder = (item) => {
//     setSelectedItem(item);
//     setOrderQuantity(1);
//     setOrderNotes('');
//     setOrderSuccess(false);
//     setShowOrderModal(true);
//   };

//   const handleOrderSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       // In a real app, this would call an API endpoint
//       // For demo, we'll simulate a successful order
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const orderData = {
//         wasteId: selectedItem.id,
//         farmerId: selectedItem.farmerId,
//         quantity: orderQuantity,
//         totalAmount: selectedItem.price * orderQuantity,
//         notes: orderNotes,
//         status: 'pending',
//         orderDate: new Date().toISOString()
//       };
      
//       console.log('Order placed:', orderData);
//       setOrderSuccess(true);
      
//       // In a real app, you would refresh the waste items or mark this item as ordered
//     } catch (error) {
//       console.error('Error placing order:', error);
//       toast.error(t('marketplace.errorPlacingOrder'));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeOrderModal = () => {
//     if (!isSubmitting) {
//       setShowOrderModal(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">{t('marketplace.title')}</h1>
        
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50"
//           >
//             <FaFilter className="mr-2" />
//             {t('marketplace.filters')}
//           </button>
//         </div>
//       </div>
      
//       {/* Search and filter bar */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
//           <div className="relative flex-1 mb-4 md:mb-0">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               placeholder={t('marketplace.searchPlaceholder')}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="flex space-x-2">
//             <button
//               onClick={toggleFilters}
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
//             >
//               <FaFilter className="mr-2" />
//               {t('marketplace.filters')}
//             </button>
            
//             <div className="relative">
//               <select
//                 value={sortOption}
//                 onChange={handleSortChange}
//                 className="appearance-none px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               >
//                 <option value="newest">{t('marketplace.sortNewest')}</option>
//                 <option value="oldest">{t('marketplace.sortOldest')}</option>
//                 <option value="priceLowToHigh">{t('marketplace.sortPriceLowToHigh')}</option>
//                 <option value="priceHighToLow">{t('marketplace.sortPriceHighToLow')}</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <FaSort />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Filter panel */}
//         {showFilters && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mt-4 pt-4 border-t border-gray-200"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {t('marketplace.location')}
//                 </label>
//                 <select
//                   name="location"
//                   value={filters.location}
//                   onChange={handleFilterChange}
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="">{t('marketplace.allLocations')}</option>
//                   {locations.map((location) => (
//                     <option key={location} value={location}>
//                       {location}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {t('marketplace.wasteType')}
//                 </label>
//                 <select
//                   name="wasteType"
//                   value={filters.wasteType}
//                   onChange={handleFilterChange}
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="">{t('marketplace.allWasteTypes')}</option>
//                   {wasteTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {t('marketplace.minPrice')}
//                 </label>
//                 <input
//                   type="number"
//                   name="minPrice"
//                   value={filters.minPrice}
//                   onChange={handleFilterChange}
//                   min="0"
//                   step="0.1"
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   {t('marketplace.maxPrice')}
//                 </label>
//                 <input
//                   type="number"
//                   name="maxPrice"
//                   value={filters.maxPrice}
//                   onChange={handleFilterChange}
//                   min="0"
//                   step="0.1"
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
            
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 onClick={resetFilters}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//               >
//                 {t('marketplace.resetFilters')}
//               </button>
//               <button
//                 onClick={applyFilters}
//                 className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//               >
//                 {t('marketplace.applyFilters')}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>
      
//       {/* Results */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//         </div>
//       ) : filteredWasteItems.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredWasteItems.map((item) => (
//             <motion.div
//               key={item.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//               whileHover={{ y: -5 }}
//             >
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.wasteType}</h2>
//                 <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                
//                 <div className="flex items-center text-gray-700 mb-2">
//                   <FaMapMarkerAlt className="mr-2 text-green-600" />
//                   <span>{item.location}</span>
//                 </div>
                
//                 <div className="flex items-center text-gray-700 mb-2">
//                   <FaRupeeSign className="mr-2 text-green-600" />
//                   <span className="font-semibold">{item.price}</span>
//                   <span className="ml-1">per {item.unit}</span>
//                 </div>

//                 <div className="text-gray-700 mb-4">
//                   <span className="font-medium">Quantity Available: </span>
//                   {item.quantity} {item.unit}
//                 </div>
                
//                 <div className="flex space-x-2">
//                   <button 
//                     className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                     onClick={() => handlePlaceOrder(item)}
//                   >
//                     {t('marketplace.placeOrder')}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
//           <FaLeaf className="text-gray-400 text-5xl mb-4" />
//           <p className="text-gray-600 text-lg">{t('marketplace.noResults')}</p>
//         </div>
//       )}
      
//       {/* Order Modal */}
//       <AnimatePresence>
//         {showOrderModal && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-xl max-w-md w-full"
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//             >
//               <div className="flex justify-between items-center border-b p-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   {orderSuccess ? t('marketplace.orderSuccess') : t('marketplace.placeOrder')}
//                 </h3>
//                 <button
//                   onClick={closeOrderModal}
//                   className="text-gray-400 hover:text-gray-500"
//                   disabled={isSubmitting}
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
              
//               {orderSuccess ? (
//                 <div className="p-6">
//                   <div className="flex flex-col items-center justify-center py-4">
//                     <div className="bg-green-100 text-green-700 rounded-full p-3 mb-4">
//                       <FaShoppingCart className="text-3xl" />
//                     </div>
//                     <h4 className="text-xl font-medium text-gray-900 mb-2">
//                       {t('marketplace.orderPlaced')}
//                     </h4>
//                     <p className="text-gray-600 text-center mb-6">
//                       {t('marketplace.orderSuccessMessage')}
//                     </p>
//                     <button
//                       onClick={closeOrderModal}
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                     >
//                       {t('common.close')}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <form onSubmit={handleOrderSubmit} className="p-6">
//                   <div className="mb-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-gray-700 font-medium">{selectedItem?.wasteType}</span>
//                       <span className="text-green-600 font-medium">
//                         ₹{selectedItem?.price} / {selectedItem?.unit}
//                       </span>
//                     </div>
                    
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-medium mb-2">
//                         {t('marketplace.orderQuantity')}
//                       </label>
//                       <div className="flex items-center">
//                         <input
//                           type="number"
//                           min="1"
//                           max={selectedItem?.quantity}
//                           value={orderQuantity}
//                           onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                           required
//                         />
//                         <span className="ml-2 text-gray-600">{selectedItem?.unit}</span>
//                       </div>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {t('marketplace.maxAvailable')}: {selectedItem?.quantity} {selectedItem?.unit}
//                       </p>
//                     </div>
                    
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-medium mb-2">
//                         {t('marketplace.totalPrice')}
//                       </label>
//                       <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 font-medium">
//                         ₹{(selectedItem?.price * orderQuantity).toFixed(2)}
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="block text-gray-700 text-sm font-medium mb-2">
//                         {t('marketplace.orderNotes')}
//                       </label>
//                       <textarea
//                         value={orderNotes}
//                         onChange={(e) => setOrderNotes(e.target.value)}
//                         rows="3"
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                         placeholder={t('marketplace.orderNotesPlaceholder')}
//                       ></textarea>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={closeOrderModal}
//                       className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                       disabled={isSubmitting}
//                     >
//                       {t('common.cancel')}
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           {t('marketplace.processing')}
//                         </>
//                       ) : (
//                         t('marketplace.confirmOrder')
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Marketplace; 


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaSearch, FaMapMarkerAlt, FaLeaf, FaRupeeSign, FaSort, FaShoppingCart, FaTimes } from 'react-icons/fa';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

function Marketplace() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [wasteItems, setWasteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    wasteType: '',
    minPrice: '',
    maxPrice: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  
  // Order modal state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchWasteListings();
  }, []);

  const fetchWasteListings = () => {
    setIsLoading(true);
    try {
      // Get farmer listings from localStorage
      const farmerWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
      
      // Map the waste data to match the marketplace structure
      const formattedWastes = farmerWastes.map(waste => ({
        id: waste.id,
        wasteType: waste.type, // Match the field names
        description: waste.description,
        quantity: waste.quantity,
        unit: waste.unit,
        price: waste.price,
        location: waste.location,
        farmerId: waste.farmerId,
        farmerName: waste.farmerName,
        createdAt: waste.createdAt,
        availableFrom: waste.availableFrom,
        images: ['/default-waste-image.jpg'], // Add a default image
        status: waste.status
      }));

      setWasteItems(formattedWastes);
    } catch (error) {
      console.error('Error fetching waste listings:', error);
      toast.error(t('marketplace.errorFetchingListings'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      wasteType: '',
      minPrice: '',
      maxPrice: '',
    });
    setSearchQuery('');
    setSortOption('newest');
  };

  const applyFilters = () => {
    // This would normally send the filters to the API
    // For demo, we'll just close the filter panel
    setShowFilters(false);
  };

  // Filter and sort the waste items
  const filteredWasteItems = wasteItems
    .filter((item) => {
      // Search query filter
      if (searchQuery && !item.wasteType?.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.location?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Location filter
      if (filters.location && item.location !== filters.location) {
        return false;
      }
      
      // Waste type filter
      if (filters.wasteType && item.wasteType !== filters.wasteType) {
        return false;
      }
      
      // Price range filter
      if (filters.minPrice && item.price < parseFloat(filters.minPrice)) {
        return false;
      }
      
      if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort options
      switch (sortOption) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priceLowToHigh':
          return a.price - b.price;
        case 'priceHighToLow':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Get unique locations and waste types for filter options
  const locations = [...new Set(wasteItems.map((item) => item.location))];
  const wasteTypes = [...new Set(wasteItems.map((item) => item.wasteType))];

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePlaceOrder = (item) => {
    setSelectedItem(item);
    setOrderQuantity(1);
    setOrderNotes('');
    setOrderSuccess(false);
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      // For demo, we'll simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const orderData = {
        wasteId: selectedItem.id,
        farmerId: selectedItem.farmerId,
        quantity: orderQuantity,
        totalAmount: selectedItem.price * orderQuantity,
        notes: orderNotes,
        status: 'pending',
        orderDate: new Date().toISOString()
      };
      
      console.log('Order placed:', orderData);
      setOrderSuccess(true);
      
      // In a real app, you would refresh the waste items or mark this item as ordered
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(t('marketplace.errorPlacingOrder'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeOrderModal = () => {
    if (!isSubmitting) {
      setShowOrderModal(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('marketplace.title')}</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50"
          >
            <FaFilter className="mr-2" />
            {t('marketplace.filters')}
          </button>
        </div>
      </div>
      
      {/* Search and filter bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t('marketplace.searchPlaceholder')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={toggleFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center"
            >
              <FaFilter className="mr-2" />
              {t('marketplace.filters')}
            </button>
            
            <div className="relative">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="newest">{t('marketplace.sortNewest')}</option>
                <option value="oldest">{t('marketplace.sortOldest')}</option>
                <option value="priceLowToHigh">{t('marketplace.sortPriceLowToHigh')}</option>
                <option value="priceHighToLow">{t('marketplace.sortPriceHighToLow')}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaSort />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('marketplace.location')}
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t('marketplace.allLocations')}</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('marketplace.wasteType')}
                </label>
                <select
                  name="wasteType"
                  value={filters.wasteType}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t('marketplace.allWasteTypes')}</option>
                  {wasteTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('marketplace.minPrice')}
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  min="0"
                  step="0.1"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('marketplace.maxPrice')}
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  min="0"
                  step="0.1"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                {t('marketplace.resetFilters')}
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {t('marketplace.applyFilters')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredWasteItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWasteItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.wasteType}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center text-gray-700 mb-2">
                  <FaMapMarkerAlt className="mr-2 text-green-600" />
                  <span>{item.location}</span>
                </div>
                
                <div className="flex items-center text-gray-700 mb-2">
                  <FaRupeeSign className="mr-2 text-green-600" />
                  <span className="font-semibold">{item.price}</span>
                  <span className="ml-1">per {item.unit}</span>
                </div>

                <div className="text-gray-700 mb-4">
                  <span className="font-medium">Quantity Available: </span>
                  {item.quantity} {item.unit}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => handlePlaceOrder(item)}
                  >
                    {t('marketplace.placeOrder')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
          <FaLeaf className="text-gray-400 text-5xl mb-4" />
          <p className="text-gray-600 text-lg">{t('marketplace.noResults')}</p>
        </div>
      )}
      
      {/* Order Modal */}
      <AnimatePresence>
        {showOrderModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {orderSuccess ? t('marketplace.orderSuccess') : t('marketplace.placeOrder')}
                </h3>
                <button
                  onClick={closeOrderModal}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isSubmitting}
                >
                  <FaTimes />
                </button>
              </div>
              
              {orderSuccess ? (
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="bg-green-100 text-green-700 rounded-full p-3 mb-4">
                      <FaShoppingCart className="text-3xl" />
                    </div>
                    <h4 className="text-xl font-medium text-gray-900 mb-2">
                      {t('marketplace.orderPlaced')}
                    </h4>
                    <p className="text-gray-600 text-center mb-6">
                      {t('marketplace.orderSuccessMessage')}
                    </p>
                    <button
                      onClick={closeOrderModal}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      {t('common.close')}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700 font-medium">{selectedItem?.wasteType}</span>
                      <span className="text-green-600 font-medium">
                        ₹{selectedItem?.price} / {selectedItem?.unit}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        {t('marketplace.orderQuantity')}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="1"
                          max={selectedItem?.quantity}
                          value={orderQuantity}
                          onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <span className="ml-2 text-gray-600">{selectedItem?.unit}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {t('marketplace.maxAvailable')}: {selectedItem?.quantity} {selectedItem?.unit}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        {t('marketplace.totalPrice')}
                      </label>
                      <div className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 font-medium">
                        ₹{(selectedItem?.price * orderQuantity).toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        {t('marketplace.orderNotes')}
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows="3"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={t('marketplace.orderNotesPlaceholder')}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeOrderModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      disabled={isSubmitting}
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('marketplace.processing')}
                        </>
                      ) : (
                        t('marketplace.confirmOrder')
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Marketplace; 