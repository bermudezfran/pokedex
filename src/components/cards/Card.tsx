import React from 'react'
import styled from 'styled-components'

interface CardProps {
  name: string
  onClick: () => void
  imageUrl?: string
}

const CardContainer = styled.div`
  cursor: pointer;
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 0.5rem;
`

const CardTitle = styled.h3`
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;
  margin: 0;
`

const Card: React.FC<CardProps> = ({ name, onClick, imageUrl }) => (
  <CardContainer onClick={onClick}>
    {imageUrl && <CardImage src={imageUrl} alt={name} />}
    <CardTitle>{name}</CardTitle>
  </CardContainer>
)

export default Card
