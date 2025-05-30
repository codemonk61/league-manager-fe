import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Loader = ({ 
  size = 'medium', 
  variant = 'spinner', 
  color = '#3182ce',
  fullPage = false 
}) => {
  return (
    <LoaderContainer fullPage={fullPage}>
      {variant === 'spinner' && (
        <Spinner size={size} color={color} />
      )}
      {variant === 'dots' && (
        <DotLoader size={size} color={color}>
          <div></div>
          <div></div>
          <div></div>
        </DotLoader>
      )}
      {variant === 'bar' && (
        <BarLoader size={size} color={color} />
      )}
    </LoaderContainer>
  );
};

// Container
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  ${({ fullPage }) => fullPage && css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 1000;
  `}
`;

// Spinner Variant
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid ${({ color }) => color};
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '20px';
      case 'large': return '40px';
      default: return '30px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '20px';
      case 'large': return '40px';
      default: return '30px';
    }
  }};
  animation: ${spin} 0.8s linear infinite;
`;

// Dots Variant
const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const DotLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ size }) => {
    switch (size) {
      case 'small': return '4px';
      case 'large': return '8px';
      default: return '6px';
    }
  }};

  div {
    width: ${({ size }) => {
      switch (size) {
        case 'small': return '8px';
        case 'large': return '16px';
        default: return '12px';
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'small': return '8px';
        case 'large': return '16px';
        default: return '12px';
      }
    }};
    background-color: ${({ color }) => color};
    border-radius: 50%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;

// Bar Variant
const barAnimation = keyframes`
  0% { transform: scaleX(0); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0.5; }
`;

const BarLoader = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '100px';
      case 'large': return '200px';
      default: return '150px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '4px';
      case 'large': return '8px';
      default: return '6px';
    }
  }};
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ color }) => color};
    animation: ${barAnimation} 1.5s infinite ease-in-out;
    transform-origin: left;
  }
`;

export default Loader;