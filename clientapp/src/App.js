import "./App.css";
import Country from "./country";
import Region from "./region";
import Employee from "./employee";
import Student from "./student";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="body">
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to="/country">Negara</Link>
              </li>
              <li>
                <Link to="/region">Wilayah</Link>
              </li>
              <li>
                <Link to="/employee">Karyawan</Link>
              </li>
              <li>
                <Link to="/student">Mahasiswa</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/country" element={<Country />} />
            <Route path="/region" element={<Region />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/student" element={<Student />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
