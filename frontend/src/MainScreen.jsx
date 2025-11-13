import "./styles/App.css";
import TripCard from "./components/TripCard";
import TripPlanner from "./components/TripPlanner";
import TripJournal from "./components/TripJournal";
import { useEffect, useState } from "react";
import { serverPath } from "./global";
import { Logout } from "./NavigationLP";

export default function MainScreen() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trips");
  const [toastMessage, setToastMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    var userId = localStorage.getItem("userId");
    fetch(serverPath + "/trips?userId=" + userId)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Upewniamy się, że każdy trip ma obiekt image
        const tripsWithImages = data.map((trip) => ({
          ...trip,
          image: trip.image || { url: "" },
        }));
        setTrips(tripsWithImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
        setLoading(false);
      });
  }, []);

  const handleToggleDone = (tripId, currentIsDone) => {
    const currentTrip = trips.find((t) => t.tripId === tripId);
    if (!currentTrip) return;

    const newIsDone = !currentTrip.done;

    // 🔹 Tworzymy nowy obiekt Trip z odwróconym stanem done
    const updatedTripData = {
      ...currentTrip,
      done: newIsDone,
    };

    // 🔹 Optymistyczna aktualizacja interfejsu
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.tripId === tripId ? { ...trip, done: newIsDone } : trip
      )
    );

    // 🔹 Aktualizacja na backendzie (PUT)
    fetch(serverPath + "/trips/" + tripId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTripData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update trip status");
        }
        return res.json();
      })
      .then((updatedTripFromBackend) => {
        // 🔹 Synchronizacja stanu z backendem (ważne!)
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.tripId === tripId ? updatedTripFromBackend : trip
          )
        );
        if (updatedTripFromBackend.done) {
          showToast(
            `🎉 Trip "${updatedTripFromBackend.title}" marked as done!`
          );
        } else {
          showToast(
            `↩️ Trip "${updatedTripFromBackend.title}" marked as not done!.`
          );
        }
      })
      .catch((error) => {
        console.error("Error updating 'done' status:", error);

        // 🔹 Cofnięcie zmian w razie błędu
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.tripId === tripId ? { ...trip, done: currentIsDone } : trip
          )
        );
      });
  };

  const handleSaveTrip = () => {
    var userId = localStorage.getItem("userId");
    const newTrip = {
      title,
      description,
      destination,
      startDate,
      endDate,
      budget: Number(budget),
      done,
      userId: userId,
    };

    fetch(serverPath + "/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrip),
    })
      .then((res) => res.json())
      .then((createdTrip) => {
        // dodaj nowy rekord do listy
        setTrips((prev) => [...prev, createdTrip]);

        // zamknij popup
        setShowPopup(false);

        // wyczyść pola
        setTitle("");
        setDescription("");
        setDestination("");
        setStartDate("");
        setEndDate("");
        setBudget("");
        setDone(false);

        showToast("Trip added successfully!");
      })
      .catch((err) => console.error("Error creating trip:", err));
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500); // znika po 2,5 sekundy
  };

  if (loading) return <div className="loading">Loading trips...</div>;

  const filteredTrips = trips.filter((trip) => {
    if (activeTab === "done") return trip.done;
    if (activeTab === "trips") return !trip.done;
    return true; // all
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <span className="icon">✈️</span>
          <h1 className="title">Travel Planner</h1>
        </div>

        <button className="logout-button" onClick={Logout}>
          Logout
        </button>
      </header>

      <div className="tab-menu">
        <button
          className={`tab-item ${activeTab === "trips" ? "active" : ""}`}
          onClick={() => setActiveTab("trips")}
        >
          Trips
        </button>
        <button
          className={`tab-item ${activeTab === "done" ? "active" : ""}`}
          onClick={() => setActiveTab("done")}
        >
          Done
        </button>
        <button
          className={`tab-item ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All list
        </button>
      </div>
      <div className="trip-grid">
        {filteredTrips.map((trip) => (
          <TripCard
            key={trip.tripId}
            trip={trip}
            onToggleDone={handleToggleDone}
          />
        ))}

        {/* Zawsze widoczny guzik dodawania */}
        <button className="add-trip-button" onClick={() => setShowPopup(true)}>
          + Add new trip
        </button>
      </div>
      <div className="bottom-grid-notion">
        <TripPlanner />
      </div>
      {toastMessage && <div className="toast-popup">{toastMessage}</div>}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-window" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Trip</h2>
            <label className="popup-label">Title</label>
            <input
              type="text"
              className="popup-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="popup-label">Description</label>
            <input
              type="text"
              className="popup-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="popup-label">Destination</label>
            <input
              type="text"
              className="popup-input"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <label className="popup-label">Start date</label>
            <input
              type="date"
              className="popup-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label className="popup-label">End date</label>
            <input
              type="date"
              className="popup-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <label className="popup-label">Budget $</label>
            <input
              type="number"
              className="popup-input"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <label className="popup-label">Completed?</label>
            <input
              type="checkbox"
              className="popup-input"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />

            <div className="popup-actions">
              <button
                className="popup-cancel"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button className="popup-save" onClick={handleSaveTrip}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
