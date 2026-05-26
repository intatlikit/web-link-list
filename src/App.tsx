import { useState } from 'react';
import './App.css';
import { links } from './data/links';
import LinkCard from './components/LinkCard';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Intat's Hub</h1>
        <p>A curated list of useful resources. Click any item to open in a new tab.</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </header>
      <main className="link-grid">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))
        ) : (
          <p className="no-results">No resources found matching "{searchQuery}"</p>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Link List App • Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
