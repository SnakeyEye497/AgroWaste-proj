import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLeaf, FaChartLine, FaShoppingCart, FaChartBar, FaComments, FaTruck, FaRecycle, FaQuestionCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FarmerNavigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="space-y-2">
      <NavLink
        to="/manage-waste"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaLeaf />
        <span>{t('navigation.manageWaste')}</span>
      </NavLink>

      <NavLink
        to="/waste-selling"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaShoppingCart />
        <span>{t('navigation.wasteSelling')}</span>
      </NavLink>

      <NavLink
        to="/monthly-sales"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaChartBar />
        <span>{t('navigation.monthlySales')}</span>
      </NavLink>

      <NavLink
        to="/chat"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaComments />
        <span>{t('navigation.chat')}</span>
      </NavLink>

      <NavLink
        to="/transport"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaTruck />
        <span>{t('navigation.transport')}</span>
      </NavLink>

      {/* Creative Waste Uses Navigation Link */}
      <NavLink
        to="/CreativeWasteUses"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaRecycle />
        <span>{t('navigation.CreativeWasteUses')}</span>
      </NavLink>

      {/* New PostQuery Navigation Link */}
      <NavLink
        to="/PostQuery"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaQuestionCircle />
        <span>{t('navigation.postQuery')}</span>
      </NavLink>
      <NavLink
        to="/NearByBuyers"
        className={({ isActive }) =>
          `flex items-center space-x-2 p-2 hover:bg-green-50 rounded-md ${
            isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
          }`
        }
      >
        <FaQuestionCircle />
        <span>{t('navigation.NearByBuyers')}</span>
      </NavLink>
    </nav>
  );
};

export default FarmerNavigation;