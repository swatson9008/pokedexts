export default function RandomizedSpritesTemp(){

    const pickARandomSprite = () => {
        const pokeNo = Math.floor(Math.random() * (1010 - 1 + 1) + 1)
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNo}.png`
    }

    return(
        <>
        <img src={pickARandomSprite()} alt=""/>
        </>

    )
}