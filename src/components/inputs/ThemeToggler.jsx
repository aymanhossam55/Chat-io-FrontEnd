import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/reducers/themeReducer";
import { useState, useEffect, Fragment } from "react";
import DarkMode from "../../assets/DarkMode.svg";

const ThemeToggler = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(
    isDarkMode ? "dark" : "light"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update theme on state change
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  // Open modal and set selected option based on current theme
  const openModal = () => {
    setSelectedOption(isDarkMode ? "dark" : "light");
    setIsModalOpen(true);
  };

  // Handle option change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Apply the selected theme option
  const applyThemeSetting = () => {
    if (
      (selectedOption === "dark" && !isDarkMode) ||
      (selectedOption === "light" && isDarkMode)
    ) {
      dispatch(toggleDarkMode());
    }
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <div>
        {/* Button to open the modal */}
        <div className="" onClick={openModal}>
          <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
            <img src={DarkMode} alt="DarkMode-icon"/>
            <span className="text-lg ms-2">Dark Mode</span>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50`}
          >
            <div
              className={`modal-box p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
            >
              <h3 className="font-bold text-lg">Theme Settings</h3>
              <p className="py-4">Choose your theme preference:</p>
              <div className="flex flex-col">
                <label className="cursor-pointer py-2">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={selectedOption === "dark"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  Dark Mode
                </label>
                <label className="cursor-pointer py-2">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={selectedOption === "light"}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  Light Mode
                </label>
              </div>
              <div className="modal-action mt-4">
                <button className="btn btn-primary" onClick={applyThemeSetting}>
                  Apply
                </button>
                <button className="btn" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ThemeToggler;
