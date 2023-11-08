import { getPokemonNameById } from '../../src/js-foundation/06-promises';


describe("js-foundation/06-promises.ts", () => {
  test("getPokemonById should return a pokemon ", async() => {
    const id =2
    const pokemonName = await getPokemonNameById(1);
    expect(pokemonName).toBe('bulbasaur');
  });
  test("getPokemonById should return an error if pokemon does not exist",async()=>{
    const id = 1000000;
    try {
      await getPokemonNameById(id);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBe(`Pokemon with id ${id} not exist`)
    }
    
    //expect(pokemonName).toBe('Pokemon no existe')
  });
});
