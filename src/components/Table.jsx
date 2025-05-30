import React from 'react';
import styled, {css} from 'styled-components';

const Table = ({
  columns = [],
  data = [],
  striped = false,
  hoverEffect = true,
  bordered = false,
  compact = true,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick = null,
  className = ''
}) => {
  return (
    <TableContainer className={className}>
      <StyledTable 
        bordered={bordered} 
        compact={compact}
        striped={striped}
      >
        <thead>
          <tr>
            {columns.map((column, index) => (
              <TableHeader 
                key={column.key || index}
                width={column.width}
                align={column.align}
              >
                {column.title}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <EmptyMessage>{emptyMessage}</EmptyMessage>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow 
                key={row.id || rowIndex}
                hoverEffect={hoverEffect}
                onClick={() => onRowClick && onRowClick(row)}
                clickable={!!onRowClick}
              >
                {columns.map((column, colIndex) => (
                  <TableCell 
                    key={colIndex}
                    align={column.align}
                    compact={compact}
                  >
                    {column.render ? column.render(row) : row[column.dataIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

// Styled components
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ compact }) => compact ? '0.875rem' : '1rem'};
  background-color: white;

  ${({ bordered }) => bordered && css`
    border: 1px solid #e2e8f0;
  `}
`;

const TableHeader = styled.td`
  padding: ${({ compact }) => compact ? '0.75rem 1rem' : '1rem 1.5rem'};
  text-align: ${({ align }) => align || 'left'};
  color: #4a5568;
  background-color: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
  width: ${({ width }) => width || 'auto'};
  position: sticky;
  top: 0;
`;

const TableRow = styled.tr`
  transition: all 0.2s ease;
  border-bottom: 1px solid #edf2f7;

  ${({ striped }) => striped && css`
    &:nth-child(even) {
      background-color: #f8fafc;
    }
  `}

  ${({ hoverEffect, clickable }) => hoverEffect && css`
    &:hover {
      background-color: ${clickable ? '#f1f5f9' : 'inherit'};
      ${clickable && 'cursor: pointer;'}
    }
  `}
`;

const TableCell = styled.td`
  padding: ${({ compact }) => compact ? '0.75rem 1rem' : '1rem 1.5rem'};
  text-align: ${({ align }) => align || 'left'};
  color: #4a5568;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
  font-style: italic;
`;

// Simple loader component (you can replace with your own)
const Loader = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #3182ce;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Table;