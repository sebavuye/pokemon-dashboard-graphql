import { useQuery } from "@apollo/client";
import { gql } from "./__generated__";

const GET_POKEMONS = gql(`
query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
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
}`);

function App() {
  const { data } = useQuery(GET_POKEMONS);

  return (
    <div>
      {data?.pokemons?.results?.map((pokemon) => {
        return <div key={pokemon?.name}>{pokemon?.name}</div>;
      })}
    </div>
  );
}

export default App;
