// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaShoppingCart, FaComments, FaTruck } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';

// const BuyerNavigation = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="flex items-center space-x-4">
//       <NavLink 
//         to="/buyer/marketplace"
//         className={({ isActive }) =>
//           `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
//             isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
//           }`
//         }
//       >
//         <FaShoppingCart className="text-xl" />
//         <span>{t('navigation.marketplace')}</span>
//       </NavLink>
//       <NavLink 
//         to="/buyer/chat"
//         className={({ isActive }) =>
//           `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
//             isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
//           }`
//         }
//       >
//         <FaComments className="text-xl" />
//         <span>{t('navigation.chat')}</span>
//       </NavLink>
//       <NavLink 
//         to="/buyer/transport"
//         className={({ isActive }) =>
//           `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
//             isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
//           }`
//         }
//       >
//         <FaTruck className="text-xl" />
//         <span>{t('navigation.transport')}</span>
//       </NavLink>
//     </div>
//   );
// };

// export default BuyerNavigation; 


import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaComments, FaTruck , FaSearch, FaPlusCircle  } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const BuyerNavigation = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-4">
      <NavLink 
        to="/buyer/marketplace"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaShoppingCart className="text-xl" />
        <span>{t('navigation.marketplace')}</span>
      </NavLink>
      <NavLink 
        to="/buyer/chat"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaComments className="text-xl" />
        <span>{t('navigation.chat')}</span>
      </NavLink>
      <NavLink 
        to="/buyer/transport"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaTruck className="text-xl" />
        <span>{t('navigation.transport')}</span>
      </NavLink>
  {/* Browse Waste */}
  <NavLink 
    to="/buyer/browsewaste"
    className={({ isActive }) =>
      `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
        isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
      }`
    }
  >
    <FaSearch className="text-xl" />
    <span>{t('navigation.browseWaste')}</span>
  </NavLink>

  {/* Post Requirement */}
  <NavLink 
    to="/buyer/postrequirement"
    className={({ isActive }) =>
      `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
        isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
      }`
    }
  >
    <FaPlusCircle className="text-xl" />
    <span>{t('navigation.postRequirement')}</span>
  </NavLink>

  {/* Transport */}
  <NavLink 
    to="/buyer/transport"
    className={({ isActive }) =>
      `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
        isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
      }`
    }
  >
    <FaTruck className="text-xl" />
    <span>{t('navigation.transport')}</span>
  </NavLink>

    </div>
  );
};

export default BuyerNavigation; 