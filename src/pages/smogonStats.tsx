import { Smogon } from '@pkmn/smogon';
import { Generations } from '@pkmn/data';
import { Dex } from '@pkmn/dex';
import { generationConverter } from '../components/generationConverter';
import fetch from 'node-fetch';

async function fetchSmogonSets(pokeName: string, gen: string | number) {
  let genString = typeof gen === 'number' ? gen.toString() : gen;

  if (generationConverter(genString) === "rb") { genString = "1" }
  if (generationConverter(genString) === "gs") { genString = "2" }
  if (generationConverter(genString) === "rs") { genString = "3" }
  if (generationConverter(genString) === "dp") { genString = "4" }
  if (generationConverter(genString) === "bw") { genString = "5" }
  if (generationConverter(genString) === "xy") { genString = "6" }
  if (generationConverter(genString) === "sm") { genString = "7" }
  if (generationConverter(genString) === "ss") { genString = "8" }
  if (generationConverter(genString) === "sv") { genString = "9" }

  try {
    const gens = new Generations(Dex);
    const smogon = new Smogon(fetch); 
    const analyses = await smogon.analyses(gens.get(genString), pokeName);
  
    if (Array.isArray(analyses)) {
      console.log(analyses);
      return analyses;
    } else {
      console.error('Error fetching Smogon sets:', analyses);
      return null;
    }
  } catch (error) {
    console.error('Error fetching Smogon sets:', error);
    return null;
  }
}



const SmogonSets = ({ pokeName, gen }: { pokeName: string; gen: string | number }) => {
  const fetchAndDisplaySets = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sets = await fetchSmogonSets(pokeName, gen);
    console.log(sets)
  };

  fetchAndDisplaySets();

  return <div>{}</div>;
};

export default SmogonSets;
