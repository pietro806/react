import './index.scss';

export default function Pokemon(props) {
    return(
        <div className='comp-pokemon'>
            <div>
                <img src={props.pokemons.imagem} alt='imagem-pokemon'/>
            </div>
            <h3>{props.pokemons.nome}</h3>
            <p>{props.pokemons.tipo}</p>
        </div>
    )
}