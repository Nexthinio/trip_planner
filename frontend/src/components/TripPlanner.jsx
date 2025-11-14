import { useState, useEffect, useRef } from "react"; // Dodano useRef
import "../styles/TripPlanner.css";
import { Plus, Flag, Trash2 } from "lucide-react";
import { serverPath } from "../global";

export default function TripPlanner() {
  const [planners, setPlanners] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // 1. Utworzenie referencji do kontenera wprowadzania
  const inputRef = useRef(null);

  var userId = localStorage.getItem("userId");

  // 🔹 Nasłuchiwanie kliknięcia poza polem
  useEffect(() => {
    function handleClickOutside(event) {
      // Sprawdzamy, czy kliknięcie nie było wewnątrz pola wprowadzania
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // Jeśli pole jest aktywne i nic nie zostało wpisane, ukrywamy je
        if (isAdding && !newTitle.trim()) {
          setIsAdding(false);
        }
      }
    }

    // Dodajemy globalny nasłuch kliknięć
    document.addEventListener("mousedown", handleClickOutside);

    // Usuwamy nasłuch przy czyszczeniu komponentu
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdding, newTitle]); // Zależności: isAdding (by wiedzieć, czy nasłuchiwać) i newTitle (by sprawdzić, czy jest puste)

  // 🔹 Pobranie planerów z backendu (Bez zmian)
  useEffect(() => {
    fetch(`${serverPath}/trip-planners?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPlanners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trip planners:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Dodanie nowego planera (Bez zmian)
  const handleAddPlanner = () => {
    if (!newTitle.trim()) return;

    fetch(serverPath + "/trip-planners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title: newTitle }),
    })
      .then((res) => res.json())
      .then((newPlanner) => {
        setPlanners((prev) => [...prev, newPlanner]);
        setNewTitle("");
        setIsAdding(false);
      })
      .catch((err) => console.error("Error creating planner:", err));
  };

  // 🔹 Obsługa Enter do dodawania (Bez zmian)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddPlanner();
    }
  };

  if (loading) return <div>Loading planners...</div>;

  const handleDeletePlanner = (plannerId) => {
    fetch(`${serverPath}/trip-planners/${plannerId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setPlanners((prev) => prev.filter((p) => p.plannerId !== plannerId));
      })
      .catch((err) => console.error("Error deleting planner:", err));
  };

  return (
    <div>
      <h3 className="section-header">Trip Planner</h3>

      <div className="trip-list notion-list">
        {/* przycisk "New Trip" */}
        {!isAdding && (
          <div
            className="new-trip-btn"
            onClick={() => {
              setIsAdding(true);
              // Opcjonalnie: ustawiamy focus po renderowaniu
              // W praktyce 'autoFocus' w input jest lepsze, ale to jest opcja
            }}
          >
            <Plus size={16} className="icon" /> New Trip
          </div>
        )}

        {/* input */}
        {isAdding && (
          // 2. Przypisujemy referencję do kontenera
          <div className="new-trip-input-container" ref={inputRef}>
            <Flag size={14} className="icon-placeholder" />
            <input
              type="text"
              placeholder="Enter trip name..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="trip-input-notion"
              autoFocus
            />
            <button onClick={handleAddPlanner} className="add-btn-minimal">
              Add
            </button>
          </div>
        )}

        {planners.length === 0 && !isAdding && (
          <p className="empty-text">No planned trips yet.</p>
        )}

        {planners.map((planner) => (
          <div
            key={planner.plannerId}
            className="trip-item notion-item planner-row"
          >
            <div className="planner-left">
              <Flag size={14} className="icon-placeholder" />
              <span>{planner.title}</span>
            </div>

            <button
              className="delete-btn"
              onClick={() => handleDeletePlanner(planner.plannerId)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
