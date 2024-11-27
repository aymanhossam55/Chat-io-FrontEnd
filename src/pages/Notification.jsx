import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, deleteAllNotifications } from "../redux/reducers/notificationReducer";
import RightSide from "../components/common/RightSide";

const Notification = () => {
  const dispatch = useDispatch();
  const { items: notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleClearAll = () => {
    dispatch(deleteAllNotifications());
  };

  return (
    <div className="flex flex-col lg:flex-row bg-base-100 h-screen">
      {/* Notification Section */}
      <div className="w-full lg:w-1/2 p-8 overflow-visible lg:overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-6 text-base-content">
          Notifications
        </h2>
        <button
          onClick={handleClearAll}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
          disabled={loading}
        >
          Clear All
        </button>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-center bg-white rounded-md p-4 shadow"
              >
                {/* Display Avatar */}
                <img
                  src={notification.sender?.avatar || "/default-avatar.png"}
                  alt={notification.sender?.username || "Unknown Sender"}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                {/* Display Name and Message */}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-base-300">
                    {notification.sender?.username || "Unknown Sender"}
                  </p>
                  <p className="text-sm text-accent">
                    {notification.message?.content || "No message content available"}
                  </p>
                </div>
                {/* Display Time */}
                <span className="text-sm text-gray-500">
                  {notification.createdAt
                    ? new Date(notification.createdAt).toLocaleString()
                    : "Unknown time"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notifications found.</p>
          )}
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 bg-primary justify-center items-center h-screen">
        <RightSide />
      </div>
    </div>
  );
};

export default Notification;
