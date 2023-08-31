import axios from 'axios';
import './index.scss';
import { useEffect, useState } from 'react';
import Card from '../../components/personagem';
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify';


export default function Principal() {
    const [nome, setNome] = useState('')
    const [lista, setLista] = useState([])

    async function Buscando() {
        try{
            let url = `https://gateway.marvel.com/v1/public/characters?apikey=a02e81449b9184903880d6e6a40ebbfb&ts=1691960941&hash=c2dc6f9b1a8340a4df201fe5f2213221&limit=10`;
            let listando = []
            let info = await axios.get(url);

            for(let cont = 0 ; cont < info.data.data.results.length ; cont++) {
                let nome = info.data.data.results[cont].name
                let descricao = info.data.data.results[cont].description
        
                if(descricao === ''){
                    descricao = 'Lorem ipsum dolor sit amet, consectetur ipsum dolor sit adipiscing elit.'
                }
        
                let img = info.data.data.results[cont].thumbnail.path + '.' + info.data.data.results[cont].thumbnail.extension
                let personagem = {}
                personagem = {
                    nome: nome,
                    detalhes: descricao,
                    imagem: img
                }
                listando[cont] = personagem
            }
            setLista(listando)
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }

    async function buscaNome() {
        try{
            if(nome == '') {
                toast.error('Nome do personagem indefinido')
            }
            else {
                let url = `https://gateway.marvel.com/v1/public/characters?apikey=a02e81449b9184903880d6e6a40ebbfb&ts=1691960941&hash=c2dc6f9b1a8340a4df201fe5f2213221&limit=10&nameStartsWith=${nome}`;
                let listando = []
                let info = await axios.get(url);
                let qtd = info.data.data.results.length
                if(qtd < 1){
                    toast.error('Personagem não encontrado.')
                }
                for(let cont = 0 ; cont < qtd ; cont++) {
                    let nome = info.data.data.results[cont].name
                    let descricao = info.data.data.results[cont].description
                    
                    if(descricao === ''){
                        descricao = 'Lorem ipsum dolor sit amet, consectetur ipsum dolor sit adipiscing elit.'
                    }
            
                    let img = info.data.data.results[cont].thumbnail.path + '.' + info.data.data.results[cont].thumbnail.extension
                    let personagem = {}
                    personagem = {
                        nome: nome,
                        detalhes: descricao,
                        imagem: img
                    }
                    listando[cont] = personagem
                }
                setLista(listando)
            }
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }


    useEffect(() => {
        Buscando()
    }, [])
    
    function Enter(e) {
        try{
            if(e.key == 'Enter'){
                buscaNome()
            }
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }
    return(
        <div className='pag-principal'>
            <ToastContainer />
            <main>
                <header>
                    <img src='/assets/images/logo-marvel.png' alt='logo-marvel'/>
                    <div>
                        <a> Home </a>
                        <a> Personagens </a>
                        <a> Quadrinhos </a>
                        <a> Eventos </a>
                        <a> Contato </a>
                        <img src='/assets/images/logo-api.png' alt='logo-api'/>
                    </div>
                </header>
                <section className='s1'>
                    <article>
                        <h1> Personagens da MARVEL</h1>
                    </article>
                    <article className='info'>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum augue ut ligula malesuada blandit. Quisque tempor ex quis congue malesuada. Pellentesque est eros, aliquam non malesuada et, molestie ut purus </p>
                        <div>
                            <img src='/assets/images/icon-lupa.png' onClick={buscaNome}/>
                            <input type='text' placeholder='Nome do personagem' onKeyUp={Enter} onChange={(e) => setNome(e.target.value)}/>
                        </div>
                    </article>
                </section>
                <section className='catalogo'>
                    {lista.map(item => {
                        return(
                            <div className='item'>
                                <Card lista={item} />
                            </div>
                        )
                    })}
                </section>
            </main>
        </div>
    )
}