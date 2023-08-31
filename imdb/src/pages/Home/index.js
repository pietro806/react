
import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';
import axios from 'axios';
import Tabela from '../../components/tabela';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer} from 'react-toastify'

export default function Home() {
  const [filme, setFilme] = useState('');
  const [resp, setResp] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('movie');

  async function Buscar() {
    try{
      if(filme !== ''){
        let url = `http://www.omdbapi.com/?apikey=fac66924&s=${filme}&page=${page}&type=${type}`
        let info = await axios.get(url)
        let filmes = []
        for(let cont = 0; cont < info.data.Search.length; cont++){
          filmes[cont] = {
            Title: info.data.Search[cont].Title,
            Year: info.data.Search[cont].Year,
            imdbID: info.data.Search[cont].imdbID,
            Poster: info.data.Search[cont].Poster
          }
  
          if(filmes[cont].Poster === 'N/A'){
            filmes[cont].Poster = 'https://imgs.search.brave.com/xbC5TxhEvkZw1VTL_2K2T5cNdrctyEW5FkSVibD7HE0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tb2Rv/YnJpbmNhci5yaWhh/cHB5LmNvbS5ici93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/MS9maWxtZXMtcGFy/YS1hc3Npc3Rpci1l/bS1mYW1pbGlhLTEw/MjR4NjgzLmpwZw'
          }
        }
        setResp(filmes)
        console.log(filmes);
      }
        else {
          toast.error('Filme não encontrado. Tente novamente')
  
        }
    }
    catch(err){
      toast.error('Erro: ' + err.message)
    }
  }
  async function Proximo(){
    try{
      let pages = page + 1
      setPage(pages)
      if(filme !== ''){
        let url = `http://www.omdbapi.com/?apikey=fac66924&s=${filme}&page=${pages}&type=${type}`
        let info = await axios.get(url)
        let filmes = []
        for(let cont = 0; cont < info.data.Search.length; cont++){
          filmes[cont] = {
            Title: info.data.Search[cont].Title,
            Year: info.data.Search[cont].Year,
            imdbID: info.data.Search[cont].imdbID,
            Poster: info.data.Search[cont].Poster
          }
  
          if(filmes[cont].Poster === 'N/A'){
            filmes[cont].Poster = 'https://imgs.search.brave.com/xbC5TxhEvkZw1VTL_2K2T5cNdrctyEW5FkSVibD7HE0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tb2Rv/YnJpbmNhci5yaWhh/cHB5LmNvbS5ici93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/MS9maWxtZXMtcGFy/YS1hc3Npc3Rpci1l/bS1mYW1pbGlhLTEw/MjR4NjgzLmpwZw'
          }
        }
        setResp(filmes)
        console.log(filmes);
    }}
    catch(err){
      toast.error('Erro: ' + err.message)
    }
  }
  async function Mais(){
    try{
      let pages = page + 1;
      let url = `http://www.omdbapi.com/?apikey=fac66924&s=${filme}&page=${pages}&type=${type}`;
      let info = await axios.get(url)
      setResp([...resp, ...info.data.Search])
      console.log(resp);
    }
    catch(err){
        toast.info(err.message)
    }
  }

  return (
    <div className="pag-home">
      <ToastContainer />
      <Cabecalho />
      <div className='caixa'>
        <section>
          <article className='img'>
            <img src='/assets/images/filmes.png' alt='img' />
            <div>
              <h3>IMDB</h3>
            </div>
          </article>
          <article className='coleta'>
            <h3>Consulta de filmes</h3>
            <div>
              <section>
                <h5>Nome</h5>
                <input type='text' onChange={(nm) => setFilme(nm.target.value)}/>
              </section>
              <img onClick={() => Buscar()} src='/assets/images/icon-buscar.png' alt='img'/>
            </div>
          </article>
          <article className='tabela'>
            <Tabela lista={resp} />
          </article>
          <article className='variacoes'>
            <button onClick={() => Proximo()}> Proximo </button>
            <select onChange={(option) => setType(option.target.value)}>
              <option> movie </option>
              <option> series </option>
              <option> game </option>
            </select>
            <button onClick={() => Mais()}> Ver mais </button>
          </article>
        </section>
      </div>
    </div>
  );
}
