import "../styles/TripCard.css";

export default function TripCard({ trip, onToggleDone }) {
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
      return dateString;
    }
  };

  const formattedStartDate = formatDate(trip.startDate);
  const formattedEndDate = formatDate(trip.endDate);

  const handleCheckboxChange = () => {
    onToggleDone(trip.tripId, trip.done);
  };

  return (
    <div className="trip-card card">
      {trip.image?.url ? (
        <img
          src={trip.image.url}
          alt={trip.title}
          className="trip-image image-trip"
        />
      ) : (
        <div className="trip-image image-trip placeholder">
          <span className="placeholder-text">test</span>
        </div>
      )}

      <div className="trip-content trip-content">
        <div className="trip-title-card">{trip.title}</div>
        <div className="trip-destination-card">{trip.destination}</div>

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
