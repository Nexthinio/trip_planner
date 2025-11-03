export default function TripJournal() {
  return (
    <div>
      <h3 className="section-header">Trip Journal</h3> 
      
      <div className="trip-list notion-list">
        {/* Przykładowy widok Table - dodajemy go jako pierwszy element listy */}
        <div className="trip-item notion-item view-selector">
            <span className="icon-placeholder">📄</span>
            <span>Table</span> 
            {/* Ikony sortowania/filtrowania są tylko dla wizualnej zgodności ze zdjęciem */}
            <div className="view-icons">
                <span>🔎</span>
                <span>⇅</span>
                <span>⋮</span>
            </div>
        </div>

        {/* Przykładowe wpisy do Journala */}
        <div className="trip-item notion-item journal-entry">
            <span className="icon-placeholder">📝</span>
            <span className="journal-title">Trip Journal — Day 1 (Tokyo)</span>
            <span className="journal-date">September 4, 2025</span>
        </div>
        <div className="trip-item notion-item journal-entry">
            <span className="icon-placeholder">📝</span>
            <span className="journal-title">Trip Journal — Day 2 (Tokyo)</span>
            <span className="journal-date">September 4, 2025</span>
        </div>
      </div>
    </div>
  );
}