// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import { useAuth } from '../../contexts/AuthContext';

// function ManageWaste() {
//   const { t } = useTranslation();
//   const { currentUser } = useAuth();
//   const [wasteItems, setWasteItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [wastes, setWastes] = useState([]);
//   const [newWaste, setNewWaste] = useState({
//     type: '',
//     quantity: '',
//     price: '',
//     description: '',
//     location: '',
//     availableFrom: '',
//     unit: 'kg'
//   });
  
//   useEffect(() => {
//     fetchWasteItems();
//     // Load existing waste listings
//     const existingWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
//     // Filter wastes for current farmer
//     const farmerWastes = existingWastes.filter(waste => waste.farmerId === currentUser.uid);
//     setWastes(farmerWastes);
//   }, [currentUser.uid]);
  
//   const fetchWasteItems = async () => {
//     setIsLoading(true);
    
//     try {
//       // This would normally fetch from the API
//       // For now, we'll use mock data
//       const mockItems = [
//         {
//           id: '1',
//           name: 'Rice Straw',
//           quantity: 500,
//           unit: 'kg',
//           price: 2.5,
//           location: 'Punjab',
//           status: 'available',
//           createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
//         },
//         {
//           id: '2',
//           name: 'Wheat Husk',
//           quantity: 300,
//           unit: 'kg',
//           price: 3.0,
//           location: 'Haryana',
//           status: 'pending',
//           createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
//         },
//         {
//           id: '3',
//           name: 'Corn Stalks',
//           quantity: 200,
//           unit: 'kg',
//           price: 1.8,
//           location: 'Uttar Pradesh',
//           status: 'sold',
//           createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
//         },
//         {
//           id: '4',
//           name: 'Sugarcane Bagasse',
//           quantity: 450,
//           unit: 'kg',
//           price: 2.2,
//           location: 'Maharashtra',
//           status: 'available',
//           createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
//         },
//       ];
      
//       setWasteItems(mockItems);
//     } catch (error) {
//       console.error('Error fetching waste items:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };
  
//   const handleFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//   };
  
//   const handleAddClick = () => {
//     setShowAddModal(true);
//   };
  
//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//     setShowAddModal(true);
//   };
  
//   const handleDeleteClick = (item) => {
//     setSelectedItem(item);
//     setShowDeleteConfirm(true);
//   };
  
//   const handleDeleteConfirm = async () => {
//     try {
//       // This would normally call the API
//       // For now, we'll just update the state
//       setWasteItems(wasteItems.filter(item => item.id !== selectedItem.id));
//       setShowDeleteConfirm(false);
//       setSelectedItem(null);
//     } catch (error) {
//       console.error('Error deleting waste item:', error);
//     }
//   };
  
//   const handleAddWaste = (e) => {
//     e.preventDefault();
    
//     const wasteToAdd = {
//       id: `waste_${Date.now()}`,
//       farmerId: currentUser.uid,
//       farmerName: currentUser.displayName || 'Anonymous Farmer',
//       type: newWaste.type,
//       quantity: newWaste.quantity,
//       price: newWaste.price,
//       description: newWaste.description,
//       location: newWaste.location,
//       availableFrom: newWaste.availableFrom,
//       unit: newWaste.unit,
//       status: 'available',
//       createdAt: new Date().toISOString()
//     };

//     // Get all existing wastes and add new one
//     const existingWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
//     const updatedWastes = [...existingWastes, wasteToAdd];
    
//     // Update localStorage and state
//     localStorage.setItem('farmerWastes', JSON.stringify(updatedWastes));
//     setWastes(prev => [...prev, wasteToAdd]);
    
//     // Reset form and close modal
//     setShowAddModal(false);
//     setNewWaste({
//       type: '',
//       quantity: '',
//       price: '',
//       description: '',
//       location: '',
//       availableFrom: '',
//       unit: 'kg'
//     });
//   };
  
//   const handleDeleteWaste = (wasteId) => {
//     const existingWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
//     const updatedWastes = existingWastes.filter(waste => waste.id !== wasteId);
//     localStorage.setItem('farmerWastes', JSON.stringify(updatedWastes));
//     setWastes(prev => prev.filter(waste => waste.id !== wasteId));
//   };
  
//   const filteredItems = wasteItems.filter(item => {
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = statusFilter === 'all' || item.status === statusFilter;
    
//     return matchesSearch && matchesFilter;
//   });
  
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString();
//   };
  
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'available':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'sold':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
//           {t('Waste Listings')}
//         </h1>
        
//         <motion.button
//           onClick={handleAddClick}
//           className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <FaPlus className="mr-2" />
//           {t('waste.addNew')}
//         </motion.button>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:space-x-4">
//           <div className="relative flex-1 mb-4 md:mb-0">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder={t('Search Order')}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//             />
//           </div>
          
//           <div className="flex items-center">
//             <FaFilter className="text-gray-400 mr-2" />
//             <select
//               value={statusFilter}
//               onChange={handleFilterChange}
//               className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//             >
//               <option value="all">{t('All Orders')}</option>
//               <option value="available">{t('Available')}</option>
//               <option value="pending">{t('Pending')}</option>
//               <option value="sold">{t('Sold')}</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.name')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.quantity')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.price')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.location')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.status')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.actions')}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center">
//                     <div className="flex justify-center">
//                       <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     {t('waste.noItemsFound')}
//                   </td>
//                 </tr>
//               ) : (
//                 filteredItems.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                       <div className="text-sm text-gray-500">{formatDate(item.createdAt)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">₹{item.price}/{item.unit}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{item.location}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
//                         {item.status === 'available' && t('Available')}
//                         {item.status === 'pending' && t('Pending')}
//                         {item.status === 'sold' && t('Sold')}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleEditClick(item)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(item)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <FaTrash />
//                         </button>
//                         <button
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           <FaEye />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               {t('waste.confirmDelete')}
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               {selectedItem?.name}
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 {t('common.cancel')}
//               </button>
//               <button
//                 onClick={handleDeleteConfirm}
//                 className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
//               >
//                 {t('common.delete')}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Add/Edit Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">{t('waste.addNewWaste')}</h2>
//             <form onSubmit={handleAddWaste} className="space-y-4">
//             <div>
//   <label className="block text-sm font-medium text-gray-700">Farmer Name</label>
//   <input
//     type="text"
//     required
//     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//     value={newWaste.farmerName}
//     onChange={(e) => setNewWaste({...newWaste, farmerName: e.target.value})}
//   />
// </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700">Waste Type</label>
//   <input
//     type="text"
//     required
//     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//     value={newWaste.type}
//     onChange={(e) => setNewWaste({...newWaste, type: e.target.value})}
//   />
// </div>


//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">{t('waste.quantity')}</label>
//                   <input
//                     type="number"
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                     value={newWaste.quantity}
//                     onChange={(e) => setNewWaste({...newWaste, quantity: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">{t('waste.price')}</label>
//                   <input
//                     type="number"
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                     value={newWaste.price}
//                     onChange={(e) => setNewWaste({...newWaste, price: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">{t('waste.location')}</label>
//                 <input
//                   type="text"
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                   value={newWaste.location}
//                   onChange={(e) => setNewWaste({...newWaste, location: e.target.value})}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">{t('waste.availableFrom')}</label>
//                 <input
//                   type="date"
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                   value={newWaste.availableFrom}
//                   onChange={(e) => setNewWaste({...newWaste, availableFrom: e.target.value})}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">{t('waste.description')}</label>
//                 <textarea
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                   rows="3"
//                   value={newWaste.description}
//                   onChange={(e) => setNewWaste({...newWaste, description: e.target.value})}
//                 ></textarea>
//               </div>

//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//                 >
//                   {t('common.cancel')}
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
//                 >
//                   {t('waste.add')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageWaste; 




// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import { useAuth } from '../../contexts/AuthContext';

// // function ManageWaste() {
// //   const { t } = useTranslation();
// //   const { currentUser } = useAuth();
// //   const [wasteItems, setWasteItems] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
// //   const [selectedItem, setSelectedItem] = useState(null);
// //   const [wastes, setWastes] = useState([]);
// //   const [newWaste, setNewWaste] = useState({
// //     type: '',
// //     quantity: '',
// //     price: '',
// //     description: '',
// //     location: '',
// //     availableFrom: '',
// //     unit: 'kg'
// //   });
  
// //   useEffect(() => {
// //     fetchWasteItems();
// //     // Load existing waste listings
// //     const existingWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
// //     // Filter wastes for current farmer
// //     const farmerWastes = existingWastes.filter(waste => waste.farmerId === currentUser.uid);
// //     setWastes(farmerWastes);
// //   }, [currentUser.uid]);
  
// //   const fetchWasteItems = async () => {
// //     setIsLoading(true);
    
// //     try {
// //       // This would normally fetch from the API
// //       // For now, we'll use mock data
// //       const mockItems = [
// //         {
// //           id: '1',
// //           name: 'Rice Straw',
// //           quantity: 500,
// //           unit: 'kg',
// //           price: 2.5,
// //           location: 'Punjab',
// //           status: 'available',
// //           createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
// //         },
// //         {
// //           id: '2',
// //           name: 'Wheat Husk',
// //           quantity: 300,
// //           unit: 'kg',
// //           price: 3.0,
// //           location: 'Haryana',
// //           status: 'pending',
// //           createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
// //         },
// //         {
// //           id: '3',
// //           name: 'Corn Stalks',
// //           quantity: 200,
// //           unit: 'kg',
// //           price: 1.8,
// //           location: 'Uttar Pradesh',
// //           status: 'sold',
// //           createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
// //         },
// //         {
// //           id: '4',
// //           name: 'Sugarcane Bagasse',
// //           quantity: 450,
// //           unit: 'kg',
// //           price: 2.2,
// //           location: 'Maharashtra',
// //           status: 'available',
// //           createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
// //         },
// //       ];
      
// //       setWasteItems(mockItems);
// //     } catch (error) {
// //       console.error('Error fetching waste items:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  
// function ManageWaste() {
//   const { t } = useTranslation();
//   const { currentUser } = useAuth();
//   const [wasteItems, setWasteItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [error, setError] = useState(null);

//   const [newWaste, setNewWaste] = useState({
//     waste_type: '',
//     quantity: '',
//     price: '',
//     description: '',
//     location: '',
//     available_date: '',
//     unit: 'kg'
//   });
  
//   useEffect(() => {
//     fetchWasteItems();
//   }, []);
  
//   const fetchWasteItems = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/api/get_waste_orders');
      
//       if (response.data.success) {
//         // Transform the API data to match the existing component structure
//         const transformedItems = response.data.wasteOrders.map((item, index) => ({
//           id: `waste_${index}`,
//           name: item.waste_type,
//           quantity: item.quantity,
//           unit: item.unit,
//           price: item.price,
//           location: item.location,
//           description: item.description,
//           status: 'available', // Default status since API doesn't provide it
//           createdAt: new Date(item.available_date).toISOString(),
//         }));
        
//         setWasteItems(transformedItems);
//       } else {
//         throw new Error('Failed to fetch waste orders');
//       }
//     } catch (error) {
//       console.error('Error fetching waste items:', error);
//       setError('Failed to load waste items. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const handleAddWaste = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       // In a real-world scenario, you would send a POST request to the backend
//       const wasteToAdd = {
//         waste_type: newWaste.waste_type,
//         quantity: parseFloat(newWaste.quantity),
//         price: parseFloat(newWaste.price),
//         description: newWaste.description,
//         location: newWaste.location,
//         available_date: newWaste.available_date,
//         unit: newWaste.unit
//       };

//       // Simulating API call - replace with actual API endpoint
//       // const response = await axios.post('http://127.0.0.1:5000/api/add_waste_order', wasteToAdd);
      
//       // Temporary: Add to local state
//       const newItem = {
//         id: `waste_${Date.now()}`,
//         name: wasteToAdd.waste_type,
//         ...wasteToAdd,
//         status: 'available',
//         createdAt: new Date().toISOString()
//       };
      
//       setWasteItems(prev => [...prev, newItem]);
//       setShowAddModal(false);
      
//       // Reset form
//       setNewWaste({
//         waste_type: '',
//         quantity: '',
//         price: '',
//         description: '',
//         location: '',
//         available_date: '',
//         unit: 'kg'
//       });
//     } catch (error) {
//       console.error('Error adding waste item:', error);
//       setError('Failed to add waste item. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };
  
//   const handleFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//   };
  
//   const handleAddClick = () => {
//     setShowAddModal(true);
//   };
  
//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//     setShowAddModal(true);
//   };
  
//   const handleDeleteClick = (item) => {
//     setSelectedItem(item);
//     setShowDeleteConfirm(true);
//   };
  
//   const handleDeleteConfirm = async () => {
//     try {
//       // This would normally call the API
//       // For now, we'll just update the state
//       setWasteItems(wasteItems.filter(item => item.id !== selectedItem.id));
//       setShowDeleteConfirm(false);
//       setSelectedItem(null);
//     } catch (error) {
//       console.error('Error deleting waste item:', error);
//     }
//   };
  
//   const handleAddWaste = (e) => {
//     e.preventDefault();
    
//     const wasteToAdd = {
//       id: `waste_${Date.now()}`,
//       farmerId: currentUser.uid,
//       farmerName: currentUser.displayName || 'Anonymous Farmer',
//       type: newWaste.type,
//       quantity: newWaste.quantity,
//       price: newWaste.price,
//       description: newWaste.description,
//       location: newWaste.location,
//       availableFrom: newWaste.availableFrom,
//       unit: newWaste.unit,
//       status: 'available',
//       createdAt: new Date().toISOString()
//     };

//     // Get all existing wastes and add new one
//     const existingWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
//     const updatedWastes = [...existingWastes, wasteToAdd];
    
//     // Update localStorage and state
//     localStorage.setItem('farmerWastes', JSON.stringify(updatedWastes));
//     setWastes(prev => [...prev, wasteToAdd]);
    
//     // Reset form and close modal
//     setShowAddModal(false);
//     setNewWaste({
//       type: '',
//       quantity: '',
//       price: '',
//       description: '',
//       location: '',
//       availableFrom: '',
//       unit: 'kg'
//     });
//   };
  
//   const handleDeleteWaste = (wasteId) => {
//     const existingWastes = JSON.parse(localStorage.getItem('farmerWastes') || '[]');
//     const updatedWastes = existingWastes.filter(waste => waste.id !== wasteId);
//     localStorage.setItem('farmerWastes', JSON.stringify(updatedWastes));
//     setWastes(prev => prev.filter(waste => waste.id !== wasteId));
//   };
  
//   const filteredItems = wasteItems.filter(item => {
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = statusFilter === 'all' || item.status === statusFilter;
    
//     return matchesSearch && matchesFilter;
//   });
  
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString();
//   };
  
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'available':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'sold':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
//           {t('waste.manageListings')}
//         </h1>
        
//         <motion.button
//           onClick={handleAddClick}
//           className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <FaPlus className="mr-2" />
//           {t('waste.addNew')}
//         </motion.button>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:space-x-4">
//           <div className="relative flex-1 mb-4 md:mb-0">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder={t('waste.searchPlaceholder')}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//             />
//           </div>
          
//           <div className="flex items-center">
//             <FaFilter className="text-gray-400 mr-2" />
//             <select
//               value={statusFilter}
//               onChange={handleFilterChange}
//               className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
//             >
//               <option value="all">{t('waste.filterAll')}</option>
//               <option value="available">{t('waste.filterAvailable')}</option>
//               <option value="pending">{t('waste.filterPending')}</option>
//               <option value="sold">{t('waste.filterSold')}</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.name')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.quantity')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.price')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.location')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.status')}
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {t('waste.actions')}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center">
//                     <div className="flex justify-center">
//                       <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     {t('waste.noItemsFound')}
//                   </td>
//                 </tr>
//               ) : (
//                 filteredItems.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                       <div className="text-sm text-gray-500">{formatDate(item.createdAt)}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">₹{item.price}/{item.unit}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{item.location}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
//                         {item.status === 'available' && t('waste.statusAvailable')}
//                         {item.status === 'pending' && t('waste.statusPending')}
//                         {item.status === 'sold' && t('waste.statusSold')}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleEditClick(item)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(item)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <FaTrash />
//                         </button>
//                         <button
//                           className="text-blue-600 hover:text-blue-900"
//                         >
//                           <FaEye />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
      
//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               {t('waste.confirmDelete')}
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               {selectedItem?.name}
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 {t('common.cancel')}
//               </button>
//               <button
//                 onClick={handleDeleteConfirm}
//                 className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
//               >
//                 {t('common.delete')}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Add/Edit Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">{t('waste.addNewWaste')}</h2>
//             <form onSubmit={handleAddWaste} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">{t('waste.type')}</label>
//                 <input
//                   type="text"
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                   value={newWaste.type}
//                   onChange={(e) => setNewWaste({...newWaste, type: e.target.value})}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">{t('waste.quantity')}</label>
//                   <input
//                     type="number"
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                     value={newWaste.quantity}
//                     onChange={(e) => setNewWaste({...newWaste, quantity: e.target.value})}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">{t('waste.price')}</label>
//                   <input
//                     type="number"
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                     value={newWaste.price}
//                     onChange={(e) => setNewWaste({...newWaste, price: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">{t('waste.location')}</label>
//                 <input
//                   type="text"
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                   value={newWaste.location}
//                   onChange={(e) => setNewWaste({...newWaste, location: e.target.value})}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">{t('waste.availableFrom')}</label>
//                 <input
//                   type="date"
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                   value={newWaste.availableFrom}
//                   onChange={(e) => setNewWaste({...newWaste, availableFrom: e.target.value})}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">{t('waste.description')}</label>
//                 <textarea
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
//                   rows="3"
//                   value={newWaste.description}
//                   onChange={(e) => setNewWaste({...newWaste, description: e.target.value})}
//                 ></textarea>
//               </div>

//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//                 >
//                   {t('common.cancel')}
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
//                 >
//                   {t('waste.add')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageWaste; 



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

function ManageWaste() {
  const { currentUser } = useAuth();
  const [wasteItems, setWasteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  const [newWaste, setNewWaste] = useState({
    farmerName : '',
    waste_type: '',
    quantity: '',
    price: '',
    description: '',
    location: '',
    available_date: '',
    unit: 'kg'
  });
  
  useEffect(() => {
    fetchWasteItems();
  }, []);
  
  const fetchWasteItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
        console.log("📡 Fetching waste listings from backend...");

        const response = await axios.get('http://127.0.0.1:5000/api/get_waste_listings'); // ✅ Fix endpoint
        console.log("✅ Response from backend:", response.data);

        if (response.data.success && Array.isArray(response.data.listings)) { // ✅ Fix key
            const transformedItems = response.data.listings.map((item) => ({
                id: item.id, // Use actual ID
                name: item.wasteType,  // ✅ Fix key (camelCase)
                quantity: item.quantity,
                unit: item.unit,
                price: item.priceOffered, // ✅ Fix key
                location: item.location,
                description: item.description,
                status: item.status || 'available',
                createdAt: item.createdAt || new Date().toISOString(), // Avoid crashing
            }));

            setWasteItems(transformedItems);
        } else {
            console.warn("⚠️ Unexpected response format:", response.data);
            throw new Error('Invalid data format received');
        }
    } catch (error) {
        console.error('❌ Error fetching waste items:', error);
        setError('Failed to load waste items. Please try again later.');
    } finally {
        setIsLoading(false);
  
    }
};

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
  
  const handleAddClick = () => {
    setShowAddModal(true);
  };
  
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setShowAddModal(true);
  };
  
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      // TODO: Implement actual API delete endpoint
      setWasteItems(wasteItems.filter(item => item.id !== selectedItem.id));
      setShowDeleteConfirm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Error deleting waste item:', error);
      setError('Failed to delete waste item.');
    }
  };
  
  const handleAddWaste = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Log all input values for debugging
    console.log("📌 New Waste Input Values:", newWaste);

    // Ensure all required fields are filled
    if (!newWaste.farmerName || !newWaste.waste_type || !newWaste.quantity || !newWaste.price || !newWaste.location || !newWaste.available_date) {
        alert("⚠️ Please fill in all required fields!");
        setIsLoading(false);
        return;
    }

    try {
        const wasteToAdd = {
            farmerName: newWaste.farmerName,
            waste_type: newWaste.waste_type,
            quantity: newWaste.quantity ? parseFloat(newWaste.quantity) : 0,  // ✅ Ensure it's a number
            price: newWaste.price ? parseFloat(newWaste.price) : 0,  // ✅ Ensure it's a number
            description: newWaste.description || "",
            location: newWaste.location,
            available_date: newWaste.available_date,
            unit: newWaste.unit || "kg"
        };

        console.log("📤 Sending waste data to API:", wasteToAdd);  // ✅ Debugging log

        // Send data to Flask backend
        const response = await axios.post(
            'http://127.0.0.1:5000/api/add_waste_listing',
            wasteToAdd,
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log("✅ API Response:", response.data);
        alert("Waste listing added successfully!");

        // Reset form
        setNewWaste({
            farmerName: '',
            waste_type: '',
            quantity: '',
            price: '',
            description: '',
            location: '',
            available_date: '',
            unit: 'kg',
        });

        setShowAddModal(false);

        // ✅ Immediately refresh listings after adding
        fetchWasteItems();

    } catch (error) {
        console.error("❌ Error adding waste item:", error);

        if (error.response) {
            console.error("🔴 Server responded with:", error.response.data);
            alert(`Server Error: ${error.response.data.error}`);
        } else if (error.request) {
            console.error("🛑 No response from server:", error.request);
            alert("No response from server. Is Flask running?");
        } else {
            console.error("⚠️ Request setup error:", error.message);
            alert("Error sending request: " + error.message);
        }
        
        setError('Failed to add waste item. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          {('waste.manageListings')}
        </h1>
        
        <motion.button
          onClick={handleAddClick}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus className="mr-2" />
          {('add new ')}
        </motion.button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={('waste.searchPlaceholder')}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <select
              value={statusFilter}
              onChange={handleFilterChange}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">{('waste.filterAll')}</option>
              <option value="available">{('waste.filterAvailable')}</option>
              <option value="pending">{('waste.filterPending')}</option>
              <option value="sold">{('waste.filterSold')}</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {('waste.name')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {('waste.quantity')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {('waste.price')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {('waste.location')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {('waste.status')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {('waste.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    {('waste.noItemsFound')}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{formatDate(item.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{item.price}/{item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {('waste.confirmDelete')}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedItem?.name}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {('common.cancel')}
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
              >
                {('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add/Edit Modal */}
      {showAddModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{('waste.addNewWaste')}</h2>

            <form onSubmit={handleAddWaste} className="space-y-4">
              <div>
              <div>
              <label className="block text-sm font-medium text-gray-700">Farmer Name</label>
              <input
                type="text" required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                value={newWaste.farmerName}
                onChange={(e) => setNewWaste({...newWaste, farmerName: e.target.value})}/>
              </div>

                <label className="block text-sm font-medium text-gray-700">{('waste type')}</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newWaste.waste_type}
                  onChange={(e) => setNewWaste({...newWaste, waste_type: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{('waste.quantity')}</label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={newWaste.quantity}
                    onChange={(e) => setNewWaste({...newWaste, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{('waste.price')}</label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={newWaste.price}
                    onChange={(e) => setNewWaste({...newWaste, price: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{('waste.location')}</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newWaste.location}
                  onChange={(e) => setNewWaste({...newWaste, location: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{('waste.availableFrom')}</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newWaste.available_date}
                  onChange={(e) => setNewWaste({...newWaste, available_date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{('waste.description')}</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows="3"
                  value={newWaste.description}
                  onChange={(e) => setNewWaste({...newWaste, description: e.target.value})}
                ></textarea>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  {('add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageWaste; 










