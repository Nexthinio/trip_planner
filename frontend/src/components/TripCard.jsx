import "../styles/TripCard.css";

export default function TripCard({ trip, onToggleDone }) {
  // Funkcja formatująca datę (opcjonalnie, ale poprawia czytelność)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      // Format YYYY-MM-DD
      return date
        .toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, "-");
    } catch (e) {
      return dateString; // Zwróć niezmieniony, jeśli wystąpi błąd
    }
  };

  const formattedStartDate = formatDate(trip.startDate);
  const formattedEndDate = formatDate(trip.endDate);

  const handleCheckboxChange = () => {
    // Wywołujemy funkcję z App.jsx, przekazując ID i obecny stan
    onToggleDone(trip.tripId, trip.done);
  };

  return (
    <div className="trip-card notion-card">
      {trip.image?.url ? (
        <img
          src={trip.image.url}
          alt={trip.title}
          className="trip-image notion-image"
        />
      ) : (
        // Używamy czerwonego tła z tekstem "test" dla placeholder'a, jak na zdjęciu
        <div className="trip-image notion-image placeholder">
          <span className="placeholder-text">test</span>
        </div>
      )}

      <div className="trip-content notion-content">
        <div className="trip-title-notion">{trip.title}</div>
        <div className="trip-destination-notion">{trip.destination}</div>

        <div className="trip-details-grid">
          {/* Daty */}
          <div className="detail-item">
            <span className="detail-value">
              {formattedStartDate} → {formattedEndDate}
            </span>
          </div>
          {/* Budżet/Koszt */}
          <div className="detail-item">
            <span className="detail-value">${trip.budget}</span>
          </div>
        </div>

        <div className="trip-checkbox notion-checkbox">
          <input
            type="checkbox"
            checked={trip.done || false}
            onChange={handleCheckboxChange}
          />
          <label>Done</label>
        </div>
      </div>
    </div>
  );
}
