import './index.scss';

export default function Lista(props) {
    
    return(
        <div>
            {props.pedidos.map(item => {
                return(
                    <div className='comp-lista'>
                        <p> {item.produto} </p>
                        <p> R$ {item.valor} </p>
                    </div>
                )
            })}
        </div>
    )
}