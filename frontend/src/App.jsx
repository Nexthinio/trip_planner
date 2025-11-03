import "./styles/App.css";
import TripCard from "./components/TripCard";
import TripPlanner from "./components/TripPlanner";
import TripJournal from "./components/TripJournal";
import { useEffect, useState } from "react";

export default function App() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trips");
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/trips?userId=1")
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
    fetch(`http://localhost:8080/trips/${tripId}`, {
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
        <span className="icon">✈️</span>
        <h1 className="title">Travel Planner</h1>
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
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <TripCard
              key={trip.tripId}
              trip={trip}
              onToggleDone={handleToggleDone}
            />
          ))
        ) : (
          <div className="empty-placeholder">
            <p className="empty-text">No trips here yet 🌴</p>
            <span className="empty-subtext">Try adding one or switch tab</span>
          </div>
        )}
      </div>
      <div className="bottom-grid-notion">
        <TripPlanner />
      </div>
      {toastMessage && <div className="toast-popup">{toastMessage}</div>}
    </div>
  );
}
