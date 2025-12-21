import React, { useState } from "react";
import "../index.css";

interface ModalProps {
  title: string;
  onClose: () => void;
  option: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, option }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {option === "Notes" && (
            <textarea
              className="modal-textarea"
              placeholder="Write your note..."
            />
          )}

          {option === "Code" && (
            <textarea
              className="modal-textarea code"
              placeholder="Paste your code snippet..."
            />
          )}

        </div>

        <div className="modal-footer">
          <button className="btn primary">Save</button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOption("");
  };

  return (
    <div className="home-container">
      <h2>Add Your Stuff</h2>
      <p>Select what you want to store</p>

      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Notes">Notes</option>
        <option value="Code">Code Snippet</option>
      </select>

      {showModal && selectedOption && (
        <Modal
          title={selectedOption}
          option={selectedOption}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Home;
