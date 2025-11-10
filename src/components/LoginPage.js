import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Always define users locally
  const users = [
    { id: 'user1', username: 'owner', password: '123', name: 'John Doe', isOwner: true },
    { id: 'user2', username: 'jane', password: '123', name: 'Jane Smith', isOwner: false },
    { id: 'user3', username: 'bob', password: '123', name: 'Bob Johnson', isOwner: false },
    { id: 'user4', username: 'alice', password: '123', name: 'Alice Brown', isOwner: false }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials! Try: owner/123, jane/123, bob/123, alice/123');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">🛒 Shopping List App</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
          <div className="mt-3 text-center text-muted">
            <small>Demo users: owner/123, jane/123, bob/123, alice/123</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;