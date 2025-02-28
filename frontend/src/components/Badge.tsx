import React from 'react'

import { Badge } from 'react-bootstrap';

interface BadgeProps {
    variant: "GAIN" | "SPENT" | "INVESTMENT";
}

const BadgeComponent: React.FC<BadgeProps> = ({ variant }) => {
  return (
    <Badge className={`transacion-badge ${variant === "GAIN" ? "badge-primary" : variant === "SPENT" ? "badge-secondary" : "badge-tertialy"}`}>
        <div className="badge-circle"/>
        { variant === "GAIN" ? "Ganho" : variant === "SPENT" ? "Gasto" : "Investimento" }
    </Badge>
  )
}

export default BadgeComponent;
