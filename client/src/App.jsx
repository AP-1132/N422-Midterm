import {Routes, Route, Link} from "react-router-dom";
import EntryList from "./pages/EntryList"
import EntryForm from "./pages/EntryForm"

export default function App() {
  return (
    <div className="container">
      <header>
        <h1><Link to="/">Entries</Link></h1>
        <Link className="btn" to="/new">+ New entry</Link>
      </header>
      <Routes>
        <Route path="/" element={<EntryList />} />
        <Route path="/new" element={<EntryForm />} />
        <Route path="/entries/:id" element={<EntryForm />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Routes>
    </div>
  );
}