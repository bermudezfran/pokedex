import { render, screen, fireEvent } from '@testing-library/react'
import Card from '../components/cards/Card'

describe('Card', () => {
  const name = 'pikachu'
  const imageUrl = 'https://example.com/pikachu.png'
  const onClick = jest.fn()

  beforeEach(() => {
    onClick.mockClear()
  })

  it('renderiza el nombre capitalizado', () => {
    render(<Card name={name} imageUrl={imageUrl} onClick={onClick} />)
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toHaveTextContent('Pikachu')
  })

  it('muestra la imagen cuando imageUrl está definido', () => {
    render(<Card name={name} imageUrl={imageUrl} onClick={onClick} />)
    const img = screen.getByRole('img', { name: /pikachu/i })
    expect(img).toHaveAttribute('src', imageUrl)
  })

  it('no muestra <img> si imageUrl es undefined', () => {
    render(<Card name={name} onClick={onClick} />)
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('dispara onClick al hacer click en el contenedor', () => {
    render(<Card name={name} imageUrl={imageUrl} onClick={onClick} />)
    fireEvent.click(screen.getByText(/pikachu/i))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
