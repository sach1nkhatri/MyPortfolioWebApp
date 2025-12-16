import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaperApp from './new_ui/PaperApp';
import ClassicApp from './ClassicApp';
import Home from './components/Home';
import Blog from './components/Blog';
import Work from './components/Work';
import Contact from './components/Contact';
import DetailPreview from './components/DetailPreview';
import WorkDetailPreview from './components/WorkDetailPreview';
import GamesApp from './games';

function App() {
    return (
        <Router>
            <Routes>
                {/* Old UI (untouched) */}
                <Route path="/classic/*" element={<ClassicApp />}>
                    <Route index element={<Home />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="work" element={<Work />} />
                    <Route path="blog/:id" element={<DetailPreview />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="games/*" element={<GamesApp />} />
                    <Route path="work/:id" element={<WorkDetailPreview />} />
                </Route>

                {/* New UI (default) */}
                <Route path="/*" element={<PaperApp />} />
            </Routes>
        </Router>
    );
}

export default App;
