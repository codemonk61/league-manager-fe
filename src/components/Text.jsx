import React from 'react';
import styled, { css } from 'styled-components';

const Text = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight = 'normal',
  gutterBottom = false,
  noWrap = false,
  ...props
}) => {
  return (
    <StyledText
      variant={variant}
      color={color}
      align={align}
      weight={weight}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      {...props}
    >
      {children}
    </StyledText>
  );
};

// Styled components
const StyledText = styled.p`
  margin: 0;
  padding: 0;
  line-height: 1.5;
  transition: color 0.2s ease;

  // Variant styles
  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return css`
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
        `;
      case 'h2':
        return css`
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.3;
        `;
      case 'h3':
        return css`
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.4;
        `;
      case 'h4':
        return css`
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
        `;
      case 'h5':
        return css`
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.5;
        `;
      case 'h6':
        return css`
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
        `;
      case 'subtitle':
        return css`
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.5;
        `;
      case 'caption':
        return css`
          font-size: 0.75rem;
          line-height: 1.5;
        `;
      case 'overline':
        return css`
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.5;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        `;
      default: // body
        return css`
          font-size: 1rem;
          line-height: 1.5;
        `;
    }
  }}

  // Color variants
  ${({ color }) => {
    switch (color) {
      case 'secondary':
        return css`
          color: #6b7280;
        `;
      case 'error':
        return css`
          color: #ef4444;
        `;
      case 'warning':
        return css`
          color: #f59e0b;
        `;
      case 'success':
        return css`
          color: #10b981;
        `;
      case 'disabled':
        return css`
          color: #d1d5db;
        `;
      default: // primary
        return css`
          color: #111827;
        `;
    }
  }}

  // Text alignment
  text-align: ${({ align }) => align};

  // Font weight
  font-weight: ${({ weight }) => weight};

  // Margin bottom
  ${({ gutterBottom }) => gutterBottom && css`
    margin-bottom: 0.5em;
  `}

  // No wrap
  ${({ noWrap }) => noWrap && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export default Text;