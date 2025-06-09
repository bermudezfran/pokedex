import React from 'react'
import styled from 'styled-components'

interface CardProps {
  name: string
  onClick?: () => void
  imageUrl?: string
}

const CardContainer = styled.div<{ clickable: boolean }>`
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  &:hover {
    ${({ clickable }) =>
      clickable
        ? `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);`
        : ''}
  }
`;

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h3`
  text-align: center;
  font-weight: 600;
  margin: 0;
`;

const Card: React.FC<CardProps> = ({ name, onClick, imageUrl }) => {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <CardContainer onClick={onClick} clickable={!!onClick}>
      {imageUrl && <CardImage src={imageUrl} alt={displayName} />}
      <CardTitle>{displayName}</CardTitle>
    </CardContainer>
  )
}

export default Card
