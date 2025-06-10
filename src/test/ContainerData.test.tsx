import { render, screen } from '@testing-library/react'
import * as hooks from '../store/hooks'
import { ContainerData } from '../components/cards/ContainerData'

jest.mock('../store/hooks')

describe('ContainerData', () => {
  const fakeDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(hooks.useAppDispatch as jest.Mock).mockReturnValue(fakeDispatch)
  })

  it('muestra skeletons mientras status es loading', () => {
    ;(hooks.useAppSelector as jest.Mock).mockReturnValue('loading')
    render(
      <ContainerData>
        <div>Child</div>
      </ContainerData>
    )
    const skeletons = screen.getAllByTestId('skeleton-card')
    expect(skeletons.length).toBe(20)
  })

  it('muestra mensaje de error cuando status es failed', () => {
    ;(hooks.useAppSelector as jest.Mock).mockReturnValue('failed')
    render(
      <ContainerData>
        <div>Child</div>
      </ContainerData>
    )
    expect(screen.getByText(/Error al cargar los pokemons/i)).toBeInTheDocument()
  })

  it('renderiza children cuando status es idle', () => {
    ;(hooks.useAppSelector as jest.Mock).mockReturnValue('idle')
    render(
      <ContainerData>
        <div data-testid="child-content">Child Content</div>
      </ContainerData>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })
})
