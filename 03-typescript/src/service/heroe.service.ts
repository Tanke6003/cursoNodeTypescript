import { heroes } from '../data/heroes';
export const getHeroeById = (id:number) => {
    return heroes.find( (heroe) => heroe.id === id )??null;
}
