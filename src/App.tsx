import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [meals, setMeals] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.data.data);
        setLoading(false);
      });
  }, [page]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMeal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedMeal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedMeal]);

  return (
    <div className="app">
      <header className="site-header">
        <p className="site-eyebrow">Discover · Explore · Cook</p>
        <h1 className="site-title">World Kitchen</h1>
        <p className="site-subtitle">Hand-picked recipes from every corner of the globe</p>
      </header>

      <main>
        {loading ? (
          <div className="skeleton-grid" aria-busy="true" aria-label="Loading meals">
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="skeleton-card" key={i} />
            ))}
          </div>
        ) : (
          <ol className="meal-grid" role="list">
            {meals.map((meal) => (
              <li
                key={meal.idMeal}
                className="meal-card"
                onClick={() => setSelectedMeal(meal)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${meal.strMeal}`}
                onKeyDown={(e) => e.key === "Enter" && setSelectedMeal(meal)}
              >
                <figure className="meal-image-wrap">
                  <img
                    src={meal.strMealThumb}
                    alt={`Dish: ${meal.strMeal}`}
                    loading="lazy"
                    className="meal-image"
                  />
                  {meal.strArea && (
                    <figcaption className="meal-origin" aria-label="Cuisine origin">
                      {meal.strArea}
                    </figcaption>
                  )}
                </figure>

                <div className="meal-body">
                  <header className="meal-header">
                    {meal.strCategory && (
                      <span className="meal-category" role="note">
                        {meal.strCategory}
                      </span>
                    )}
                    <h2 className="meal-name">{meal.strMeal}</h2>
                  </header>

                  {meal.strTags && (
                    <ul className="meal-tags" aria-label="Tags">
                      {meal.strTags
                        .split(",")
                        .filter(Boolean)
                        .map((tag: string) => (
                          <li key={tag} className="meal-tag">
                            {tag.trim()}
                          </li>
                        ))}
                    </ul>
                  )}

                  {meal.strSource && (
                    <footer className="meal-footer">
                      <a
                        href={meal.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meal-link"
                        aria-label={`View full recipe for ${meal.strMeal}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Recipe
                        <span className="meal-link-arrow" aria-hidden="true">→</span>
                      </a>
                    </footer>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </main>

      <nav className="pagination" aria-label="Page navigation">
        {page <= 30 ? (
          <div className="pager">
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>
            <span className="page-indicator" aria-current="page">Page {page}</span>
            <button
              className="page-btn"
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        ) : (
          <div className="end-message" role="alert">
            <h2>No more meals to load.</h2>
            <button
              className="page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>
          </div>
        )}
      </nav>

      {/* ── Modal ── */}
      {selectedMeal && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedMeal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Recipe details for ${selectedMeal.strMeal}`}
        >
          <article
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedMeal(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-left">
              <figure className="modal-image-wrap">
                <img
                  src={selectedMeal.strMealThumb}
                  alt={selectedMeal.strMeal}
                  className="modal-image"
                />
                {selectedMeal.strArea && (
                  <figcaption className="meal-origin">
                    {selectedMeal.strArea}
                  </figcaption>
                )}
              </figure>

              <div className="modal-meta">
                {selectedMeal.strCategory && (
                  <span className="meal-category">{selectedMeal.strCategory}</span>
                )}
                <h2 className="modal-title">{selectedMeal.strMeal}</h2>

                {selectedMeal.strTags && (
                  <ul className="meal-tags" aria-label="Tags">
                    {selectedMeal.strTags
                      .split(",")
                      .filter(Boolean)
                      .map((tag: string) => (
                        <li key={tag} className="meal-tag">{tag.trim()}</li>
                      ))}
                  </ul>
                )}

                {selectedMeal.strSource && (
                  <a
                    href={selectedMeal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meal-link modal-recipe-link"
                  >
                    View Full Recipe <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </div>

            <div className="modal-right">
              <h3 className="modal-instructions-heading">Instructions</h3>
              <p className="modal-instructions">
                {selectedMeal.strInstructions}
              </p>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

export default App;