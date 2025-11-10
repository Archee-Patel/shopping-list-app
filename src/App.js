import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import ShoppingListPage from './components/ShoppingListPage';
import ArchivedPage from './components/ArchivedPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Available users database for adding members
const AVAILABLE_USERS = [
  { id: 'user1', username: 'owner', password: '123', name: 'John Doe', email: 'owner@email.com', isOwner: true },
  { id: 'user2', username: 'jane', password: '123', name: 'Jane Smith', email: 'jane@email.com', isOwner: false },
  { id: 'user3', username: 'bob', password: '123', name: 'Bob Johnson', email: 'bob@email.com', isOwner: false },
  { id: 'user4', username: 'alice', password: '123', name: 'Alice Brown', email: 'alice@email.com', isOwner: false }
];

const MOCK_SHOPPING_LISTS = [
  {
    id: '1',
    name: 'Grocery List',
    ownerId: 'user1',
    members: [
      { id: 'user1', name: 'John Doe', email: 'owner@email.com', isOwner: true },
      { id: 'user2', name: 'Jane Smith', email: 'jane@email.com', isOwner: false }
    ],
    items: [
      { id: '1', name: 'Milk', quantity: '2 liters', resolved: false, createdBy: 'user1' },
      { id: '2', name: 'Eggs', quantity: '12 pcs', resolved: true, createdBy: 'user2' },
      { id: '3', name: 'Bread', quantity: '1 loaf', resolved: false, createdBy: 'user1' },
      { id: '4', name: 'Apples', quantity: '6 pieces', resolved: false, createdBy: 'user3' }
    ],
    isArchived: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  }
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [shoppingLists, setShoppingLists] = useState(MOCK_SHOPPING_LISTS);
  const [archivedLists, setArchivedLists] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleCreateList = (listName) => {
    const newList = {
      id: Date.now().toString(),
      name: listName,
      ownerId: currentUser.id,
      members: [{ ...currentUser, isOwner: true }],
      items: [],
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setShoppingLists(prev => [...prev, newList]);
  };

  const handleDeleteList = (listId) => {
    setShoppingLists(prev => prev.filter(list => list.id !== listId));
  };

  const handleArchiveList = (listId) => {
    const list = shoppingLists.find(l => l.id === listId);
    if (list) {
      const archivedList = { ...list, isArchived: true, archivedDate: new Date().toISOString() };
      setShoppingLists(prev => prev.filter(l => l.id !== listId));
      setArchivedLists(prev => [...prev, archivedList]);
    }
  };

  const handleRestoreList = (listId) => {
    const list = archivedLists.find(l => l.id === listId);
    if (list) {
      const restoredList = { ...list, isArchived: false };
      setArchivedLists(prev => prev.filter(l => l.id !== listId));
      setShoppingLists(prev => [...prev, restoredList]);
    }
  };

  const handleUpdateListItems = (listId, updatedItems) => {
    setShoppingLists(prev => prev.map(list => 
      list.id === listId ? { ...list, items: updatedItems } : list
    ));
  };

  const handleRemoveMember = (listId, memberId) => {
    setShoppingLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, members: list.members.filter(m => m.id !== memberId) }
        : list
    ));
  };

  // ADD THIS MISSING FUNCTION:
  const handleAddMember = (listId, newMember) => {
    setShoppingLists(prev => prev.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            members: [...list.members, { ...newMember, isOwner: false }]
          }
        : list
    ));
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <DashboardPage 
              shoppingLists={shoppingLists}
              currentUser={currentUser}
              onCreateList={handleCreateList}
              onDeleteList={handleDeleteList}
              onLogout={handleLogout}
            />
          } />
          <Route path="/list/:id" element={
            <ShoppingListPage 
              shoppingLists={shoppingLists}
              currentUser={currentUser}
              onArchiveList={handleArchiveList}
              onUpdateListItems={handleUpdateListItems}
              onRemoveMember={handleRemoveMember}
              onAddMember={handleAddMember}
              onLogout={handleLogout}
            />
          } />
          <Route path="/archived" element={
            <ArchivedPage 
              archivedLists={archivedLists}
              currentUser={currentUser}
              onRestoreList={handleRestoreList}
              onLogout={handleLogout}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;