import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiX } from 'react-icons/fi';



const Popup = ({
  isOpen,
  onClose,
  title,
  children,
  width = '500px',
  showCloseButton = true,
  overlayClose = true,
  animation = 'fade',
  customStyles = {}
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay 
      onClick={overlayClose ? onClose : undefined}
      animation={animation}
    >
      <PopupContainer 
        width={width}
        onClick={(e) => e.stopPropagation()}
        animation={animation}
        style={customStyles}
      >
        {(title || showCloseButton) && (
          <Header>
            {title && <Title>{title}</Title>}
            {showCloseButton && (
              <CloseButton onClick={onClose}>
                <FiX size={20} />
              </CloseButton>
            )}
          </Header>
        )}
        <Content>{children}</Content>
      </PopupContainer>
    </Overlay>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.9);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(5px);
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: ${(props) => props.width};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${(props) => 
    props.animation === 'slide-up' ? slideUp :
    props.animation === 'zoom' ? zoomIn :
    fadeIn} 0.3s ease;

  @media (max-width: 768px) {
    width: 95vw;
    max-height: 85vh;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  border-radius: 12px 12px 0 0;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: #333;
    background: #f5f5f5;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

export default Popup;