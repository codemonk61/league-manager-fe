import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Tabs = ({ tabs, defaultActiveTab = 0, variant = 'underline', fullWidth = false }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <TabsContainer>
      <TabList variant={variant} fullWidth={fullWidth}>
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            isActive={activeTab === index}
            variant={variant}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabList>
      <TabContent>
        {tabs[activeTab].content}
      </TabContent>
    </TabsContainer>
  );
};

// Styled components
const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: ${({ variant }) => variant === 'underline' ? '1px solid #e2e8f0' : 'none'};
  gap: ${({ variant }) => variant === 'underline' ? '0' : '8px'};
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
`;

const TabItem = styled.button`
  cursor: pointer;
  padding: 12px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border: none;
  background: none;
  position: relative;
  transition: all 0.2s ease;
  color: ${({ isActive }) => isActive ? '#3182ce' : '#4a5568'};

  ${({ variant, isActive }) => {
    switch (variant) {
      case 'pill':
        return css`
          border-radius: 6px;
          background-color: ${isActive ? '#ebf8ff' : 'transparent'};
          
          &:hover {
            background-color: ${isActive ? '#ebf8ff' : '#f7fafc'};
          }
        `;
      default: // underline
        return css`
          border-bottom: 2px solid ${isActive ? '#3182ce' : 'transparent'};
          
          &:hover {
            color: #3182ce;
            background-color: ${isActive ? 'transparent' : '#f7fafc'};
          }
        `;
    }
  }}

  ${({ fullWidth }) => fullWidth && css`
    flex: 1;
    text-align: center;
  `}
`;

const TabContent = styled.div`
  padding: 16px 0;
`;

export default Tabs;