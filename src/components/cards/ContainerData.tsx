/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPokemonList, clearSelected, selectStatus } from '../../store/PokemonSlice';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: rgb(251, 252, 254);
  padding: 1rem;
  animation: ${fadeIn} 0.5s ease-out both;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SkeletonCard = styled.div`
  height: 150px;
  border-radius: 0.5rem;
  background: #e2e8f0;
  background-image: linear-gradient(
    90deg,
    #e2e8f0 0px,
    #f8fafc 40px,
    #e2e8f0 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const ContainerData: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    dispatch(fetchPokemonList());
    return () => { dispatch(clearSelected()); };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      const t = setTimeout(() => setShowOverlay(false), 300);
      return () => clearTimeout(t);
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <LoadingOverlay>
        <div style={{ width: '80%', maxWidth: 600 }}>
          <SkeletonGrid>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </SkeletonGrid>
        </div>
      </LoadingOverlay>
    );
  }

  if (status === 'failed') {
    return <p style={{ textAlign: 'center', marginTop: '2rem', color: '#e53e3e' }}>Error al cargar los pokemons.</p>;
  }

  return (
    <>
      {showOverlay && (
        <LoadingOverlay style={{ animation: 'opacity 0.3s ease-out forwards', opacity: 1 }} />
      )}
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
};
