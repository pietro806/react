
import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';
import Lista from '../../components/linhaLista';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer} from 'react-toastify'

function Home() {
  const [produto, setProduto] = useState('teste')
  const [valor, setValor] = useState(0);
  const [pedidos, setPedidos] = useState([])
  const [total, setTotal] = useState(0);
  
  function Adicionar() {
    try{
      let pedido = {
        produto: produto,
        valor: valor
      }

      if(produto === ''){
        toast.error('Há campo incompleto')
      }
      else if(valor === 0){
        toast.error('Há campo incompleto')
      }
      else if(produto != '' && valor != 0 ){
        setTotal( total + valor)
        setPedidos([...pedidos, pedido])
      }
      else {
        toast.error('Há campo incompleto')
      }
    }
    catch(err){
      toast.error('Erro: ' + err.message)
    }
  }

  function Enter(e) {
    if(e.key === 'Enter'){
      Adicionar()
    }
  }
  return (
    <div className="pag-home">
      <ToastContainer />
      <Cabecalho />
      <div className='main'>
        <main className='box'>
          <header>
            <div className='img'> <img src='/assets/images/sorvete.png' alt=''/> </div>
            <div className='texto'> <h2> Sorveteria</h2> </div>
          </header>
          <section className='detalhes'>
            <article className='item'> 
              <h3> Novo Item</h3>
              <div> 
                <input type='text' onChange={e => setProduto(e.target.value)} /> 
                <article > 
                  <div> <p>R$</p> </div>
                  <input type='number' onKeyUp={Enter}  onChange={e => setValor(Number(e.target.value))}/>
                </article>
                <button onClick={Adicionar}> Adicionar </button>
              </div>
            </article>
            <article className='pedido'>
              <h3> Lista de compras </h3>
              <h5> Total: R$ {total}</h5>
            </article>
            <article className='tabela'>
              <Lista pedidos={pedidos}/>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
