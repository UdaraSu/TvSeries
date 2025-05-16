import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';

const App = () => {
  const baseStyles = {
    fontFamily: "'Noto Sans KR', sans-serif",
    backgroundColor: "#fff0f5",
    minHeight: "100vh",
    margin: 0,
    padding: "2rem",
  };
  return (
    <div style={baseStyles}>
      <Router>
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
