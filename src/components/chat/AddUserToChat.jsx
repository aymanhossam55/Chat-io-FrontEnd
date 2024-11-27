import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/defaultProfile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../redux/reducers/chatReducer";
import socket from "../../utils/Socket";

const AddUserToChat = () => {
  const { userInfo } = useSelector((state) => state.user);
  const addModal = useRef(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleOnUserSelect = async (user) => {
    try {
      const response = await fetch(`/api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user._id })
      });
      if (!response.ok) {
        throw new Error("Failed to add user to chat");
      }
      const data = await response.json();
      handleResearch();
      addModal.current.close();
      dispatch(fetchChats());
      socket.emit("newChat", data, userInfo._id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    try {
      // fetch the users from the server
      const response = await fetch(`/api/user/?search=${search}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.key === "Enter") {
      handleOnSubmit(e);
    }
  };

  const handleResearch = () => {
    setIsFormSubmitted(false);
    setSearch("");
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary capitalize"
        onClick={() => {
          addModal.current.showModal();
          handleResearch();
        }}
      >
        add user
      </button>
      <dialog id="add-modal" className="modal" ref={addModal}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <IoClose />
            </button>
          </form>
          <h3 className="font-bold text-lg">Add user to chat</h3>
          {isFormSubmitted ? (
            <div>
              {users.length === 0 ? (
                <p className="flex flex-col justify-center items-center">
                  No user found with the search term{" "}
                  <span className="font-bold">{search}</span>
                  <button
                    className="btn btn-primary w-full capitalize"
                    onClick={handleResearch}
                  >
                    research
                  </button>
                </p>
              ) : (
                <ul className="flex p-4 justify-around flex-wrap">
                  {users.map((user) => (
                    <li
                      onClick={() => {
                        handleOnUserSelect(user);
                      }}
                      key={user._id}
                      className="cursor-pointer flex flex-col justify-center items-center rounded-lg"
                    >
                      <img
                        height={0}
                        width={0}
                        className="my-3 rounded-full w-20 h-20 object-cover"
                        src={user.avatar || defaultAvatar}
                        alt=""
                      />
                      <span className="capitalize text-center">
                        {user.username}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <form
              method="POST"
              onSubmit={handleOnSubmit}
              className="flex flex-wrap gap-2"
            >
              <label htmlFor="username">
                <span className="font-bold text-sm">
                  username or email or phone number{" "}
                  <span className="text-red-500">*</span>
                </span>
                <input
                  value={search}
                  onChange={onSearchChange}
                  type="text"
                  placeholder="Search user"
                  className="input input-bordered w-full mt-2 mb-4"
                />
              </label>
              <button className="btn btn-primary capitalize w-full">
                search
              </button>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddUserToChat;
