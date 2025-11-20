
import React from 'react';
import { Card } from 'react-bootstrap';

const StatCard = ({ title, value, unit }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body className="p-3">
        <h3 className="fs-6 fw-medium mb-2">{title}</h3>
        <div className="d-flex align-items-baseline gap-2">
          <span className="fs-2 fw-bold">{value}</span>
          <span className="text-muted small">{unit}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;