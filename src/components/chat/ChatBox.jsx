import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchMessages } from "../../redux/reducers/messageReducer";
import Message from "./Message";
import Loading from "./../common/Loading";
import PropTypes from "prop-types";
import groupImg from "../../assets/groupChats.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import socket from "../../utils/Socket";

const ChatBox = ({ selectedChat, handleBack }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [typing, setTyping] = useState(false);
  const [whoIsTyping, setWhoIsTyping] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false); 
  const { messages, loading } = useSelector((state) => state.messages);
  const { chatName, img, picture } = selectedChat;
  const messagesRef = useRef();
  const typingTimeoutRef = useRef(null);  
  const dispatch = useDispatch();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit("joinChat", selectedChat._id);
    return () => {
      socket.emit("leaveChat", selectedChat._id);
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("messageReceived");
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [selectedChat._id]);

  useEffect(() => {
    dispatch(fetchMessages(selectedChat._id));
  }, [dispatch, selectedChat._id]);

  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSending) return;

      setIsSending(true);
      setTyping(false);
      socket.emit("stopTyping", selectedChat._id);

      if (newMessage.trim() === "") {
        toast.error("Message cannot be empty");
        setIsSending(false);
        return;
      }

      try {
        const response = await fetch(`/api/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            content: newMessage,
            contentType: "text",
          }),
        });
        if (!response.ok) throw new Error("Failed to send message");

        const data = await response.json();
        dispatch(addMessage(data.data));
        socket.emit("newMessage", data.data);
        setNewMessage("");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsSending(false);
      }
    },
    [isSending, newMessage, selectedChat._id, dispatch]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !isSending) {
        sendMessage(e);
      } else {
        socket.emit("typing", selectedChat._id, userInfo.username);
      }
    },
    [sendMessage, isSending, selectedChat._id, userInfo.username]
  );

  useEffect(() => {
    socket.on("typing", (username) => {
      setWhoIsTyping(username);
      setTyping(true);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
        setWhoIsTyping("");
      }, 1000); 
    });

    socket.on("stopTyping", () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      setTyping(false);
      setWhoIsTyping("");
    });

    socket.on("messageReceived", (message) => {
      if (message && message.content) {
        dispatch(addMessage(message));
      } else {
        console.error("Invalid message format:", message);
      }
    });
  }, [dispatch]);

  return (
    <div className="relative flex flex-col h-screen">
  <div className="flex justify-between items-center p-2 bg-primary px-8">
    <div className="flex items-center gap-4">
      <div className="relative">
        <img
          src={picture || img || groupImg}
          alt="Chat"
          className="h-12 w-12 rounded-full"
        />
      </div>
      <p className="text text-2xl text-white">{chatName}</p>
    </div>
    <button
      className="flex gap-2 items-center text-white capitalize"
      onClick={handleBack}
    >
      <IoIosArrowBack />
      <span>back</span>
    </button>
  </div>

  <div
    className="flex-1 overflow-y-auto p-4 pb-16 w-full break-words"  // Use flex-1 to ensure it fills the available space
    ref={messagesRef}
  >
    {loading ? (
      <Loading />
    ) : (
      <>
        {messages.map((message) => (
          <Message msg={message} key={message._id} />
        ))}
        {typing && (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
            <span className="text-sm text-gray-500 capitalize">
              {whoIsTyping} is typing...
            </span>
          </div>
        )}
      </>
    )}
  </div>

  {/* Message input form */}
  <form
    onSubmit={sendMessage}
    method="post"
    className="flex items-center gap-3 p-4 bg-base-100 w-full border-t"
  >
    <input
      type="text"
      placeholder="Type a message"
      className="input input-bordered w-full px-4 text-base-content"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <button className="btn bg-primary text-white" disabled={isSending}>
      {isSending ? "Sending..." : "Send"}
    </button>
  </form>
</div>

  );
};

ChatBox.propTypes = {
  selectedChat: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default ChatBox;
