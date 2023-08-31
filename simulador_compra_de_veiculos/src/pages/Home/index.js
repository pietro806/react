
import { useEffect, useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify'

export default function Home() {
  const [valor, setValor] = useState(0);
  const [parcelas, setParcelas] = useState(0);
  const [taxaJuros, setTaxaJuros] = useState(0);
  const [parcelasJuros, setParcelasJuros] = useState(0);
  const [valorJuros, setValorJuros] = useState(0);
  const [automovel, setAutomovel] = useState('Carro')
  const [img, setImg] = useState('/assets/images/carro.png')
  const [tpJuros, setTpJuros] = useState('');

  function Calcular() {
    try{
      if(tpJuros == 'Composto'){
        let juros = (valor / 100) * taxaJuros;
        let novoValor = valor + juros;
        let jurosNovo = (novoValor / 100) * taxaJuros;
        let somaJuros = juros + jurosNovo;
        
    
        for(let cont = 1; cont < parcelas; cont++){
          novoValor = valor + somaJuros;
          juros = somaJuros
          jurosNovo = (novoValor / 100) * taxaJuros
          somaJuros = juros + jurosNovo
        }
        juros = Number(juros.toFixed(2))
        let valorr = valor + juros;
        setValorJuros(valorr)
        let parcelasJuross = valorr / parcelas
        setParcelasJuros(parcelasJuross)
      }
  
      else if(tpJuros == 'Simples'){
        let j = valor * taxaJuros * parcelas;
        let m = valor + j;
        let parcelasJurosss = m / parcelas;
        setValorJuros(m);
        setParcelasJuros(parcelasJurosss);
      }
    }
    catch(err){
      toast.error('Erro: ' + err.message)
    }
  }
  function escolhaImg() {
    if(automovel === 'Carro'){
      setImg('/assets/images/carro.png')
    }
    else if(automovel === 'Moto'){
      setImg('/assets/images/moto3.png')
    }
  }

  useEffect(() => {
    escolhaImg()
    Calcular()
  }, [automovel, tpJuros])

  return (
    <div className="pag-home">
      <ToastContainer />
      <Cabecalho />
      <main>
        <h1> Simulador de compra de veiculo</h1>
        <section>
            <article className='img'> 
              <img src={img} />
            </article>
            <article className='detalhes'>
              <section> 
                <button onClick={() => setAutomovel('Carro')}> Carro </button>
                <button onClick={() => setAutomovel('Moto')}> Moto </button>
              </section>
              <h4> Valor Total </h4>
              <input type='text' value={valor} onChange={e => setValor(Number(e.target.value))}/> 
              <div className='quebra'>
                <div className='primeira'>
                  <h4> Parcelas </h4>
                  <input type='text' value={parcelas} onChange={e => setParcelas(Number(e.target.value))}/>
                </div>
                <div>
                  <h4>Juros Mensal(%)</h4>
                  <input type='number' value={taxaJuros} onChange={e => setTaxaJuros(Number(e.target.value))}/>
                </div>
              </div>
              <div>
                <button onClick={() => {
                  Calcular()
                  setTpJuros('Simples')
                }}>Calcular juros simples</button>
                <button onClick={() => {
                  Calcular()
                  setTpJuros('Composto')
                }}>Calcular juros compostos</button>
              </div>
              <div className='resultados'>
                <h4> Parcela: </h4>
                <p> {parcelasJuros} </p>
              </div>
              <div className='resultados'>
                <h4>Valor com juros: </h4>
                <p> {valorJuros} </p>
              </div>

            </article>
        </section>
      </main>
    </div>
  );
}


