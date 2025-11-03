import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  
  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <p style={{ marginBottom: '10px' }}>
        Trang: {currentPage}/ {totalPages}
      </p>
      
      <button
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        style={{ padding: '10px 15px', marginRight: '10px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: 'white' }}
      >
        &larr; Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)} 
          style={{ 
            padding: '10px 15px', 
            margin: '0 5px', 
            cursor: 'pointer',
            backgroundColor: currentPage === index + 1 ? '#333' : 'white',
            color: currentPage === index + 1 ? 'white' : '#333',
            border: '1px solid #333'
          }}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        style={{ padding: '10px 15px', marginLeft: '10px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: 'white' }}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;