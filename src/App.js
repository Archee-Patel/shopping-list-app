import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import ShoppingListPage from './components/ShoppingListPage';
import ArchivedPage from './components/ArchivedPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MOCK_SHOPPING_LISTS = [
  {
    id: '1',
    name: 'Grocery List',
    ownerId: 'user1',
    members: [
      { id: 'user1', name: 'John Doe', email: 'john@email.com', isOwner: true },
      { id: 'user2', name: 'Jane Smith', email: 'jane@email.com', isOwner: false },
      { id: 'user3', name: 'Bob Johnson', email: 'bob@email.com', isOwner: false }
    ],
    items: [
      { id: '1', name: 'Milk', quantity: '2 liters', resolved: false, createdBy: 'user1' },
      { id: '2', name: 'Eggs', quantity: '12 pcs', resolved: true, createdBy: 'user2' },
      { id: '3', name: 'Bread', quantity: '1 loaf', resolved: false, createdBy: 'user1' },
      { id: '4', name: 'Apples', quantity: '1 kg', resolved: false, createdBy: 'user3' }
    ],
    isArchived: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Electronics',
    ownerId: 'user1',
    members: [
      { id: 'user1', name: 'John Doe', email: 'john@email.com', isOwner: true },
      { id: 'user4', name: 'Alice Brown', email: 'alice@email.com', isOwner: false }
    ],
    items: [
      { id: '1', name: 'Laptop', quantity: '1 piece', resolved: false, createdBy: 'user1' },
      { id: '2', name: 'Mouse', quantity: '2 pieces', resolved: true, createdBy: 'user4' },
      { id: '3', name: 'Keyboard', quantity: '1 piece', resolved: false, createdBy: 'user1' }
    ],
    isArchived: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Clothes',
    ownerId: 'user1',
    members: [
      { id: 'user1', name: 'John Doe', email: 'john@email.com', isOwner: true }
    ],
    items: [
      { id: '1', name: 'T-Shirts', quantity: '3 pieces', resolved: false, createdBy: 'user1' },
      { id: '2', name: 'Jeans', quantity: '1 pair', resolved: false, createdBy: 'user1' }
    ],
    isArchived: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  }
];

const MOCK_ARCHIVED_LISTS = [
  {
    id: '4',
    name: 'Party Supplies',
    ownerId: 'user1',
    members: [
      { id: 'user1', name: 'John Doe', email: 'john@email.com', isOwner: true },
      { id: 'user2', name: 'Jane Smith', email: 'jane@email.com', isOwner: false }
    ],
    items: [
      { id: '1', name: 'Balloons', quantity: '20 pcs', resolved: true, createdBy: 'user1' },
      { id: '2', name: 'Cake', quantity: '1 piece', resolved: true, createdBy: 'user2' }
    ],
    isArchived: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-12'),
    archivedDate: '2024-01-12'
  }
];

function App() {
  const [shoppingLists, setShoppingLists] = useState(MOCK_SHOPPING_LISTS);
  const [archivedLists, setArchivedLists] = useState(MOCK_ARCHIVED_LISTS);
  const [currentUser] = useState({ id: 'user1', name: 'John Doe' });

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
            />
          } />
          <Route path="/list/:id" element={
            <ShoppingListPage 
              shoppingLists={shoppingLists}
              currentUser={currentUser}
              onArchiveList={handleArchiveList}
              onUpdateListItems={handleUpdateListItems}
            />
          } />
          <Route path="/archived" element={
            <ArchivedPage 
              archivedLists={archivedLists}
              currentUser={currentUser}
              onRestoreList={handleRestoreList}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;