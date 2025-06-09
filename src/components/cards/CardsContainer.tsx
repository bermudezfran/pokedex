import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPokemonDetail, selectList } from '../../store/PokemonSlice';
import Card from './Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const CardsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokes = useAppSelector(selectList);

  return (
    <Grid>
      {pokes.map((p) => (
        <Card
          key={p.url}
          name={p.name}
          imageUrl={p.imageUrl}
          onClick={() => dispatch(fetchPokemonDetail({ url: p.url }))}
        />
      ))}
    </Grid>
  );
};

