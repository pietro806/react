import './index.scss';


export default function Card(props) {
    return(
        <div className='comp-card'>
            <img src={props.lista.imagem} />
            <h3> {props.lista.nome} </h3>
            <div className='detalhes'>
                <p>{props.lista.detalhes}</p>
            </div>
        </div>
    )
}