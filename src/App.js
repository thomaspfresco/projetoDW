import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/menu/Menu';
import Homepage from './pages/homepage/Homepage';
import Project from './pages/project/Project';

function App() {
  return (
    <main className="App">
        <BrowserRouter>
        <Menu>
            <Routes>
              <Route path="/">
                <Route index element={<Homepage />} />
                <Route path="contos/:slug" element={<Project />} />
              </Route>
            </Routes>
          </Menu>
        </BrowserRouter>
    </main>
  );
}

export default App;
