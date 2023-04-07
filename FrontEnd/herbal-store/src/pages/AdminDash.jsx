import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Navbar,
  OrderList,
  UserList,
  AdminConfigButtons,
  AdminSidebar,
} from '../components';

const AdminDash = () => {
  const [orderList, setOrderList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('orders'); //dash, orders, users, statistics

  //TODO: Admin statistics

  //request orders and users from server
  useEffect(() => {
    fetch('http://localhost:3119/api/order-list', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setOrderList(data);
      })
      .catch((err) => console.log(err));

    fetch('http://localhost:3119/api/user-list', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //react-toastify toast method
  const notify = (message) => toast(message);

  const popupBackgroundClasses =
    'hidden transition-all ease-in fixed left-0 top-0 right-0 z-10 w-full h-full p-4 bg-black bg-opacity-50';
  const cardClasses = 'bg-darkbg rounded-lg p-4 p-10 m-auto';

  return (
    <>
      <div className="bg-lightbg w-full h-screen">
        <Navbar />
        <h1
          id="adminBreadCrumb"
          className="pl-8 italic text-slate-500 my-2 transition-all"
        >
          {selectedTab === 'dashboard' && 'Admin Dashboard'}
          {selectedTab === 'orders' && 'Admin Dashboard > Orders'}
          {selectedTab === 'products' && 'Admin Dashboard > Products'}
          {selectedTab === 'users' && 'Admin Dashboard > Users'}
          {selectedTab === 'configurations' &&
            'Admin Dashboard > Configurations'}
        </h1>

        <div className="flex">
          <div
            className="mx-5 mb-2 w-2/12 inline-block top-56 rounded-lg bg-darkbg"
            style={{ height: 'calc(100vh - 150px)' }}
          >
            <AdminSidebar selector={setSelectedTab} />
          </div>

          {/* main component container */}
          <div className="w-9/12 m-auto justify-center my-3">
            <div className={cardClasses}>
              {selectedTab === 'dashboard' && (
                <h1 className="text-gray-200">Satistics</h1>
              )}
              {selectedTab === 'orders' && (
                <OrderList
                  orders={orderList}
                  popupBgClasses={popupBackgroundClasses}
                  toast={notify}
                />
              )}
              {selectedTab === 'products' && (
                <h1 className="text-gray-200">Products</h1>
              )}
              {selectedTab === 'users' && (
                <UserList users={userList} toast={notify} />
              )}
              {selectedTab === 'configurations' && (
                <AdminConfigButtons
                  popupBgClasses={popupBackgroundClasses}
                  toast={notify}
                />
              )}
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default AdminDash;
