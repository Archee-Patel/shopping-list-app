import React from 'react';
import ArchivedListCard from './ArchivedListCard';
import { Row, Col, Alert } from 'react-bootstrap';

const ArchivedListsContainer = ({ archivedLists, currentUser, onRestoreList }) => {
  if (archivedLists.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        <h5>No archived lists</h5>
        <p className="mb-0">When you archive lists, they will appear here.</p>
      </Alert>
    );
  }

  return (
    <div className="archived-lists-container">
      <Row>
        {archivedLists.map(list => (
          <Col key={list.id} xl={4} lg={6} md={6} className="mb-4">
            <ArchivedListCard
              id={list.id}
              name={list.name}
              memberCount={list.members.length}
              itemCount={list.items.length}
              archivedDate={list.archivedDate}
              onRestore={() => onRestoreList(list.id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ArchivedListsContainer;