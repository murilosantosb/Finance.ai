"use client";

// Hooks
import React, { useState, useEffect } from 'react'
import pagesStore from '@/store/pagesStore';

// Components
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  totalPages?: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalPages }) => {
    const [active, setActive] = useState(1);
    const [rangeStart, setRangerStart] = useState(1);
    const { setPage, page } = pagesStore();

    const itemsPerPage = 14;

    useEffect(() => {
        setPage(active);
    }, [active, setPage, page]);

    const renderPaginationItems = () => {
        const items = [];
        const rangeEnd = Math.min(rangeStart + itemsPerPage - 1, Number(totalPages));

        for(let number = rangeStart; number <= rangeEnd; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === active}
                    onClick={() => setActive(number)}
                    >
                        {number}
                </Pagination.Item>
            )
        }
        return items;
    };

    const handleNextRange = () => {
        if(rangeStart + itemsPerPage <= Number(totalPages)) {
            setRangerStart(rangeStart + itemsPerPage);
            setActive(rangeStart + itemsPerPage);
        }
    }

    const handlePrevRange = () => {
        if (rangeStart - itemsPerPage > 0) {
          setRangerStart(rangeStart - itemsPerPage);
          setActive(rangeStart - itemsPerPage);
        }
      };

  return (
    <>
  <Pagination className="d-flex justify-content-center p-2">
    <Pagination.First onClick={() => {
      setActive(1);
      setRangerStart(1); 
    }} />
    <Pagination.Prev
      onClick={() => {
        setActive(Math.max(1, active - 1));
        if (active === rangeStart && rangeStart > 1) {
          handlePrevRange();
        }
      }}
    />
    {renderPaginationItems()}
    {rangeStart + itemsPerPage - 1 < Number(totalPages) && <Pagination.Ellipsis />}
    <Pagination.Next
      onClick={() => {
        setActive(Math.min(Number(totalPages), active + 1));
        if (active === rangeStart + itemsPerPage - 1 && active < Number(totalPages)) {
          handleNextRange();
        }
      }}
    />
    <Pagination.Last
      onClick={() => {
        setActive(Number(totalPages));
        setRangerStart(Math.floor((Number(totalPages) - 1) / itemsPerPage) * itemsPerPage + 1); 
      }}
    />
  </Pagination>
    </>
  )
}

export default PaginationComponent;