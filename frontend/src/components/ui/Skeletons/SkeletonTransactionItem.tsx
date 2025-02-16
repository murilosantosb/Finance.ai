"use client";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";

const SkeletonTransactionList = () => {
  return (
    
      <ListGroup variant="flush">
        {[...Array(11)].map((_, index) => (
          <ListGroup.Item key={index} className="skeleton-item">
            <div className="skeleton-glow skeleton-icon"></div>
            <Col className="skeleton-details">
              <div className="skeleton-glow skeleton-text-lg"></div>
              <div className="skeleton-glow skeleton-text-sm"></div>
            </Col>
            <div className="skeleton-glow skeleton-value"></div>
          </ListGroup.Item>
        ))}
      </ListGroup>
  );
};

export default SkeletonTransactionList;

