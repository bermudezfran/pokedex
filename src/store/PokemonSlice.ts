/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { PokemonLista, PokemonDetalle, PokemonEnLista } from '../types/Pokemon.type'

interface PokemonState {
  list: PokemonEnLista[]
  count: number            
  selected?: PokemonDetalle
  status: 'idle' | 'loading' | 'failed'
  error?: string
  currentPage: number; 
}

const initialState: PokemonState = {
  list: [],
  count: 0,
  status: 'idle',
  currentPage: 0, 
}

export const fetchPokemonList = createAsyncThunk<
  { pokes: PokemonEnLista[]; count: number },
  number, 
  { rejectValue: string }
>(
  'pokemon/fetchList',
  async (pageIndex, { rejectWithValue }) => { 
    try {
      const limit  = 20
      const offset = pageIndex * limit 
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      const data = (await resp.json()) as PokemonLista

      const pokes = data.results.map(r => {
        const parts = r.url.split('/').filter(Boolean)
        const id    = parts[parts.length - 1]
        return {
          name:     r.name,
          url:      r.url,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        } as PokemonEnLista
      })

      return { pokes, count: data.count }
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Unknown error')
    }
  }
)

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
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Unknown error')
    }
  }
)

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = undefined
    },
    
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonList.pending, state => {
        state.status = 'loading'
        state.error  = undefined
        state.list = []; 
      })
      .addCase(fetchPokemonList.fulfilled,
        (state, action: PayloadAction<{ pokes: PokemonEnLista[]; count: number }>) => {
          state.status = 'idle'
          state.list   = action.payload.pokes
          state.count  = action.payload.count
        }
      )
      .addCase(fetchPokemonList.rejected,
        (state, action) => {
          state.status = 'failed'
          state.error  = action.payload
          state.list = []; 
        }
      )

    builder
      .addCase(fetchPokemonDetail.pending, state => {
        state.status = 'loading'
        state.error  = undefined
      })
      .addCase(fetchPokemonDetail.fulfilled,
        (state, action: PayloadAction<{ url: string; detail: PokemonDetalle }>) => {
          state.status = 'idle'
          const { url, detail } = action.payload
          state.list = state.list.map(p =>
            p.url === url ? { ...p, details: detail } : p
          )
          state.selected = detail
        }
      )
      .addCase(fetchPokemonDetail.rejected,
        (state, action) => {
          state.status = 'failed'
          state.error  = action.payload
        }
      )
  }
})

export const { clearSelected, setPage } = pokemonSlice.actions 
export const selectList   = (state: RootState) => state.pokemon.list
export const selectCount  = (state: RootState) => state.pokemon.count 
export const selectStatus = (state: RootState) => state.pokemon.status
export const selectSelected = (state: RootState) => state.pokemon.selected
export const selectCurrentPage = (state: RootState) => state.pokemon.currentPage; 

export default pokemonSlice.reducer