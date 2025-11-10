import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ShoppingListsContainer from './ShoppingListsContainer';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const DashboardPage = ({ shoppingLists, currentUser, onCreateList, onDeleteList, onLogout }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      onCreateList(newListName.trim());
      setNewListName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Header currentUser={currentUser} onLogout={onLogout} />
      <Container fluid>
        <Row>
          <Col md={3} className="desktop-only">
            <Sidebar activeRoute="/" />
          </Col>
          <Col md={9}>
            <div className="main-content p-3">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">My Shopping Lists</h2>
                <Button 
                  variant="success" 
                  onClick={() => setShowCreateForm(true)}
                  className="d-flex align-items-center"
                >
                  <span className="me-2">+</span> Create New List
                </Button>
              </div>

              {showCreateForm && (
                <Card className="mb-4 fade-in">
                  <Card.Body>
                    <Form onSubmit={handleCreateList}>
                      <Row className="align-items-center">
                        <Col md={8}>
                          <Form.Control
                            type="text"
                            placeholder="Enter list name (e.g., Grocery, Electronics, Clothes)"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            autoFocus
                          />
                        </Col>
                        <Col md={4}>
                          <div className="d-flex gap-2">
                            <Button type="submit" variant="success">
                              Create List
                            </Button>
                            <Button 
                              variant="secondary" 
                              onClick={() => setShowCreateForm(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              )}

              <ShoppingListsContainer
                lists={shoppingLists}
                currentUser={currentUser}
                onDeleteList={onDeleteList}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;