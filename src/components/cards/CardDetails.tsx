/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectSelected, clearSelected } from '../../store/PokemonSlice';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div.attrs({ 'data-testid': 'overlay' } as any)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 0.75rem;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  animation: ${fadeIn} 0.3s ease-out both;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const Img = styled.img`
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
`;

const Title = styled.h2`
  text-transform: capitalize;
  text-align: center;
  margin: 0.5rem 0;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
  strong { font-weight: 600; }
`;

export const CardDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const poke = useAppSelector(selectSelected);

  if (!poke) return null;

  return (
    <Overlay onClick={() => dispatch(clearSelected())}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(clearSelected())}>&times;</CloseButton>
        <Img src={poke.sprites.front_default} alt={poke.name} />
        <Title>{poke.name} (#{poke.id})</Title>
        <InfoList>
          <InfoItem>
            <strong>Altura:</strong> {poke.height}
          </InfoItem>
          <InfoItem>
            <strong>Peso:</strong> {poke.weight}
          </InfoItem>
          <InfoItem>
            <strong>Tipos:</strong> {poke.types.map(t => t.type.name).join(', ')}
          </InfoItem>
          <InfoItem>
            <strong>Habilidades:</strong> {poke.abilities.map(a => a.ability.name).join(', ')}
          </InfoItem>
        </InfoList>
      </Modal>
    </Overlay>
  );
};
