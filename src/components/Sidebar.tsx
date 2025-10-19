
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div style={{ width: '200px', backgroundColor: '#000', color: '#fff', height: '100vh' }}>
      <h2>Sidebar</h2>
      <ul>
        <li>Home</li>
        <li>Search</li>
        <li>Your Library</li>
      </ul>
    </div>
  );
};

export default Sidebar;
