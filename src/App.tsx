import './App.css';
import { links } from './data/links';
import LinkCard from './components/LinkCard';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Link Directory</h1>
        <p>A curated list of useful resources. Click any item to open in a new tab.</p>
      </header>
      <main className="link-grid">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Link List App • Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
