import { mons } from '../app/utils/mons.js';
import fs from 'fs';

const pokemons = [];

for (const url of mons) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        pokemons.push({
            name: data.name,
            sprite:
                data.sprites?.other?.['official-artwork']?.front_default ||
                data.sprites?.front_default,
        });
    } catch (err) {
        console.error(`Failed to fetch ${url}:`, err);
    }
}

fs.writeFileSync('public/pokemon.json', JSON.stringify(pokemons));
