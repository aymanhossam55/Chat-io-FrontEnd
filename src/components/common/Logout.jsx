import { Fragment, useRef } from "react";
import LogoutImg from "../../assets/LogoutImg.svg";
import siteMap from "./../../sitemap";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Logout = () => {
  const modalRef = useRef(null); // Reference for modal
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await fetch("/api/user/logout", {
        method: "GET"
      });
      dispatch(logout());
      navigate(siteMap.login.path, { replace: true });
    } catch (error) {
      toast.error("Failed to logout" + error.message);
    }
  };

  const openModal = () => {
    modalRef.current.showModal(); // Open modal
  };

  const closeModal = () => {
    modalRef.current.close(); // Close modal
  };

  return (
    <Fragment>
      <div className="mt-4">
        {/* Trigger for opening the modal */}
        <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
          <img src={LogoutImg} alt="LogoutImg-icon" />
          <button onClick={openModal}>Logout</button>
        </div>

        {/* Modal Dialog */}
        <dialog id="logout_modal" ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Logout</h3>
            <p className="py-4">Are you sure you want to log out?</p>
            <div className="modal-action">
              {/* Yes Button */}
              <button className="btn" onClick={handleLogout}>
                Yes
              </button>
              {/* No Button */}
              <button className="btn" onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </Fragment>
  );
};

export default Logout;
