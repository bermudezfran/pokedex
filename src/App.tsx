import { ContainerData } from './components/cards/ContainerData';
import { CardDetails } from './components/cards/CardDetails';
import { CardsContainer } from './components/cards/CardsContainer';

function App() {
  return (
    <ContainerData>
      <CardsContainer />
      <CardDetails />
    </ContainerData>
  );
}

export default App;
