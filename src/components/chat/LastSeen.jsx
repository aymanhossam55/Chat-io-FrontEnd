import { Fragment, useState } from "react";
import LastSeenImg from "../../assets/LastSeenImg.svg";

const LastSeen = () => {
  const [selectedOption, setSelectedOption] = useState("off"); // Default value
  const [modalOpen, setModalOpen] = useState(false);
  const [tempOption, setTempOption] = useState("off"); // Temporary state for the modal

  // Open modal function
  const openModal = () => {
    setTempOption(selectedOption); // Store the current selection when opening the modal
    setModalOpen(true);
    document.getElementById("my_modal_1").showModal();
  };

  // Handle option change
  const handleOptionChange = (e) => {
    setTempOption(e.target.value); // Change the temporary selection
  };

  // Apply the choice and update the main state
  const applyChoice = () => {
    setSelectedOption(tempOption); // Update the main state
    console.log("Selected option:", tempOption); // Placeholder for database logic
    setModalOpen(false);
    document.getElementById("my_modal_1").close();
  };

  // Close modal without applying changes
  const closeModal = () => {
    setTempOption(selectedOption); // Reset temporary selection to the current value
    document.getElementById("my_modal_1").close();
  };

  return (
    <Fragment>
      <div>
        <div className="mt-4" onClick={openModal}>
          <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
              <img src={LastSeenImg} alt="LastSeen-icon" />
              <span className="text-lg ms-2">Last Seen Visibility</span>
          </div>
        </div>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Choose Visibility Option</h3>
            <p className="py-4">Select your preference:</p>
            <div className="flex flex-col">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="on"
                  checked={tempOption === "on"} // Check against tempOption
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                ON
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="off"
                  checked={tempOption === "off"} // Check against tempOption
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                OFF
              </label>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={applyChoice}>
                Apply
              </button>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </Fragment>
  );
};
export default LastSeen;
