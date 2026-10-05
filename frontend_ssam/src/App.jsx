// frontend_ssam/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login.jsx';
import RegistroEstudiante from './pages/RegistroEstudiante';
import RegistroMaestro from './pages/RegistroMaestro';
import DashboardAdministrador from './pages/DashboardAdministrador';
import DashboardDirectorDistrital from './pages/DashboardDirectorDistrital';
import DashboardDirectorUE from './pages/DashboardDirectorUE';
import DashboardEstudiante from './pages/DashboardEstudiante';
import DashboardMaestro from './pages/DashboardMaestro';
import DashboardSubDirectorDep from './pages/DashboardSubDirectorDep';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Registro directo — la elección de rol está dentro de Home */}
                <Route path="/registro/estudiante" element={<RegistroEstudiante />} />
                <Route path="/registro/maestro" element={<RegistroMaestro />} />

                {/* Dashboards */}
                <Route path="/dashboard/administrador" element={<DashboardAdministrador />} />
                <Route path="/dashboard/director-distrital" element={<DashboardDirectorDistrital />} />
                <Route path="/dashboard/director-ue" element={<DashboardDirectorUE />} />
                <Route path="/dashboard/estudiante" element={<DashboardEstudiante />} />
                <Route path="/dashboard/maestro" element={<DashboardMaestro />} />
                <Route path="/dashboard/subdirector" element={<DashboardSubDirectorDep />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;