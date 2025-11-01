import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ArchivedListsContainer from './ArchivedListsContainer';
import { Container, Row, Col } from 'react-bootstrap';

const ArchivedPage = ({ archivedLists, currentUser, onRestoreList }) => {
  return (
    <div className="archived-page">
      <Header currentUser={currentUser} />
      <Container fluid>
        <Row>
          <Col md={3} className="desktop-only">
            <Sidebar activeRoute="/archived" />
          </Col>
          <Col md={9}>
            <div className="main-content p-3">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Archived Shopping Lists</h2>
              </div>

              <ArchivedListsContainer
                archivedLists={archivedLists}
                currentUser={currentUser}
                onRestoreList={onRestoreList}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ArchivedPage;