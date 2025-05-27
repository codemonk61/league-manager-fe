import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      {...props}
    >
      {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
      {children}
      {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
    </StyledButton>
  );
};

// Styled components
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  // Size variants
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 8px 12px;
          font-size: 12px;
        `;
      case 'large':
        return css`
          padding: 14px 24px;
          font-size: 16px;
        `;
      default: // medium
        return css`
          padding: 10px 16px;
          font-size: 14px;
        `;
    }
  }}

  // Color variants
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: #f7fafc;
          color: #2d3748;
          border: 1px solid #e2e8f0;
          
          &:hover:not(:disabled) {
            background-color: #edf2f7;
            border-color: #cbd5e0;
          }
          
          &:active:not(:disabled) {
            background-color: #e2e8f0;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: #3182ce;
          
          &:hover:not(:disabled) {
            background-color: #ebf8ff;
          }
          
          &:active:not(:disabled) {
            background-color: #bee3f8;
          }
        `;
      default: // primary
        return css`
          background-color: #3182ce;
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #2c5282;
          }
          
          &:active:not(:disabled) {
            background-color: #2a4365;
          }
        `;
    }
  }}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  
  svg {
    width: 1em;
    height: 1em;
  }
`;

export default Button;