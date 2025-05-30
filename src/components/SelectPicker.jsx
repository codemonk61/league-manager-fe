import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FiChevronDown, FiX } from 'react-icons/fi';

const SelectPicker = ({
  options = [],
  value = null,
  onChange = () => {},
  placeholder = 'Select an option',
  label = '',
  error = '',
  disabled = false,
  clearable = true,
  size = 'medium',
  variant = 'outline',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    console.log(optionValue,">.handleSelect")
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };


  return (
    <SelectContainer {...props}>
      {label && <Label>{label}</Label>}
      
      <SelectWrapper
        onClick={() => !disabled && setIsOpen(!isOpen)}
        isOpen={isOpen}
        disabled={disabled}
        size={size}
        variant={variant}
        hasError={!!error}
      >
        <SelectedValue>
          {selectedOption ? (
            <>
              {selectedOption.icon && <IconWrapper>{selectedOption.icon}</IconWrapper>}
              {selectedOption.label}
            </>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
        </SelectedValue>

        <IconsContainer>
          {clearable && value && (
            <ClearButton onClick={handleClear}>
              <FiX size={16} />
            </ClearButton>
          )}
          <ArrowIcon isOpen={isOpen}>
            <FiChevronDown size={18} />
          </ArrowIcon>
        </IconsContainer>

        {isOpen && (
          <Dropdown>
            {options.map(option => (
              <DropdownItem
                key={option.value}
                onClick={() => handleSelect(option.value)}
                isSelected={value === option.value}
              >
                {option.icon && <IconWrapper>{option.icon}</IconWrapper>}
                {option.label}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </SelectWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectContainer>
  );
};

// Styled components
const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
`;

const SelectWrapper = styled.div`
  position: relative;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  border-radius: 6px;
  background-color: ${({ variant }) => variant === 'filled' ? '#f7fafc' : 'white'};

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 6px 12px;
          min-height: 32px;
        `;
      case 'large':
        return css`
          padding: 12px 16px;
          min-height: 48px;
        `;
      default: // medium
        return css`
          padding: 10px 14px;
          min-height: 40px;
        `;
    }
  }}

  ${({ variant, hasError }) => {
    if (variant === 'flushed') {
      return css`
        border-bottom: 2px solid ${hasError ? '#e53e3e' : '#e2e8f0'};
        border-radius: 0;
        padding-left: 0;
        background-color: transparent;
      `;
    }
    return css`
      border: 1px solid ${hasError ? '#e53e3e' : '#e2e8f0'};
      &:hover {
        border-color: ${hasError ? '#e53e3e' : '#cbd5e0'};
      }
    `;
  }}

  ${({ isOpen, hasError }) => isOpen && css`
    border-color: ${hasError ? '#e53e3e' : '#3182ce'};
    box-shadow: 0 0 0 1px ${hasError ? '#e53e3e' : '#3182ce'};
    outline: none;
  `}

  ${({ disabled }) => disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #f7fafc;
  `}
`;

const SelectedValue = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Placeholder = styled.span`
  color: #a0aec0;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  color: #718096;
`;

const ClearButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #edf2f7;
    color: #e53e3e;
  }
`;

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  transform: rotate(${({ isOpen }) => isOpen ? '180deg' : '0'});
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 4px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  border: 1px solid #e2e8f0;
`;

const DropdownItem = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: ${({ isSelected }) => isSelected ? '#ebf8ff' : 'transparent'};
  color: ${({ isSelected }) => isSelected ? '#3182ce' : '#4a5568'};

  &:hover {
    background-color: ${({ isSelected }) => isSelected ? '#ebf8ff' : '#f7fafc'};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #e53e3e;
`;

export default SelectPicker;