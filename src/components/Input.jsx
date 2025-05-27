import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #e53e3e;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: ${props => props.variant === 'filled' ? '#f7fafc' : 'transparent'};

  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 4px 8px;
          height: 32px;
        `;
      case 'large':
        return css`
          padding: 12px 16px;
          height: 48px;
        `;
      default:
        return css`
          padding: 8px 12px;
          height: 40px;
        `;
    }
  }}

  ${props => {
    if (props.variant === 'flushed') {
      return css`
        border-bottom: 2px solid ${props.hasError ? '#e53e3e' : '#e2e8f0'};
        border-radius: 0;
        &:focus-within {
          border-bottom-color: ${props.hasError ? '#e53e3e' : '#3182ce'};
        }
      `;
    }
    return css`
      border: 1px solid ${props.hasError ? '#e53e3e' : '#e2e8f0'};
      &:focus-within {
        border-color: ${props.hasError ? '#e53e3e' : '#3182ce'};
        box-shadow: 0 0 0 1px ${props.hasError ? '#e53e3e' : '#3182ce'};
      }
    `;
  }}

  ${props =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #2d3748;

  &::placeholder {
    color: #a0aec0;
  }

  ${props => props.hasStartIcon && 'padding-left: 8px;'}
  ${props => props.hasEndIcon && 'padding-right: 8px;'}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #718096;
`;

const Input = forwardRef(
  (
    {
      label,
      error,
      size = 'medium',
      variant = 'outline',
      fullWidth = false,
      startIcon,
      endIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <InputContainer fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <InputWrapper
          hasError={!!error}
          size={size}
          variant={variant}
          disabled={disabled}
        >
          {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            hasStartIcon={!!startIcon}
            hasEndIcon={!!endIcon}
            disabled={disabled}
            {...props}
          />
          {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;