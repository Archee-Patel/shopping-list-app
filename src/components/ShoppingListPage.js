import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import ListHeader from './ListHeader';
import ItemsContainer from './ItemsContainer';
import AddItemForm from './AddItemForm';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

const ShoppingListPage = ({ shoppingLists, currentUser, onArchiveList, onUpdateListItems, onRemoveMember, onAddMember, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const list = shoppingLists.find(l => l.id === id);

  const [items, setItems] = useState(list?.items || []);

  if (!list) {
    return (
      <div>
        <Header currentUser={currentUser} onLogout={onLogout} />
        <Container className="mt-4">
          <Alert variant="danger">
            <h4>List not found</h4>
            <p>The shopping list you're looking for doesn't exist.</p>
            <Button as={Link} to="/" variant="primary">
              Back to Dashboard
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  const isOwner = list.ownerId === currentUser.id;

  const handleAddItem = (itemName, quantity) => {
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      quantity: quantity,
      resolved: false,
      createdBy: currentUser.id
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onUpdateListItems(list.id, updatedItems);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    onUpdateListItems(list.id, updatedItems);
  };

  const handleUpdateItem = (itemId, updates) => {
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    );
    setItems(updatedItems);
    onUpdateListItems(list.id, updatedItems);
  };

  const handleArchive = () => {
    if (window.confirm(`Archive "${list.name}"?`)) {
      onArchiveList(list.id);
      navigate('/');
    }
  };

  const handleRemoveMemberWrapper = (memberId) => {
    onRemoveMember(list.id, memberId);
  };

  const handleAddMemberWrapper = (newMember) => {
    onAddMember(list.id, newMember);
  };

  return (
    <div className="shopping-list-page">
      <Header currentUser={currentUser} onLogout={onLogout} />
      <Container fluid>
        <Row>
          <Col md={3} className="desktop-only">
            <div className="p-3">
              <Button as={Link} to="/" variant="outline-secondary" className="mb-3">
                ← Back to Lists
              </Button>
            </div>
          </Col>
          <Col md={9}>
            <div className="main-content p-3">
              <ListHeader
                listName={list.name}
                isOwner={isOwner}
                members={list.members}
                currentUser={currentUser}
                onArchive={handleArchive}
                onRemoveMember={handleRemoveMemberWrapper}
                onAddMember={handleAddMemberWrapper}
              />
              
              <ItemsContainer
                items={items}
                isOwner={isOwner}
                onItemUpdate={handleUpdateItem}
                onItemDelete={handleDeleteItem}
              />
              
              <AddItemForm onAddItem={handleAddItem} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShoppingListPage;