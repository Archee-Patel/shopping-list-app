import React, { useState } from 'react';
import { Card, Badge, Button, ListGroup, Modal, Form, Alert } from 'react-bootstrap';

const ListHeader = ({ listName, isOwner, members, currentUser, onArchive, onRemoveMember, onAddMember }) => {
  const [showMembers, setShowMembers] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Available users to add (excluding current members)
  const availableUsers = [
    { id: 'user2', name: 'Jane Smith', email: 'jane@email.com' },
    { id: 'user3', name: 'Bob Johnson', email: 'bob@email.com' },
    { id: 'user4', name: 'Alice Brown', email: 'alice@email.com' }
  ].filter(user => !members.some(member => member.id === user.id));

  const handleRemoveMember = (memberId) => {
    if (window.confirm('Remove this member?')) {
      onRemoveMember(memberId);
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMemberEmail.trim()) {
      const userToAdd = availableUsers.find(user => 
        user.email === newMemberEmail || user.name.toLowerCase().includes(newMemberEmail.toLowerCase())
      );
      
      if (userToAdd) {
        onAddMember(userToAdd);
        setNewMemberEmail('');
        setShowAddMember(false);
      } else {
        alert('User not found! Available users: jane@email.com, bob@email.com, alice@email.com');
      }
    }
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <h2 className="mb-0 me-2">{listName}</h2>
              {isOwner && <Badge bg="primary" className="ms-2">Owner</Badge>}
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button 
                variant="outline-info" 
                size="sm"
                onClick={() => setShowMembers(true)}
              >
                👥 Members ({members.length})
              </Button>
              
              {isOwner && (
                <Button variant="outline-warning" size="sm" onClick={onArchive}>
                  📁 Archive
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Members Management Modal */}
      <Modal show={showMembers} onHide={() => setShowMembers(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>List Members Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add Member Section - Only for Owner */}
          {isOwner && (
            <div className="mb-4 p-3 border rounded">
              <h6>Add New Member</h6>
              <Form onSubmit={handleAddMember} className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Enter email or name (jane@email.com, bob@email.com, alice@email.com)"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  list="availableUsers"
                />
                <datalist id="availableUsers">
                  {availableUsers.map(user => (
                    <option key={user.id} value={user.email}>
                      {user.name}
                    </option>
                  ))}
                </datalist>
                <Button type="submit" variant="success" size="sm">
                  + Add
                </Button>
              </Form>
              <small className="text-muted">
                Available users: {availableUsers.map(u => u.name).join(', ')}
              </small>
            </div>
          )}

          {/* Members List */}
          <h6>Current Members ({members.length})</h6>
          <ListGroup variant="flush">
            {members.map(member => (
              <ListGroup.Item key={member.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{member.name}</strong>
                  {member.isOwner && <Badge bg="primary" className="ms-2">Owner</Badge>}
                  {member.id === currentUser.id && <Badge bg="success" className="ms-2">You</Badge>}
                  <br />
                  <small className="text-muted">{member.email}</small>
                </div>
                
                {/* Remove buttons - different rules for owner vs members */}
                <div>
                  {isOwner && !member.isOwner && (
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Remove
                    </Button>
                  )}
                  
                  {!isOwner && member.id === currentUser.id && (
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Leave List
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {members.length === 0 && (
            <Alert variant="info" className="text-center mt-3">
              No members in this list yet.
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMembers(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListHeader;