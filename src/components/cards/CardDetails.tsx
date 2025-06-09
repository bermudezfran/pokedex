/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectSelected, clearSelected } from '../../store/PokemonSlice';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
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
  background: #f5f5f5;
  border: 8px solid #c80000;
  border-radius: 1rem;
  width: 320px;
  max-width: 90%;
  box-shadow: inset 0 0 0 4px #eeeeee;
  animation: ${fadeIn} 0.3s ease-out both;
  position: relative;
  padding: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -12px;
  right: -12px;
  background: #c80000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  cursor: pointer;
`;

const Header = styled.div`
  background: #c80000;
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem 0.5rem 0 0;
  font-weight: bold;
  text-transform: capitalize;
`;

const Img = styled.img`
  display: block;
  width: 160px;
  height: 160px;
  margin: 0.5rem auto;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const InfoItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

const Label = styled.span`
  font-weight: 600;
`;

export const CardDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const poke = useAppSelector(selectSelected);

  if (!poke) return null;

  return (
    <Overlay onClick={() => dispatch(clearSelected())}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={() => dispatch(clearSelected())}>×</CloseButton>
        <Header>{poke.name} #{poke.id}</Header>
        <Img src={poke.sprites.front_default} alt={poke.name} />
        <InfoList>
          <InfoItem>
            <Label>Altura:</Label><span>{poke.height}</span>
          </InfoItem>
          <InfoItem>
            <Label>Peso:</Label><span>{poke.weight}</span>
          </InfoItem>
          <InfoItem>
            <Label>Tipos:</Label><span>{poke.types.map(t => t.type.name).join(', ')}</span>
          </InfoItem>
          <InfoItem>
            <Label>Habilidades:</Label><span>{poke.abilities.map(a => a.ability.name).join(', ')}</span>
          </InfoItem>
        </InfoList>
      </Modal>
    </Overlay>
  );
};