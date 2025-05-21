// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import api from '../../services/api';
// import { FaFilter, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaLeaf, FaRupeeSign, FaShoppingCart, FaTimes, FaCheck } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';
// import { useAuth } from '../../contexts/AuthContext';

// function BrowseWaste() {
//   const { t } = useTranslation();
//   const [wasteListings, setWasteListings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     wasteType: 'all',
//     location: 'all',
//     priceRange: 'all',
//     availability: 'all',
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   // Order modal state
//   const [showOrderModal, setShowOrderModal] = useState(false);
//   const [selectedListing, setSelectedListing] = useState(null);
//   const [orderQuantity, setOrderQuantity] = useState(1);
//   const [orderNotes, setOrderNotes] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   // Contact modal state
//   const [showContactModal, setShowContactModal] = useState(false);
//   const [contactMessage, setContactMessage] = useState('');
//   const [isSendingMessage, setIsSendingMessage] = useState(false);

//   const { currentUser } = useAuth();

//   useEffect(() => {
//     fetchWasteListings();
//   }, []);

//   const fetchWasteListings = async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get('/buyer/waste-listings');
//       setWasteListings(response.data);
//     } catch (error) {
//       console.error('Error fetching waste listings:', error);
//       // Mock data for demonstration
//       const mockListings = [
//         {
//           id: 1,
//           farmerId: 101,
//           farmerName: 'Rajesh Kumar',
//           farmerRating: 4.8,
//           wasteType: 'Rice Straw',
//           quantity: 500,
//           unit: 'kg',
//           price: 2.5,
//           location: 'Patna, Bihar',
//           description: 'High-quality rice straw, perfect for mushroom cultivation or animal bedding.',
//           availableFrom: '2023-10-15',
//           availableTo: '2023-11-30',
//           images: [
//             'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
//           ],
//           distance: 15,
//           postedDate: '2023-10-10',
//         },
//         {
//           id: 2,
//           farmerId: 102,
//           farmerName: 'Sunita Devi',
//           farmerRating: 4.5,
//           wasteType: 'Wheat Straw',
//           quantity: 300,
//           unit: 'kg',
//           price: 3,
//           location: 'Ludhiana, Punjab',
//           description: 'Clean wheat straw, suitable for animal feed or composting.',
//           availableFrom: '2023-10-20',
//           availableTo: '2023-12-15',
//           images: [
//             'https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
//           ],
//           distance: 25,
//           postedDate: '2023-10-05',
//         },
//         {
//           id: 3,
//           farmerId: 103,
//           farmerName: 'Harpreet Singh',
//           farmerRating: 4.9,
//           wasteType: 'Corn Stalks',
//           quantity: 400,
//           unit: 'kg',
//           price: 2,
//           location: 'Amritsar, Punjab',
//           description: 'Dried corn stalks, great for biofuel production or animal feed.',
//           availableFrom: '2023-10-25',
//           availableTo: '2023-12-10',
//           images: [
//             'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
//           ],
//           distance: 30,
//           postedDate: '2023-10-08',
//         },
//         {
//           id: 4,
//           farmerId: 104,
//           farmerName: 'Meena Kumari',
//           farmerRating: 4.6,
//           wasteType: 'Sugarcane Bagasse',
//           quantity: 600,
//           unit: 'kg',
//           price: 1.8,
//           location: 'Meerut, Uttar Pradesh',
//           description: 'Fresh sugarcane bagasse, ideal for paper production or as a biofuel.',
//           availableFrom: '2023-11-01',
//           availableTo: '2023-12-31',
//           images: [
//             'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//           ],
//           distance: 40,
//           postedDate: '2023-10-12',
//         },
//         {
//           id: 5,
//           farmerId: 105,
//           farmerName: 'Ramesh Patel',
//           farmerRating: 4.7,
//           wasteType: 'Vegetable Waste',
//           quantity: 200,
//           unit: 'kg',
//           price: 1.5,
//           location: 'Ahmedabad, Gujarat',
//           description: 'Mixed vegetable waste, perfect for composting or biogas production.',
//           availableFrom: '2023-10-18',
//           availableTo: '2023-11-20',
//           images: [
//             'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
//           ],
//           distance: 35,
//           postedDate: '2023-10-07',
//         },
//         {
//           id: 6,
//           farmerId: 106,
//           farmerName: 'Anita Sharma',
//           farmerRating: 4.4,
//           wasteType: 'Rice Husk',
//           quantity: 350,
//           unit: 'kg',
//           price: 2.2,
//           location: 'Raipur, Chhattisgarh',
//           description: 'Clean rice husk, suitable for fuel, fertilizer, or insulation material.',
//           availableFrom: '2023-10-22',
//           availableTo: '2023-12-05',
//           images: [
//             'https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//           ],
//           distance: 50,
//           postedDate: '2023-10-09',
//         },
//       ];
//       setWasteListings(mockListings);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   const handleContactFarmer = async (listing) => {
//     try {
//       // In a real app, this would call an API endpoint to initiate contact
//       // await api.post('/buyer/contact-farmer', { farmerId: listing.farmerId });

//       // For demo, we'll show a modal or alert
//       setSelectedListing(listing);
//       setShowContactModal(true);
//     } catch (error) {
//       console.error('Error contacting farmer:', error);
//       alert('Failed to contact farmer. Please try again.');
//     }
//   };

//   const handlePlaceOrder = (listing) => {
//     setSelectedListing(listing);
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
//         id: `ORD-${Math.floor(Math.random() * 1000)}`, // Generate a random order ID
//         wasteId: selectedListing.id,
//         farmerId: selectedListing.farmerId,
//         buyerId: currentUser.id,
//         buyerName: currentUser.name || currentUser.email,
//         wasteType: selectedListing.wasteType,
//         quantity: orderQuantity,
//         unit: selectedListing.unit,
//         price: selectedListing.price,
//         totalAmount: selectedListing.price * orderQuantity,
//         notes: orderNotes,
//         status: 'pending',
//         orderDate: new Date().toISOString(),
//         buyerContact: currentUser.phone || 'Not provided',
//         buyerEmail: currentUser.email
//       };

//       console.log('Order placed:', orderData);

//       // In a real app, you would send this to your API
//       // await api.post('/orders', orderData);

//       // For demo purposes, we'll store it in localStorage to simulate persistence
//       const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
//       existingOrders.push(orderData);
//       localStorage.setItem('orders', JSON.stringify(existingOrders));

//       setOrderSuccess(true);
//     } catch (error) {
//       console.error('Error placing order:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeOrderModal = () => {
//     if (!isSubmitting) {
//       setShowOrderModal(false);
//     }
//   };

//   const wasteTypeOptions = [
//     { value: 'all', label: 'All Types' },
//     { value: 'Rice Straw', label: 'Rice Straw' },
//     { value: 'Wheat Straw', label: 'Wheat Straw' },
//     { value: 'Corn Stalks', label: 'Corn Stalks' },
//     { value: 'Sugarcane Bagasse', label: 'Sugarcane Bagasse' },
//     { value: 'Vegetable Waste', label: 'Vegetable Waste' },
//     { value: 'Rice Husk', label: 'Rice Husk' },
//   ];

//   const locationOptions = [
//     { value: 'all', label: 'All Locations' },
//     { value: 'Bihar', label: 'Bihar' },
//     { value: 'Punjab', label: 'Punjab' },
//     { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
//     { value: 'Gujarat', label: 'Gujarat' },
//     { value: 'Chhattisgarh', label: 'Chhattisgarh' },
//   ];

//   const priceRangeOptions = [
//     { value: 'all', label: 'All Prices' },
//     { value: '0-2', label: '₹0 - ₹2 per kg' },
//     { value: '2-3', label: '₹2 - ₹3 per kg' },
//     { value: '3+', label: 'Above ₹3 per kg' },
//   ];

//   const availabilityOptions = [
//     { value: 'all', label: 'All Dates' },
//     { value: 'current', label: 'Available Now' },
//     { value: 'upcoming', label: 'Upcoming' },
//   ];

//   const filteredListings = wasteListings.filter((listing) => {
//     // Search term filter
//     if (searchTerm && !listing.wasteType.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         !listing.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         !listing.description.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false;
//     }

//     // Waste type filter
//     if (filters.wasteType !== 'all' && listing.wasteType !== filters.wasteType) {
//       return false;
//     }

//     // Location filter
//     if (filters.location !== 'all' && !listing.location.includes(filters.location)) {
//       return false;
//     }

//     // Price range filter
//     if (filters.priceRange !== 'all') {
//       const [min, max] = filters.priceRange.split('-');
//       if (max) {
//         if (listing.price < parseFloat(min) || listing.price > parseFloat(max)) {
//           return false;
//         }
//       } else {
//         // For '3+' case
//         if (listing.price < parseFloat(min)) {
//           return false;
//         }
//       }
//     }

//     // Availability filter
//     if (filters.availability !== 'all') {
//       const today = new Date().toISOString().split('T')[0];
//       if (filters.availability === 'current' &&
//           (listing.availableFrom > today || listing.availableTo < today)) {
//         return false;
//       }
//       if (filters.availability === 'upcoming' && listing.availableFrom <= today) {
//         return false;
//       }
//     }

//     return true;
//   });

//   const handleSendMessage = async () => {
//     if (!contactMessage.trim()) return;

//     setIsSendingMessage(true);
//     try {
//       // In a real app, this would call an API endpoint
//       // await api.post('/buyer/send-message', {
//       //   farmerId: selectedListing.farmerId,
//       //   message: contactMessage,
//       //   wasteId: selectedListing.id
//       // });

//       // For demo, we'll simulate a delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Show success message
//       alert(t('marketplace.messageSent'));

//       // Close modal and reset
//       setShowContactModal(false);
//       setContactMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert(t('marketplace.errorSendingMessage'));
//     } finally {
//       setIsSendingMessage(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Browse Crop-Bio Waste</h1>

//           <div className="flex items-center space-x-2">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search waste listings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             </div>

//             <button
//               onClick={toggleFilters}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <FaFilter />
//               <span>Filters</span>
//             </button>
//           </div>
//         </div>

//         {showFilters && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="bg-gray-50 p-4 rounded-lg mb-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Waste Type
//                 </label>
//                 <select
//                   name="wasteType"
//                   value={filters.wasteType}
//                   onChange={handleFilterChange}
//                   className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {wasteTypeOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Location
//                 </label>
//                 <select
//                   name="location"
//                   value={filters.location}
//                   onChange={handleFilterChange}
//                   className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {locationOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price Range
//                 </label>
//                 <select
//                   name="priceRange"
//                   value={filters.priceRange}
//                   onChange={handleFilterChange}
//                   className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {priceRangeOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Availability
//                 </label>
//                 <select
//                   name="availability"
//                   value={filters.availability}
//                   onChange={handleFilterChange}
//                   className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {availabilityOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//           </div>
//         ) : filteredListings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
//             <FaLeaf className="text-gray-400 text-5xl mb-4" />
//             <p className="text-gray-600 text-lg">{t('marketplace.noResults')}</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredListings.map((listing) => (
//               <motion.div
//                 key={listing.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
//               >
                // <div className="relative h-48">
                //   <img
                //     src={listing.images[0]}
                //     alt={listing.wasteType}
                //     className="w-full h-full object-cover"
                //   />
//                   <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
//                     {listing.quantity} {listing.unit}
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg font-semibold text-gray-800">{listing.wasteType}</h3>
//                     <span className="text-lg font-bold text-blue-600">₹{listing.price}/{listing.unit}</span>
//                   </div>

//                   <div className="flex items-center mb-2">
//                     <FaMapMarkerAlt className="text-gray-500 mr-1" />
//                     <span className="text-sm text-gray-600">{listing.location}</span>
//                     <span className="text-xs text-gray-500 ml-2">({listing.distance} km away)</span>
//                   </div>

//                   <div className="flex items-center mb-3">
//                     <FaCalendarAlt className="text-gray-500 mr-1" />
//                     <span className="text-sm text-gray-600">
//                       Available: {new Date(listing.availableFrom).toLocaleDateString()} - {new Date(listing.availableTo).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2">{listing.description}</p>

//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center">
//                       <img
//                         src={listing.farmerImage || "https://randomuser.me/api/portraits/men/1.jpg"}
//                         alt={listing.farmerName}
//                         className="h-8 w-8 rounded-full object-cover border-2 border-white"
//                       />
//                       <span className="text-sm text-gray-600 ml-2">{listing.farmerName}</span>
//                     </div>
//                   </div>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handlePlaceOrder(listing)}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
//                     >
//                       {t('marketplace.placeOrder')}
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         handleContactFarmer(listing);
//                       }}
//                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
//                     >
//                       {t('marketplace.contactSeller')}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

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
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               {orderSuccess ? (
//                 <div className="p-6">
//                   <div className="flex flex-col items-center text-center mb-6">
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                       <FaCheck className="text-green-600 text-2xl" />
//                     </div>
//                     <h3 className="text-xl font-medium text-gray-900 mb-2">
//                       {t('marketplace.orderSuccess')}
//                     </h3>
//                     <p className="text-gray-600">
//                       {t('marketplace.orderPlaced')}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-2">
//                       {t('marketplace.orderSuccessMessage')}
//                     </p>
//                   </div>
//                   <button
//                     onClick={closeOrderModal}
//                     className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
//                   >
//                     {t('common.close')}
//                   </button>
//                 </div>
//               ) : (
//                 <form onSubmit={handleOrderSubmit}>
//                   <div className="flex justify-between items-center border-b p-4">
//                     <h3 className="text-lg font-medium text-gray-900">
//                       {t('marketplace.placeOrder')}
//                     </h3>
//                     <button
//                       type="button"
//                       onClick={closeOrderModal}
//                       className="text-gray-400 hover:text-gray-500"
//                     >
//                       <FaTimes />
//                     </button>
//                   </div>

//                   <div className="p-6">
//                     <div className="mb-6">
//                       <div className="bg-gray-50 p-3 rounded-md mb-4">
//                         <div className="flex justify-between mb-2">
//                           <span className="font-medium">{selectedListing.wasteType}</span>
//                           <span className="font-medium text-blue-600">₹{selectedListing.price}/{selectedListing.unit}</span>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           <div className="flex items-center mb-1">
//                             <FaMapMarkerAlt className="mr-1" />
//                             {selectedListing.location}
//                           </div>
//                           <div className="flex items-center">
//                             <FaCalendarAlt className="mr-1" />
//                             Available: {new Date(selectedListing.availableFrom).toLocaleDateString()} - {new Date(selectedListing.availableTo).toLocaleDateString()}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           {t('marketplace.orderQuantity')}
//                         </label>
//                         <div className="flex items-center">
//                           <input
//                             type="number"
//                             min="1"
//                             max={selectedListing.quantity}
//                             value={orderQuantity}
//                             onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
//                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                             required
//                           />
//                           <span className="ml-2 text-gray-600">{selectedListing.unit}</span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           {t('marketplace.maxAvailable')}: {selectedListing.quantity} {selectedListing.unit}
//                         </p>
//                       </div>

//                       <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           {t('marketplace.totalPrice')}
//                         </label>
//                         <div className="bg-gray-50 p-3 rounded-md text-lg font-medium text-blue-600">
//                           ₹{(selectedListing.price * orderQuantity).toFixed(2)}
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           {t('marketplace.orderNotes')}
//                         </label>
//                         <textarea
//                           value={orderNotes}
//                           onChange={(e) => setOrderNotes(e.target.value)}
//                           rows="3"
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                           placeholder={t('marketplace.orderNotesPlaceholder')}
//                         ></textarea>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
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

//       {/* Contact Farmer Modal */}
//       <AnimatePresence>
//         {showContactModal && selectedListing && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-xl max-w-md w-full"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <div className="flex justify-between items-center border-b p-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   {t('marketplace.contactFarmer')}
//                 </h3>
//                 <button
//                   onClick={() => setShowContactModal(false)}
//                   className="text-gray-400 hover:text-gray-500"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>

//               <div className="p-6">
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-600 mb-2">
//                     {t('marketplace.contactingFarmer')}:
//                   </p>
//                   <div className="bg-gray-50 p-3 rounded-md">
//                     <p className="font-medium">{selectedListing.farmerName}</p>
//                     <p className="text-sm text-gray-500">{selectedListing.wasteType} - ₹{selectedListing.price}/{selectedListing.unit}</p>
//                   </div>
//                 </div>

//                 <form onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSendMessage();
//                 }}>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {t('marketplace.messageToFarmer')}
//                     </label>
//                     <textarea
//                       value={contactMessage}
//                       onChange={(e) => setContactMessage(e.target.value)}
//                       rows="4"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//                       placeholder={t('marketplace.messageToFarmerPlaceholder')}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setShowContactModal(false)}
//                       className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                     >
//                       {t('common.cancel')}
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
//                       disabled={isSendingMessage}
//                     >
//                       {isSendingMessage ? (
//                         <>
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           {t('marketplace.sending')}
//                         </>
//                       ) : (
//                         t('marketplace.sendMessage')
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default BrowseWaste;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaFilter,
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLeaf,
  FaRupeeSign,
  FaShoppingCart,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";

function BrowseWaste() {
  const { t } = useTranslation();
  const [wasteListings, setWasteListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    wasteType: "all",
    location: "all",
    priceRange: "all",
    availability: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Order modal state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [Buyer, setBuyer] = useState(""); // <-- Added this line
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Contact modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    fetchWasteListings();
  }, []);

  const fetchWasteListings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/get_waste_listings"
      );

      console.log("data:", response);
      if (response.data.success && Array.isArray(response.data.listings)) {
        // Filter only listings where status is "disable"
        const filteredListings = response.data.listings.filter(
          (item) => item.status === "active"
        );
  
        const transformedListings = filteredListings.map((item) => ({
          id: item.id,
          farmerName: item.farmerName,
          wasteType: item.wasteType,
          quantity: item.quantity,
          unit: item.unit,
          price: item.priceOffered,
          location: item.location,
          description: item.description,
          availableFrom: item.createdAt,
        }));
  
        setWasteListings(transformedListings);

      }
    } catch (error) {
      console.error("Error fetching waste listings:", error);
      // Mock data for demonstration
      const mockListings = [
        {
          id: 4,
          farmerId: 104,
          farmerName: "Meena Kumari",
          farmerRating: 4.6,
          wasteType: "Sugarcane Bagasse",
          quantity: 600,
          unit: "kg",
          price: 1.8,
          location: "Meerut, Uttar Pradesh",
          description:
            "Fresh sugarcane bagasse, ideal for paper production or as a biofuel.",
          availableFrom: "2023-11-01",
          postedDate: "2023-10-12",
        },
      ];
      setWasteListings(mockListings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePlaceOrder = (listing) => {
    setSelectedListing(listing);
    setOrderQuantity(1);
    setOrderNotes('');
    setOrderSuccess(false);
    setShowOrderModal(true);
  };

  const handleContactFarmer = async (listing) => {
    try {
      // In a real app, this would call an API endpoint to initiate contact
      // await api.post('/buyer/contact-farmer', { farmerId: listing.farmerId });

      // For demo, we'll show a modal or alert
      setSelectedListing(listing);
      setShowContactModal(true);
    } catch (error) {
      console.error("Error contacting farmer:", error);
      alert("Failed to contact farmer. Please try again.");
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault(); // This ensures the form doesn't reload
    
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/update/${selectedListing.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Failed to update status");
  
      const data = await response.json();
      console.log("Status updated:", data);
  
      // Update UI
      setSelectedListing((prevListing) => ({
        ...prevListing,
        status: "pending",
      }));

      alert("Ordere executed successfully, visit order section for more details")
      

      closeOrderModal();
      fetchWasteListings();

      
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const closeOrderModal = () => {
    if (!isSubmitting) {
      setShowOrderModal(false);
    }
  };

  const wasteTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "Rice Straw", label: "Rice Straw" },
    { value: "Wheat Straw", label: "Wheat Straw" },
    { value: "Corn Stalks", label: "Corn Stalks" },
    { value: "Sugarcane Bagasse", label: "Sugarcane Bagasse" },
    { value: "Vegetable Waste", label: "Vegetable Waste" },
    { value: "Rice Husk", label: "Rice Husk" },
  ];

  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "Bihar", label: "Bihar" },
    { value: "Punjab", label: "Punjab" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
  ];

  const priceRangeOptions = [
    { value: "all", label: "All Prices" },
    { value: "0-2", label: "₹0 - ₹2 per kg" },
    { value: "2-3", label: "₹2 - ₹3 per kg" },
    { value: "3+", label: "Above ₹3 per kg" },
  ];

  const availabilityOptions = [
    { value: "all", label: "All Dates" },
    { value: "current", label: "Available Now" },
    { value: "upcoming", label: "Upcoming" },
  ];

  const filteredListings = wasteListings.filter((listing) => {
    // Search term filter
    if (
      searchTerm &&
      !listing.wasteType.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !listing.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Waste type filter
    if (
      filters.wasteType !== "all" &&
      listing.wasteType !== filters.wasteType
    ) {
      return false;
    }

    // Location filter
    if (
      filters.location !== "all" &&
      !listing.location.includes(filters.location)
    ) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-");
      if (max) {
        if (
          listing.price < parseFloat(min) ||
          listing.price > parseFloat(max)
        ) {
          return false;
        }
      } else {
        // For '3+' case
        if (listing.price < parseFloat(min)) {
          return false;
        }
      }
    }

    // Availability filter
    if (filters.availability !== "all") {
      const today = new Date().toISOString().split("T")[0];
      if (
        filters.availability === "current" &&
        (listing.availableFrom > today || listing.availableTo < today)
      ) {
        return false;
      }
      if (
        filters.availability === "upcoming" &&
        listing.availableFrom <= today
      ) {
        return false;
      }
    }

    return true;
  });

  const handleSendMessage = async () => {
    if (!contactMessage.trim()) return;

    setIsSendingMessage(true);
    try {
        const response = await fetch("http://localhost:5000/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: contactMessage }) // Send user-entered message
        });

        const data = await response.json();

        if (data.success) {
            alert("Message sent successfully!");
            setContactMessage(""); // Clear input field
            setShowContactModal(false); // Close modal
        } else {
            alert("Error sending message: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Error sending message:", error);
        alert("Error sending message. Please try again later.");
    } finally {
        setIsSendingMessage(false);
    }
};


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Browse Crop-Bio Waste
          </h1>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search waste listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <button
              onClick={toggleFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 p-4 rounded-lg mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Waste Type
                </label>
                <select
                  name="wasteType"
                  value={filters.wasteType}
                  onChange={handleFilterChange}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {wasteTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {locationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priceRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  name="availability"
                  value={filters.availability}
                  onChange={handleFilterChange}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
            <FaLeaf className="text-gray-400 text-5xl mb-4" />
            <p className="text-gray-600 text-lg">
              {("marketplace.noResults")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                
                
                <div className="relative h-48">

                <img
                    src={`/assets/crops/${listing.wasteType.toLowerCase()}.png`}
                    onError={(e) => { e.target.src = "/assets/crops/default.png"; }}
                    alt={listing.wasteType}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                    {listing.quantity} {listing.unit}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {listing.wasteType}
                    </h3>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{listing.price}/{listing.unit}
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {listing.location}
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <FaCalendarAlt className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      Available:{" "}
                      {new Date(listing.availableFrom).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {listing.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={
                          listing.farmerImage ||
                          `https://randomuser.me/api/portraits/men/${Math.floor(
                            Math.random() * 100
                          )}.jpg`
                        }
                        alt={listing.farmerName}
                        className="h-8 w-8 rounded-full object-cover border-2 border-white"
                      />

                      <span className="text-sm text-gray-600 ml-2">
                        {listing.farmerName}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                  <button
                      onClick={() => handlePlaceOrder(listing)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors">
                      {("placeOrder")}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleContactFarmer(listing);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      {("contactSeller")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {orderSuccess ? (
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <FaCheck className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {("marketplace.orderSuccess")}
                    </h3>
                    <p className="text-gray-600">
                      {("marketplace.orderPlaced")}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {("marketplace.orderSuccessMessage")}
                    </p>
                  </div>
                  <button
                    onClick={closeOrderModal}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {("common.close")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit}>
                  <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {("marketplace.placeOrder")}
                    </h3>
                    <button
                      type="button"
                      onClick={closeOrderModal}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">
                            {selectedListing.wasteType}
                          </span>
                          <span className="font-medium text-blue-600">
                            ₹{selectedListing.price}/{selectedListing.unit}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <FaMapMarkerAlt className="mr-1" />
                            {selectedListing.location}
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            Available:{" "}
                            {new Date(
                              selectedListing.availableFrom
                            ).toLocaleDateString()}{" "}
                            
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {("marketplace.orderQuantity")}
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="1"
                            max={selectedListing.quantity}
                            value={orderQuantity}
                            onChange={(e) =>
                              setOrderQuantity(parseInt(e.target.value))
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                          <span className="ml-2 text-gray-600">
                            {selectedListing.unit}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {("marketplace.maxAvailable")}:{" "}
                          {selectedListing.quantity} {selectedListing.unit}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {("marketplace.totalPrice")}
                        </label>
                        <div className="bg-gray-50 p-3 rounded-md text-lg font-medium text-blue-600">
                          ₹{(selectedListing.price * orderQuantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {("Buyer")}
                        </label>
                        <input
                          type="text"
                          value={Buyer}
                          onChange={(e) => setBuyer(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={("Buyer")}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {("processing")}
                        </>
                      ) : (
                        ("confirmOrder")
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Farmer Modal */}
      <AnimatePresence>
        {showContactModal && selectedListing && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {("marketplace.contactFarmer")}
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {("marketplace.contactingFarmer")}:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium">{selectedListing.farmerName}</p>
                    <p className="text-sm text-gray-500">
                      {selectedListing.wasteType} - ₹{selectedListing.price}/
                      {selectedListing.unit}
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {("marketplace.messageToFarmer")}
                    </label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows="4"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder={("marketplace.messageToFarmerPlaceholder")}
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      {("Cancel")}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      disabled={isSendingMessage}
                    >
                      {isSendingMessage ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {("marketplace.sending")}
                        </>
                      ) : (
                        ("Send")
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BrowseWaste;
