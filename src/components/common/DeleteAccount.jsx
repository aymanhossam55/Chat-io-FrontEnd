import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "./../../redux/reducers/userReducer"
import DeleteAccountImg from "../../assets/DeleteAccountImg.svg";

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false);  
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
      });

      if (response.ok) {
        closeModal();
        dispatch(logout());
        toast.success("Account deleted successfully.");

      } else {
        const errorData = await response.json();
        toast.error("Error deleting account:", errorData.message);
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <div>
        {/* Button to Open the Modal */}
        <div className="mt-4">
          <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary" onClick={openModal}>
            <img src={DeleteAccountImg} alt="DeleteAccount-icon" />
            <span className="text-lg ms-2">Delete An Account</span>
          </div>
        </div>

        {/* Modal Dialog */}
        {isOpen && (
          <dialog className="modal" open>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete Account</h3>
              <p className="py-4">
                Are you sure you want to delete this account?
              </p>
              <div className="modal-action">
                {/* Yes Button */}
                <button className="btn" onClick={handleDelete}>Yes</button>
                {/* No Button */}
                <button className="btn" onClick={closeModal}>No</button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </Fragment>
  );
};

export default DeleteAccount;
