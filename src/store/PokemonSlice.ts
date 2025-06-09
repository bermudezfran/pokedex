/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { PokemonLista, PokemonDetalle, PokemonEnLista } from '../types/Pokemon.type'

interface PokemonState {
  list: PokemonEnLista[]
  selected?: PokemonDetalle
  status: 'idle' | 'loading' | 'failed'
  error?: string
}

const initialState: PokemonState = {
  list: [],
  status: 'idle',
}

export const fetchPokemonList = createAsyncThunk<
  PokemonEnLista[],
  void,
  { rejectValue: string }
>(
  'pokemon/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = (await resp.json()) as PokemonLista;
      return data.results.map(r => {
        const parts = r.url.split('/').filter(Boolean);
        const id = parts[parts.length - 1];
        return {
          name: r.name,
          url: r.url,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
      });
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Unknown error');
    }
  }
);

export const fetchPokemonDetail = createAsyncThunk<
  { url: string; detail: PokemonDetalle },
  { url: string },
  { rejectValue: string }
>(
  'pokemon/fetchDetail',
  async ({ url }, { rejectWithValue }) => {
    try {
      const resp = await fetch(url)
      const data = (await resp.json()) as PokemonDetalle
      return { url, detail: data }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = undefined
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonList.pending, state => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(
        fetchPokemonList.fulfilled,
        (state, action: PayloadAction<PokemonEnLista[]>) => {
          state.status = 'idle'
          state.list = action.payload
        }
      )
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

    builder
      .addCase(fetchPokemonDetail.pending, state => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(
        fetchPokemonDetail.fulfilled,
        (state, action: PayloadAction<{ url: string; detail: PokemonDetalle }>) => {
          state.status = 'idle'
          const { url, detail } = action.payload
          state.list = state.list.map(p =>
            p.url === url ? { ...p, details: detail } : p
          )
          state.selected = detail
        }
      )
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export const { clearSelected } = pokemonSlice.actions

export const selectList = (state: RootState) => state.pokemon.list
export const selectStatus = (state: RootState) => state.pokemon.status
export const selectSelected = (state: RootState) => state.pokemon.selected

export default pokemonSlice.reducer
