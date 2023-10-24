
const generationList = {
  generation1: ['red-blue', 'yellow'],
  generation2: ['gold-silver', 'crystal'],
  generation3: ['ruby-sapphire', 'emerald', 'firered-leafgreen', 'colosseum', 'xd'],
  generation4: ['diamond-pearl', 'platinum', 'heartgold-soulsilver'],
  generation5: ['black-white', 'black-2-white-2'],
  generation6: ['x-y','omega-ruby-alpha-sapphire'],
  generation7: ['sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee'],
  generation8: ['sword-shield', 'brilliant-diamond-and-shining-pearl'],
  generation9: ['scarlet-violet']
};


function generationConverter(generation: string) {
  for (const key in generationList) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((generationList as any)[key].includes(generation)) {
      switch (key) {
        case 'generation1':
          return 'rb';
        case 'generation2':
          return 'gs';
        case 'generation3':
          return 'rs';
        case 'generation4':
          return 'dp';
        case 'generation5':
          return 'bw';
        case 'generation6':
          return 'xy';
        case 'generation7':
          return 'sm';
        case 'generation8':
          return 'ss';
        case 'generation9':
          return 'sv';
        default:
          return generation; 
      }
    }
  }
  return generation;
}


export {generationConverter, generationList}