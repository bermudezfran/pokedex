import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPokemonDetail, selectList } from "../../store/PokemonSlice";
import Card from "./Card";

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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 1rem;
`;

const Titulo = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 1rem;
`;


const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #4c51bf;
  background: ${({ disabled }) => (disabled ? "#e2e8f0" : "#667eea")};
  color: ${({ disabled }) => (disabled ? "#a0aec0" : "white")};
  border-radius: 0.375rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const ITEMS_PER_PAGE = 20;

export const CardsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokes = useAppSelector(selectList);
  const [page, setPage] = useState(0);

  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pagedList = pokes.slice(start, end);
  const totalPages = Math.ceil(pokes.length / ITEMS_PER_PAGE);

  return (
    <>
    <Titulo>
        <span style={{fontSize: 40, fontWeight: 'bold', color: '#4c51bf'}}>Pokedex</span>
    </Titulo>
      <Grid>
        {pagedList.map((p) => (
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
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          {"<"}
        </PageButton>
        <span>
          Página {page + 1} de {totalPages}
        </span>
        <PageButton
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        >
          {">"}
        </PageButton>
      </Pagination>
    </>
  );
};
