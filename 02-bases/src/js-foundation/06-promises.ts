import { httpClient as http } from '../plugins/index';
export const getPokemonNameById = async( id: number|string ):Promise<string> => {
  const url:string = `https://pokeapi.co/api/v2/pokemon/${ id.toString() }`;

  const pokemon = await http.get( url );

  // const resp = await fetch( url );
  // const pokemon = await resp.json();


  // throw new Error('Pokemon no existe');
  
  return pokemon.name;
  
  // return fetch( url )
  //   .then( ( resp ) => resp.json())
  //   // .then( () => { throw new Error('Pokemon no existe') })
  //   .then( ( pokemon ) => pokemon.name );

}
