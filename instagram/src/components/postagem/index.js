import './index.scss';


export default function Postagem(props){
    return(
        <div className='comp-postagem'>
            <section className='detalhes1'>
                <img src={props.postagens.avatar} alt='img-avatar'/>
                <div className='usuario'>
                    <h5>{props.postagens.usuario} </h5>
                    <img src='/assets/images/icon-correct.png' alt='correct' />
                </div>
                <div className='tempo'>
                    <div></div> 
                    <h2>{props.postagens.tempo}</h2>
                </div>
            </section>
            <section className='img'>
                <img src={props.postagens.post} alt='img-post'/>
            </section>
            <section className='reacoes'>
                <article className='imgs'>
                    <img src='/assets/images/icon-love.png' alt='icon-love'/>
                    <img src='/assets/images/icon-msg.png' alt='icon-msg'/>
                </article>
                <article className='curtidas'>
                    <h5> {props.postagens.curtidas}  </h5>
                    <h5> curtidas </h5>
                </article>
                <article className='info'>
                    <h5> {props.postagens.usuario} </h5>
                    <p> {props.postagens.descricao} </p>
                </article>
            </section>
            <hr />
        </div>
    )
}