import { getHeroeById } from './service/heroe.service';


const hero = getHeroeById(2);
console.log( hero?.name ?? 'Hero not found' );