import { gql, useQuery } from "@apollo/client";

const GET_POKEMONS = gql`
  query getPokemons {
    pokemons {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

function App() {
  const { data } = useQuery(GET_POKEMONS);

  return (
    <div>
      {data?.pokemons.results.map((pokemon: any) => {
        return <div key={pokemon.name}>{pokemon.name}</div>;
      })}
    </div>
  );
}

export default App;
