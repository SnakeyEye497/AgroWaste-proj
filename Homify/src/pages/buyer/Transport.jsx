// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import api from '../../services/api';
// import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaBox, FaUser, FaPhoneAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

// function Transport() {
//   const [shipments, setShipments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedShipment, setSelectedShipment] = useState(null);
//   const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  
//   useEffect(() => {
//     fetchShipments();
//   }, []);
  
//   const fetchShipments = async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get('/buyer/shipments');
//       setShipments(response.data);
//     } catch (error) {
//       console.error('Error fetching shipments:', error);
//       // Mock data for demonstration
//       const mockShipments = [
//         {
//           id: 1,
//           orderId: 'ORD-2023-001',
//           wasteType: 'Rice Straw',
//           quantity: 500,
//           unit: 'kg',
//           pickupLocation: 'Patna, Bihar',
//           deliveryLocation: 'Delhi NCR',
//           pickupDate: '2023-10-25',
//           estimatedDeliveryDate: '2023-10-28',
//           status: 'in-transit',
//           currentLocation: 'Kanpur, Uttar Pradesh',
//           lastUpdated: '2023-10-26T14:30:00',
//           driverName: 'Amit Singh',
//           driverContact: '+91 98765 43210',
//           vehicleNumber: 'DL 01 AB 1234',
//           trackingLink: 'https://maps.google.com',
//           progress: 65,
//         },
//         {
//           id: 2,
//           orderId: 'ORD-2023-002',
//           wasteType: 'Wheat Straw',
//           quantity: 300,
//           unit: 'kg',
//           pickupLocation: 'Ludhiana, Punjab',
//           deliveryLocation: 'Delhi NCR',
//           pickupDate: '2023-10-20',
//           estimatedDeliveryDate: '2023-10-22',
//           status: 'delivered',
//           currentLocation: 'Delhi NCR',
//           lastUpdated: '2023-10-22T09:15:00',
//           driverName: 'Gurpreet Singh',
//           driverContact: '+91 98765 43211',
//           vehicleNumber: 'PB 10 CD 5678',
//           trackingLink: 'https://maps.google.com',
//           progress: 100,
//         },
//         {
//           id: 3,
//           orderId: 'ORD-2023-003',
//           wasteType: 'Sugarcane Bagasse',
//           quantity: 600,
//           unit: 'kg',
//           pickupLocation: 'Meerut, Uttar Pradesh',
//           deliveryLocation: 'Delhi NCR',
//           pickupDate: '2023-11-05',
//           estimatedDeliveryDate: '2023-11-07',
//           status: 'scheduled',
//           currentLocation: 'Meerut, Uttar Pradesh',
//           lastUpdated: '2023-10-15T11:45:00',
//           driverName: 'To be assigned',
//           driverContact: 'Not available',
//           vehicleNumber: 'Not assigned',
//           trackingLink: 'https://maps.google.com',
//           progress: 0,
//         },
//       ];
//       setShipments(mockShipments);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const handleViewMap = (shipment) => {
//     setSelectedShipment(shipment);
//     setIsMapModalOpen(true);
//   };
  
//   const handleCloseMapModal = () => {
//     setIsMapModalOpen(false);
//   };
  
//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'scheduled':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'in-transit':
//         return 'bg-blue-100 text-blue-800';
//       case 'delivered':
//         return 'bg-green-100 text-green-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
  
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'scheduled':
//         return <FaCalendarAlt className="mr-1" />;
//       case 'in-transit':
//         return <FaSpinner className="mr-1 animate-spin" />;
//       case 'delivered':
//         return <FaCheckCircle className="mr-1" />;
//       case 'cancelled':
//         return <FaTimesCircle className="mr-1" />;
//       default:
//         return null;
//     }
//   };
  
//   return (
//     <div className="container mx-auto">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Transport Management</h1>
//         </div>
        
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : shipments.length === 0 ? (
//           <div className="bg-gray-100 rounded-lg p-8 text-center">
//             <h3 className="text-lg font-medium text-gray-700 mb-2">No shipments found</h3>
//             <p className="text-gray-500">Your shipments will appear here once you place orders</p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {shipments.map((shipment) => (
//               <motion.div
//                 key={shipment.id}
//                 whileHover={{ y: -2 }}
//                 className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
//               >
//                 <div className="flex flex-col md:flex-row justify-between">
//                   <div className="mb-4 md:mb-0">
//                     <div className="flex items-center mb-2">
//                       <FaTruck className="text-blue-600 mr-2" />
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         Shipment #{shipment.orderId}
//                       </h3>
//                       <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(shipment.status)}`}>
//                         <div className="flex items-center">
//                           {getStatusIcon(shipment.status)}
//                           <span>{shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}</span>
//                         </div>
//                       </span>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
//                       <div className="flex items-start">
//                         <FaBox className="text-gray-500 mt-1 mr-2" />
//                         <div>
//                           <p className="text-xs text-gray-500">Cargo</p>
//                           <p className="text-sm text-gray-800">{shipment.wasteType} ({shipment.quantity} {shipment.unit})</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-start">
//                         <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
//                         <div>
//                           <p className="text-xs text-gray-500">Route</p>
//                           <p className="text-sm text-gray-800">{shipment.pickupLocation} → {shipment.deliveryLocation}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-start">
//                         <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
//                         <div>
//                           <p className="text-xs text-gray-500">Dates</p>
//                           <p className="text-sm text-gray-800">
//                             {new Date(shipment.pickupDate).toLocaleDateString()} - {new Date(shipment.estimatedDeliveryDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-start">
//                         <FaUser className="text-gray-500 mt-1 mr-2" />
//                         <div>
//                           <p className="text-xs text-gray-500">Driver</p>
//                           <p className="text-sm text-gray-800">{shipment.driverName}</p>
//                           <p className="text-xs text-gray-600">{shipment.vehicleNumber}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col justify-between">
//                     <div className="mb-4">
//                       <p className="text-xs text-gray-500 mb-1">Current Location</p>
//                       <p className="text-sm font-medium text-gray-800">{shipment.currentLocation}</p>
//                       <p className="text-xs text-gray-500">
//                         Last updated: {new Date(shipment.lastUpdated).toLocaleString()}
//                       </p>
//                     </div>
                    
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleViewMap(shipment)}
//                         className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
//                       >
//                         Track
//                       </button>
                      
//                       <a
//                         href={`tel:${shipment.driverContact}`}
//                         className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center"
//                       >
//                         <FaPhoneAlt className="mr-1" />
//                         Call
//                       </a>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-4">
//                   <div className="relative pt-1">
//                     <div className="flex mb-2 items-center justify-between">
//                       <div>
//                         <span className="text-xs font-semibold inline-block text-blue-600">
//                           {shipment.progress}% Complete
//                         </span>
//                       </div>
//                     </div>
//                     <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
//                       <div 
//                         style={{ width: `${shipment.progress}%` }} 
//                         className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
//                           shipment.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
//                         }`}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
      
//       {isMapModalOpen && selectedShipment && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4"
//           >
//             <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Tracking Shipment #{selectedShipment.orderId}
//               </h2>
//               <button
//                 onClick={handleCloseMapModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ×
//               </button>
//             </div>
            
//             <div className="p-4">
//               <div className="h-96 bg-gray-200 rounded-lg mb-4 relative">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <p className="text-gray-500">
//                     Map integration would be implemented here with Google Maps API
//                   </p>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
//                   <p className="text-sm font-medium text-gray-800">{selectedShipment.pickupLocation}</p>
//                 </div>
                
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-xs text-gray-500 mb-1">Current Location</p>
//                   <p className="text-sm font-medium text-gray-800">{selectedShipment.currentLocation}</p>
//                 </div>
                
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-xs text-gray-500 mb-1">Delivery Location</p>
//                   <p className="text-sm font-medium text-gray-800">{selectedShipment.deliveryLocation}</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Transport; 


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaBox, FaUser, FaPhoneAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

function Transport() {
  const [shipments, setShipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  
  useEffect(() => {
    fetchShipments();
  }, []);
  
  const fetchShipments = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/buyer/shipments');
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      // Mock data for demonstration
      const mockShipments = [
        {
          id: 1,
          orderId: 'ORD-2023-001',
          wasteType: 'Rice Straw',
          quantity: 500,
          unit: 'kg',
          pickupLocation: 'Patna, Bihar',
          deliveryLocation: 'Delhi NCR',
          pickupDate: '2023-10-25',
          estimatedDeliveryDate: '2023-10-28',
          status: 'in-transit',
          currentLocation: 'Kanpur, Uttar Pradesh',
          lastUpdated: '2023-10-26T14:30:00',
          driverName: 'Amit Singh',
          driverContact: '+91 98765 43210',
          vehicleNumber: 'DL 01 AB 1234',
          trackingLink: 'https://maps.google.com',
          progress: 65,
        },
        {
          id: 2,
          orderId: 'ORD-2023-002',
          wasteType: 'Wheat Straw',
          quantity: 300,
          unit: 'kg',
          pickupLocation: 'Ludhiana, Punjab',
          deliveryLocation: 'Delhi NCR',
          pickupDate: '2023-10-20',
          estimatedDeliveryDate: '2023-10-22',
          status: 'delivered',
          currentLocation: 'Delhi NCR',
          lastUpdated: '2023-10-22T09:15:00',
          driverName: 'Gurpreet Singh',
          driverContact: '+91 98765 43211',
          vehicleNumber: 'PB 10 CD 5678',
          trackingLink: 'https://maps.google.com',
          progress: 100,
        },
        {
          id: 3,
          orderId: 'ORD-2023-003',
          wasteType: 'Sugarcane Bagasse',
          quantity: 600,
          unit: 'kg',
          pickupLocation: 'Meerut, Uttar Pradesh',
          deliveryLocation: 'Delhi NCR',
          pickupDate: '2023-11-05',
          estimatedDeliveryDate: '2023-11-07',
          status: 'scheduled',
          currentLocation: 'Meerut, Uttar Pradesh',
          lastUpdated: '2023-10-15T11:45:00',
          driverName: 'To be assigned',
          driverContact: 'Not available',
          vehicleNumber: 'Not assigned',
          trackingLink: 'https://maps.google.com',
          progress: 0,
        },
      ];
      setShipments(mockShipments);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewMap = (shipment) => {
    setSelectedShipment(shipment);
    setIsMapModalOpen(true);
  };
  
  const handleCloseMapModal = () => {
    setIsMapModalOpen(false);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return <FaCalendarAlt className="mr-1" />;
      case 'in-transit':
        return <FaSpinner className="mr-1 animate-spin" />;
      case 'delivered':
        return <FaCheckCircle className="mr-1" />;
      case 'cancelled':
        return <FaTimesCircle className="mr-1" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Transport Management</h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : shipments.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No shipments found</h3>
            <p className="text-gray-500">Your shipments will appear here once you place orders</p>
          </div>
        ) : (
          <div className="space-y-6">
            {shipments.map((shipment) => (
              <motion.div
                key={shipment.id}
                whileHover={{ y: -2 }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <FaTruck className="text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Shipment #{shipment.orderId}
                      </h3>
                      <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(shipment.status)}`}>
                        <div className="flex items-center">
                          {getStatusIcon(shipment.status)}
                          <span>{shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}</span>
                        </div>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <div className="flex items-start">
                        <FaBox className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Cargo</p>
                          <p className="text-sm text-gray-800">{shipment.wasteType} ({shipment.quantity} {shipment.unit})</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Route</p>
                          <p className="text-sm text-gray-800">{shipment.pickupLocation} → {shipment.deliveryLocation}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Dates</p>
                          <p className="text-sm text-gray-800">
                            {new Date(shipment.pickupDate).toLocaleDateString()} - {new Date(shipment.estimatedDeliveryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaUser className="text-gray-500 mt-1 mr-2" />
                        <div>
                          <p className="text-xs text-gray-500">Driver</p>
                          <p className="text-sm text-gray-800">{shipment.driverName}</p>
                          <p className="text-xs text-gray-600">{shipment.vehicleNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Current Location</p>
                      <p className="text-sm font-medium text-gray-800">{shipment.currentLocation}</p>
                      <p className="text-xs text-gray-500">
                        Last updated: {new Date(shipment.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewMap(shipment)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Track
                      </button>
                      
                      <a
                        href={`tel:${shipment.driverContact}`}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center"
                      >
                        <FaPhoneAlt className="mr-1" />
                        Call
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {shipment.progress}% Complete
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div 
                        style={{ width: `${shipment.progress}%` }} 
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          shipment.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {isMapModalOpen && selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Tracking Shipment #{selectedShipment.orderId}
              </h2>
              <button
                onClick={handleCloseMapModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="p-4">
              <div className="h-96 bg-gray-200 rounded-lg mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">
                    Map integration would be implemented here with Google Maps API
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Pickup Location</p>
                  <p className="text-sm font-medium text-gray-800">{selectedShipment.pickupLocation}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Current Location</p>
                  <p className="text-sm font-medium text-gray-800">{selectedShipment.currentLocation}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Delivery Location</p>
                  <p className="text-sm font-medium text-gray-800">{selectedShipment.deliveryLocation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Transport; 