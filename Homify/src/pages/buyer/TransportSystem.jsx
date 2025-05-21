// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { FaTruck, FaMapMarkerAlt, FaBox, FaCheck, FaUser } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { useAuth } from '../../contexts/AuthContext';

// function TransportSystem() {
//   const { t } = useTranslation();
//   const { currentUser } = useAuth();
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [farmers, setFarmers] = useState([]);
//   const [showFarmersList, setShowFarmersList] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [vehicles, setVehicles] = useState([
//     { id: 1, type: 'Large Truck', capacity: '10 tons', status: 'available' },
//     { id: 2, type: 'Mini Truck', capacity: '5 tons', status: 'available' },
//     { id: 3, type: 'Pickup', capacity: '2 tons', status: 'available' }
//   ]);

//   useEffect(() => {
//     // Initialize test data if none exists
//     initializeTestData();
//     loadFarmers();
//   }, []);

//   const initializeTestData = () => {
//     // Check if we already have data
//     const existingOrders = localStorage.getItem('wasteOrders');
//     const existingUsers = localStorage.getItem('users');

//     if (!existingOrders || !existingUsers) {
//       // Create test data
//       const testUsers = [
//         { 
//           uid: 'farmer1', 
//           name: 'John Farmer', 
//           role: 'farmer',
//           location: 'Farm Area 1' 
//         },
//         { 
//           uid: 'farmer2', 
//           name: 'Mary Farmer', 
//           role: 'farmer',
//           location: 'Farm Area 2' 
//         }
//       ];

//       const testOrders = [
//         {
//           id: 'order1',
//           farmerId: 'farmer1',
//           buyerId: currentUser.uid,
//           wasteType: 'Organic Waste',
//           quantity: '100',
//           unit: 'kg',
//           location: 'Farm Area 1',
//           status: 'pending',
//           transport: null
//         },
//         {
//           id: 'order2',
//           farmerId: 'farmer2',
//           buyerId: currentUser.uid,
//           wasteType: 'Plastic Waste',
//           quantity: '50',
//           unit: 'kg',
//           location: 'Farm Area 2',
//           status: 'pending',
//           transport: null
//         }
//       ];

//       localStorage.setItem('users', JSON.stringify(testUsers));
//       localStorage.setItem('wasteOrders', JSON.stringify(testOrders));
//     }
//   };

//   const loadFarmers = () => {
//     try {
//       const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
//       const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
//       // Filter orders that belong to the current buyer and have no transport
//       const relevantOrders = savedOrders.filter(order => 
//         order.buyerId === currentUser.uid && 
//         !order.transport &&
//         order.status === 'pending'
//       );

//       // Get unique farmer IDs from relevant orders
//       const farmerIds = [...new Set(relevantOrders.map(order => order.farmerId))];

//       // Get farmer details with their pending orders
//       const farmerDetails = farmerIds.map(farmerId => {
//         const farmer = savedUsers.find(user => user.uid === farmerId);
//         const farmerOrders = relevantOrders.filter(order => order.farmerId === farmerId);
        
//         return {
//           ...farmer,
//           pendingOrders: farmerOrders
//         };
//       }).filter(farmer => farmer && farmer.pendingOrders.length > 0);

//       console.log('Loaded farmers:', farmerDetails); // Debug log
//       setFarmers(farmerDetails);
//     } catch (error) {
//       console.error('Error loading farmers:', error);
//       toast.error('Error loading farmers list');
//     }
//   };

//   const loadOrders = () => {
//     const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
//     const buyerOrders = savedOrders.filter(order => 
//       order.buyerId === currentUser.uid && 
//       (!order.transport || order.transport.status !== 'completed')
//     );
//     setOrders(buyerOrders);
//   };

//   const handleVehicleSelect = (vehicle) => {
//     if (vehicle.status === 'available') {
//       setSelectedVehicle(vehicle);
//       setShowFarmersList(true);
//       loadFarmers(); // Reload farmers list when selecting a vehicle
//     }
//   };

//   const allocateTransportToFarmer = (farmer) => {
//     try {
//       const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
//       const updatedOrders = savedOrders.map(order => {
//         if (order.farmerId === farmer.uid && !order.transport) {
//           return {
//             ...order,
//             transport: {
//               vehicleId: selectedVehicle.id,
//               vehicleType: selectedVehicle.type,
//               status: 'allocated',
//               timeline: [{
//                 status: 'allocated',
//                 timestamp: new Date().toISOString()
//               }]
//             }
//           };
//         }
//         return order;
//       });

//       // Update vehicle status
//       const updatedVehicles = vehicles.map(vehicle => 
//         vehicle.id === selectedVehicle.id ? { ...vehicle, status: 'in_use' } : vehicle
//       );

//       localStorage.setItem('wasteOrders', JSON.stringify(updatedOrders));
//       setVehicles(updatedVehicles);
//       setSelectedVehicle(null);
//       setShowFarmersList(false);
//       loadOrders();
//       loadFarmers();
//       toast.success(t('transport.allocationSuccess'));
//     } catch (error) {
//       toast.error(t('transport.allocationError'));
//     }
//   };

//   const updateTransportStatus = (orderId, newStatus) => {
//     try {
//       const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
//       const updatedOrders = savedOrders.map(order => {
//         if (order.id === orderId && order.transport) {
//           const timeline = [...order.transport.timeline, {
//             status: newStatus,
//             timestamp: new Date().toISOString()
//           }];
          
//           // If completed, free up the vehicle
//           if (newStatus === 'completed') {
//             const updatedVehicles = vehicles.map(vehicle => 
//               vehicle.id === order.transport.vehicleId ? 
//                 { ...vehicle, status: 'available' } : vehicle
//             );
//             setVehicles(updatedVehicles);
//           }

//           return {
//             ...order,
//             transport: {
//               ...order.transport,
//               status: newStatus,
//               timeline
//             }
//           };
//         }
//         return order;
//       });

//       localStorage.setItem('wasteOrders', JSON.stringify(updatedOrders));
//       loadOrders();
//       toast.success(t('transport.statusUpdateSuccess'));
//     } catch (error) {
//       toast.error(t('transport.statusUpdateError'));
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">{t('transport.title')}</h1>

//       {/* Available Vehicles Section */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">{t('transport.availableVehicles')}</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {vehicles.map(vehicle => (
//             <div 
//               key={vehicle.id} 
//               className={`p-4 rounded-lg border ${
//                 vehicle.status === 'available' ? 
//                 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer' : 
//                 'border-gray-200 bg-gray-50'
//               }`}
//             >
//               <div 
//                 onClick={() => vehicle.status === 'available' && handleVehicleSelect(vehicle)}
//                 className="flex items-center justify-between"
//               >
//                 <div>
//                   <FaTruck className="text-2xl text-gray-600 mb-2" />
//                   <h3 className="font-medium">{vehicle.type}</h3>
//                   <p className="text-sm text-gray-600">{vehicle.capacity}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-sm ${
//                   vehicle.status === 'available' ? 
//                   'bg-green-100 text-green-800' : 
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {t(`transport.${vehicle.status}`)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Farmers List Modal */}
//       {showFarmersList && selectedVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">
//                 {t('transport.selectFarmer')} - {selectedVehicle.type}
//               </h2>
//               <button 
//                 onClick={() => {
//                   setShowFarmersList(false);
//                   setSelectedVehicle(null);
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4">
//               {farmers.length > 0 ? (
//                 farmers.map(farmer => (
//                   <div 
//                     key={farmer.uid}
//                     className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
//                     onClick={() => allocateTransportToFarmer(farmer)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="flex items-center space-x-2">
//                           <FaUser className="text-gray-600" />
//                           <h3 className="font-medium">{farmer.name}</h3>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {farmer.pendingOrders.length} {t('transport.pendingOrders')}
//                         </p>
//                       </div>
//                       <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
//                         {t('transport.allocate')}
//                       </button>
//                     </div>
//                     <div className="mt-2 space-y-2">
//                       {farmer.pendingOrders.map(order => (
//                         <div key={order.id} className="text-sm text-gray-600 flex items-center space-x-2">
//                           <FaBox className="text-gray-400" />
//                           <span>{order.wasteType} - {order.quantity} {order.unit}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 text-gray-600">
//                   {t('transport.noFarmersFound')}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Orders Section */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">{t('transport.orders')}</h2>
//         <div className="grid grid-cols-1 gap-4">
//           {orders.map(order => (
//             <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold">{order.wasteType}</h3>
//                   <p className="text-sm text-gray-600">Order #{order.id}</p>
//                 </div>
//                 {order.transport && (
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     order.transport.status === 'completed' ? 
//                     'bg-green-100 text-green-800' : 
//                     'bg-blue-100 text-blue-800'
//                   }`}>
//                     {t(`transport.status.${order.transport.status}`)}
//                   </span>
//                 )}
//               </div>

//               <div className="grid md:grid-cols-2 gap-4 mb-4">
//                 <div className="space-y-2">
//                   <div className="flex items-center text-gray-600">
//                     <FaBox className="mr-2" />
//                     <span>{order.quantity} {order.unit}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <FaMapMarkerAlt className="mr-2" />
//                     <span>{order.location}</span>
//                   </div>
//                 </div>

//                 {!order.transport ? (
//                   <div className="flex flex-col space-y-2">
//                     <p className="font-medium">{t('transport.selectVehicle')}:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {vehicles
//                         .filter(v => v.status === 'available')
//                         .map(vehicle => (
//                           <button
//                             key={vehicle.id}
//                             onClick={() => handleVehicleSelect(vehicle)}
//                             className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
//                           >
//                             {vehicle.type}
//                           </button>
//                         ))
//                       }
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col space-y-2">
//                     <p className="font-medium">{t('transport.vehicleDetails')}:</p>
//                     <p>{order.transport.vehicleType}</p>
//                     <div className="flex gap-2">
//                       {order.transport.status !== 'completed' && (
//                         <button
//                           onClick={() => updateTransportStatus(order.id, 
//                             order.transport.status === 'allocated' ? 'dispatched' :
//                             order.transport.status === 'dispatched' ? 'in_transit' :
//                             order.transport.status === 'in_transit' ? 'arrived' :
//                             'completed'
//                           )}
//                           className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
//                         >
//                           {t(`transport.action.${
//                             order.transport.status === 'allocated' ? 'dispatched' :
//                             order.transport.status === 'dispatched' ? 'in_transit' :
//                             order.transport.status === 'in_transit' ? 'arrived' :
//                             'completed'
//                           }`)}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {order.transport && (
//                 <div className="border-t pt-4">
//                   <h4 className="font-medium mb-3">{t('transport.timeline')}</h4>
//                   <div className="space-y-3">
//                     {order.transport.timeline.map((event, index) => (
//                       <div key={index} className="flex items-center">
//                         <div className="relative">
//                           <FaCheck className="text-green-500 text-xl" />
//                           {index !== order.transport.timeline.length - 1 && (
//                             <div className="absolute top-6 left-[0.7rem] w-0.5 h-full -mt-6 bg-green-200" />
//                           )}
//                         </div>
//                         <div className="ml-4">
//                           <p className="font-medium text-gray-800">
//                             {t(`transport.status.${event.status}`)}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {new Date(event.timestamp).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           {orders.length === 0 && (
//             <div className="text-center py-8 text-gray-600">
//               {t('transport.noOrders')}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TransportSystem; 

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTruck, FaMapMarkerAlt, FaBox, FaCheck, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

function TransportSystem() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [showFarmersList, setShowFarmersList] = useState(false);
  const [orders, setOrders] = useState([]);
  const [vehicles, setVehicles] = useState([
    { id: 1, type: 'Large Truck', capacity: '10 tons', status: 'available' },
    { id: 2, type: 'Mini Truck', capacity: '5 tons', status: 'available' },
    { id: 3, type: 'Pickup', capacity: '2 tons', status: 'available' }
  ]);

  useEffect(() => {
    // Initialize test data if none exists
    initializeTestData();
    loadFarmers();
  }, []);

  const initializeTestData = () => {
    // Check if we already have data
    const existingOrders = localStorage.getItem('wasteOrders');
    const existingUsers = localStorage.getItem('users');

    if (!existingOrders || !existingUsers) {
      // Create test data
      const testUsers = [
        { 
          uid: 'farmer1', 
          name: 'John Farmer', 
          role: 'farmer',
          location: 'Farm Area 1' 
        },
        { 
          uid: 'farmer2', 
          name: 'Mary Farmer', 
          role: 'farmer',
          location: 'Farm Area 2' 
        }
      ];

      const testOrders = [
        {
          id: 'order1',
          farmerId: 'farmer1',
          buyerId: currentUser.uid,
          wasteType: 'Organic Waste',
          quantity: '100',
          unit: 'kg',
          location: 'Farm Area 1',
          status: 'pending',
          transport: null
        },
        {
          id: 'order2',
          farmerId: 'farmer2',
          buyerId: currentUser.uid,
          wasteType: 'Plastic Waste',
          quantity: '50',
          unit: 'kg',
          location: 'Farm Area 2',
          status: 'pending',
          transport: null
        }
      ];

      localStorage.setItem('users', JSON.stringify(testUsers));
      localStorage.setItem('wasteOrders', JSON.stringify(testOrders));
    }
  };

  const loadFarmers = () => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Filter orders that belong to the current buyer and have no transport
      const relevantOrders = savedOrders.filter(order => 
        order.buyerId === currentUser.uid && 
        !order.transport &&
        order.status === 'pending'
      );

      // Get unique farmer IDs from relevant orders
      const farmerIds = [...new Set(relevantOrders.map(order => order.farmerId))];

      // Get farmer details with their pending orders
      const farmerDetails = farmerIds.map(farmerId => {
        const farmer = savedUsers.find(user => user.uid === farmerId);
        const farmerOrders = relevantOrders.filter(order => order.farmerId === farmerId);
        
        return {
          ...farmer,
          pendingOrders: farmerOrders
        };
      }).filter(farmer => farmer && farmer.pendingOrders.length > 0);

      console.log('Loaded farmers:', farmerDetails); // Debug log
      setFarmers(farmerDetails);
    } catch (error) {
      console.error('Error loading farmers:', error);
      toast.error('Error loading farmers list');
    }
  };

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
    const buyerOrders = savedOrders.filter(order => 
      order.buyerId === currentUser.uid && 
      (!order.transport || order.transport.status !== 'completed')
    );
    setOrders(buyerOrders);
  };

  const handleVehicleSelect = (vehicle) => {
    if (vehicle.status === 'available') {
      setSelectedVehicle(vehicle);
      setShowFarmersList(true);
      loadFarmers(); // Reload farmers list when selecting a vehicle
    }
  };

  const allocateTransportToFarmer = (farmer) => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
      const updatedOrders = savedOrders.map(order => {
        if (order.farmerId === farmer.uid && !order.transport) {
          return {
            ...order,
            transport: {
              vehicleId: selectedVehicle.id,
              vehicleType: selectedVehicle.type,
              status: 'allocated',
              timeline: [{
                status: 'allocated',
                timestamp: new Date().toISOString()
              }]
            }
          };
        }
        return order;
      });

      // Update vehicle status
      const updatedVehicles = vehicles.map(vehicle => 
        vehicle.id === selectedVehicle.id ? { ...vehicle, status: 'in_use' } : vehicle
      );

      localStorage.setItem('wasteOrders', JSON.stringify(updatedOrders));
      setVehicles(updatedVehicles);
      setSelectedVehicle(null);
      setShowFarmersList(false);
      loadOrders();
      loadFarmers();
      toast.success(t('transport.allocationSuccess'));
    } catch (error) {
      toast.error(t('transport.allocationError'));
    }
  };

  const updateTransportStatus = (orderId, newStatus) => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('wasteOrders') || '[]');
      const updatedOrders = savedOrders.map(order => {
        if (order.id === orderId && order.transport) {
          const timeline = [...order.transport.timeline, {
            status: newStatus,
            timestamp: new Date().toISOString()
          }];
          
          // If completed, free up the vehicle
          if (newStatus === 'completed') {
            const updatedVehicles = vehicles.map(vehicle => 
              vehicle.id === order.transport.vehicleId ? 
                { ...vehicle, status: 'available' } : vehicle
            );
            setVehicles(updatedVehicles);
          }

          return {
            ...order,
            transport: {
              ...order.transport,
              status: newStatus,
              timeline
            }
          };
        }
        return order;
      });

      localStorage.setItem('wasteOrders', JSON.stringify(updatedOrders));
      loadOrders();
      toast.success(t('transport.statusUpdateSuccess'));
    } catch (error) {
      toast.error(t('transport.statusUpdateError'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('transport.title')}</h1>

      {/* Available Vehicles Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('transport.availableVehicles')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vehicles.map(vehicle => (
            <div 
              key={vehicle.id} 
              className={`p-4 rounded-lg border ${
                vehicle.status === 'available' ? 
                'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer' : 
                'border-gray-200 bg-gray-50'
              }`}
            >
              <div 
                onClick={() => vehicle.status === 'available' && handleVehicleSelect(vehicle)}
                className="flex items-center justify-between"
              >
                <div>
                  <FaTruck className="text-2xl text-gray-600 mb-2" />
                  <h3 className="font-medium">{vehicle.type}</h3>
                  <p className="text-sm text-gray-600">{vehicle.capacity}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  vehicle.status === 'available' ? 
                  'bg-green-100 text-green-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {t(`transport.${vehicle.status}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farmers List Modal */}
      {showFarmersList && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {t('transport.selectFarmer')} - {selectedVehicle.type}
              </h2>
              <button 
                onClick={() => {
                  setShowFarmersList(false);
                  setSelectedVehicle(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {farmers.length > 0 ? (
                farmers.map(farmer => (
                  <div 
                    key={farmer.uid}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => allocateTransportToFarmer(farmer)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <FaUser className="text-gray-600" />
                          <h3 className="font-medium">{farmer.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {farmer.pendingOrders.length} {t('transport.pendingOrders')}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                        {t('transport.allocate')}
                      </button>
                    </div>
                    <div className="mt-2 space-y-2">
                      {farmer.pendingOrders.map(order => (
                        <div key={order.id} className="text-sm text-gray-600 flex items-center space-x-2">
                          <FaBox className="text-gray-400" />
                          <span>{order.wasteType} - {order.quantity} {order.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-600">
                  {t('transport.noFarmersFound')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Orders Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('transport.orders')}</h2>
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{order.wasteType}</h3>
                  <p className="text-sm text-gray-600">Order #{order.id}</p>
                </div>
                {order.transport && (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.transport.status === 'completed' ? 
                    'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {t(`transport.status.${order.transport.status}`)}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaBox className="mr-2" />
                    <span>{order.quantity} {order.unit}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{order.location}</span>
                  </div>
                </div>

                {!order.transport ? (
                  <div className="flex flex-col space-y-2">
                    <p className="font-medium">{t('transport.selectVehicle')}:</p>
                    <div className="flex flex-wrap gap-2">
                      {vehicles
                        .filter(v => v.status === 'available')
                        .map(vehicle => (
                          <button
                            key={vehicle.id}
                            onClick={() => handleVehicleSelect(vehicle)}
                            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                          >
                            {vehicle.type}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <p className="font-medium">{t('transport.vehicleDetails')}:</p>
                    <p>{order.transport.vehicleType}</p>
                    <div className="flex gap-2">
                      {order.transport.status !== 'completed' && (
                        <button
                          onClick={() => updateTransportStatus(order.id, 
                            order.transport.status === 'allocated' ? 'dispatched' :
                            order.transport.status === 'dispatched' ? 'in_transit' :
                            order.transport.status === 'in_transit' ? 'arrived' :
                            'completed'
                          )}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          {t(`transport.action.${
                            order.transport.status === 'allocated' ? 'dispatched' :
                            order.transport.status === 'dispatched' ? 'in_transit' :
                            order.transport.status === 'in_transit' ? 'arrived' :
                            'completed'
                          }`)}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {order.transport && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">{t('transport.timeline')}</h4>
                  <div className="space-y-3">
                    {order.transport.timeline.map((event, index) => (
                      <div key={index} className="flex items-center">
                        <div className="relative">
                          <FaCheck className="text-green-500 text-xl" />
                          {index !== order.transport.timeline.length - 1 && (
                            <div className="absolute top-6 left-[0.7rem] w-0.5 h-full -mt-6 bg-green-200" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-800">
                            {t(`transport.status.${event.status}`)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              {t('transport.noOrders')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransportSystem; 