import React from "react";
import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchPokemonDetail,
  selectList,
  selectCount, 
  selectCurrentPage,
  setPage 
} from "../../store/PokemonSlice";
import Card from "./Card";

const fade = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: radial-gradient(circle at center, #f0f9ff 0%, #cceaff 100%);
  border-radius: 1.5rem;
  box-shadow: inset 0 0 50px rgba(0, 123, 255, 0.2);
  animation: ${fade} 0.6s ease-out both;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 1rem;
`;

const Titulo = styled.h1`
  text-align: center;
  font-family: 'Pokemon Solid', sans-serif;
  font-size: 3rem;
  color: #ffcb05;
  text-shadow: 2px 2px #3b4cca;
  margin: 1rem 0;
  letter-spacing: 0.1rem;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem 1.25rem;
  border: none;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#3b4cca")} ;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  transition: background 0.3s;
  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#2a3b99")} ;
  }
`;

const PageInfo = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #3b4cca;
`;

const ITEMS_PER_PAGE = 20;

export const CardsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokes = useAppSelector(selectList); 
  const totalCount = useAppSelector(selectCount); 
  const currentPage = useAppSelector(selectCurrentPage);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE); 

  const goToPreviousPage = () => {
    dispatch(setPage(Math.max(currentPage - 1, 0)));
  };

  const goToNextPage = () => {
    dispatch(setPage(Math.min(currentPage + 1, totalPages - 1)));
  };

  return (
    <>
      <Titulo>Pokedéx Go</Titulo>
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

      <Pagination>
        <PageButton
          disabled={currentPage === 0}
          onClick={goToPreviousPage}
        >
          «
        </PageButton>
        <PageInfo>
          Página {currentPage + 1} de {totalPages}
        </PageInfo>
        <PageButton
          disabled={currentPage + 1 >= totalPages}
          onClick={goToNextPage}
        >
          »
        </PageButton>
      </Pagination>
    </>
  );
};