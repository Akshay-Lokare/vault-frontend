import React, { useState } from "react";
import "../index.css";

interface ModalProps {
  title: string;
  onClose: () => void;
  option: string;
}

const API_BASE = "http://34.72.184.245:8080";

const Modal: React.FC<ModalProps> = ({ title, onClose, option }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!text.trim()) {
      alert("Content cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const endpoint = option === "Notes" ? "/add-text" : "/add-code";

      const payload =
        option === "Notes"
          ? {
              title: "Untitled Note",
              data: text,
              tags: [],
              userId: "demo-user",
            }
          : {
              title: "Untitled Code",
              code: text,
              tags: ["snippet"],
              userId: 1,
            };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save");
      }

      console.log("Saved:", data);
      alert("Saved successfully ✅");
      onClose();
      setText("");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
          <textarea
            className={`modal-textarea ${option === "Code" ? "code" : ""}`}
            placeholder={
              option === "Notes"
                ? "Write your note..."
                : "Paste your code snippet..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button
            className="btn primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
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
