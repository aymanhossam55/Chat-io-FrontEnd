import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/defaultProfile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupChats } from "../../redux/reducers/chatReducer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GoIssueClosed } from "react-icons/go";
import Loading from "./../common/Loading";

const AddUserToGroupChat = () => {
  const addModal = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [groupUsers, setGroupUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchStatus, setSearchStatus] = useState("no-search");
  const [searchLoading, setSearchLoading] = useState(false);
  const [chatName, setChatName] = useState("");
  const dispatch = useDispatch();

  const handleOnUserSelect = async (user) => {
    if (userInfo._id === user._id) {
      return;
    }
    setGroupUsers((prev) => [...prev, user]);
    setUsers((prev) => prev.filter((u) => u._id !== user._id));
  };

  const handleOnSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    try {
      // fetch the users from the server
      const response = await fetch(`/api/user/?search=${search}`, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();

      setUsers(
        data.filter((user) => {
          // remove the user if it's already in the group
          return !groupUsers.some((u) => u._id === user._id);
        })
      );

      setSearchStatus(data.length === 0 ? "not-found" : "found");
      setSearchLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.key === "Enter") {
      handleOnSearchSubmit(e);
    }
  };

  const handleResearch = () => {
    setSearch("");
    setUsers([]);
    setSearchStatus("no-search");
  };

  const handleRemoveUserFromGroup = (user) => {
    setGroupUsers((prev) => prev.filter((u) => u._id !== user._id));
    setUsers((prev) => [...prev, user]);
  };

  const handleCloseModal = () => {
    setGroupUsers([]);
    setUsers([]);
    setSearch("");
    setSearchStatus("no-search");
    setSearchLoading(false);
    setChatName("");
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/chat/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          users: groupUsers.map((user) => user._id),
          chatName
        })
      });
      if (!response.ok) {
        throw new Error("Failed to create group chat");
      }
      dispatch(fetchGroupChats());
      addModal.current.close();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
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
        create group chat
      </button>
      <dialog id="add-modal" className="modal" ref={addModal}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={handleCloseModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <IoClose />
            </button>
          </form>
          <h3 className="font-bold text-lg">choose users to add to group</h3>

          <form
            method="POST"
            onSubmit={handleOnSearchSubmit}
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

          {groupUsers.length > 0 && (
            <>
              <ul className="flex p-4 justify-around flex-wrap">
                {groupUsers.map((user) => (
                  <li key={user._id} className="relative rounded-lg">
                    <div className="absolute top-3 right-0 z-10">
                      <AiOutlineCloseCircle
                        onClick={() => handleRemoveUserFromGroup(user)}
                        fontSize={22}
                        className="cursor-pointer text-error"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="relative">
                        <GoIssueClosed
                          fontSize={22}
                          className="text-success absolute bottom-2 left-1 z-10"
                        />
                        <img
                          height={0}
                          width={0}
                          className="my-3 rounded-full w-20 h-20 object-cover"
                          src={user.avatar || defaultAvatar}
                          alt=""
                        />
                      </div>
                      <span className="capitalize text-center">
                        {user.username}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <form method="post" onSubmit={handleCreateGroup}>
                <label htmlFor="chatName">
                  <span className="font-bold text-sm">
                    chat name <span className="text-red-500">*</span>
                  </span>
                  <input
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    type="text"
                    placeholder="Chat name"
                    className="input input-bordered w-full mt-2 mb-4"
                  />
                </label>
                <button className="btn btn-primary w-full capitalize">
                  create group chat
                </button>
              </form>
            </>
          )}

          {searchLoading ? (
            <Loading />
          ) : (
            <div>
              {searchStatus === "not-found" ? (
                <p className="flex flex-col justify-center items-center">
                  <div className="flex my-3 gap-2">
                    <span>No user found with the search term</span>
                    <span className="font-bold">{search}</span>
                  </div>
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
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddUserToGroupChat;
