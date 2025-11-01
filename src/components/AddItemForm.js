import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() && quantity.trim()) {
      onAddItem(itemName.trim(), quantity.trim());
      setItemName('');
      setQuantity('');
    }
  };

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">Add New Item</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-end">
            <Col md={5}>
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label className="small">Item Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Milk, Eggs, Bread"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={3}>
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label className="small">Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., 2 kg, 1 liter"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Button type="submit" variant="success" className="w-100">
                + Add Item
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddItemForm;