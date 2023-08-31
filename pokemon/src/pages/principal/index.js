import { useState } from 'react';
import './index.scss';
import axios from 'axios';
import Pokemon from '../../components/pokemon';
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer} from 'react-toastify'



export default function Principal() {
    const [lista, setLista] = useState([])
    const [off, setOff] = useState(0)


    async function buscando() {
        try{
            let url = `https://pokeapi.co/api/v2/pokemon?limit=8`
            let info = await axios.get(url);
            let resultados = info.data.results;
            let pokemons = []
            for(let cont = 0; cont < 8; cont++){
                let urlPokemon = resultados[cont].url
                let caract = await axios.get(urlPokemon)
                let img = caract.data.sprites.other['official-artwork'].front_default
                let name = caract.data.species.name;
                let types = ''

                for(let cont = 0; cont < 1; cont++){
                    let qtd = caract.data.types.length
                    if(qtd > 1){
                        for(let cont = 0; cont < qtd; cont++){
                            if(cont === (qtd - 1)){
                                types = types + caract.data.types[cont].type.name
                            }
                            else{
                                types = types + caract.data.types[cont].type.name + ", ";
                            }
                        }
                    }
                    else{
                        types = caract.data.types[cont].type.name
                    }
                };
    
                pokemons[cont] = {
                    nome: name,
                    tipo: types,
                    imagem: img
                };
            }
            setLista(pokemons)
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }


    async function Mais() {
        try{
            let newOff = off + 8
            let url = `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${newOff}`
            let info = await axios.get(url);
            let resultados = info.data.results;
            let pokemons = []
            for(let cont = 0; cont < 8; cont++){
                let urlPokemon = resultados[cont].url;
                let caract = await axios.get(urlPokemon);
                let img = caract.data.sprites.other['official-artwork'].front_default;
                let name = caract.data.species.name;
                let types = ''

                for(let cont = 0; cont < 1; cont++){
                    let qtd = caract.data.types.length
                    if(qtd > 1){
                        for(let cont = 0; cont < qtd; cont++){
                            if(cont === (qtd - 1)){
                                types = types + caract.data.types[cont].type.name
                            }
                            else{
                                types = types + caract.data.types[cont].type.name + ", ";
                            }
                        }
                    }
                    else{
                        types = caract.data.types[cont].type.name
                    }
                };
    
                pokemons[cont] = {
                    nome: name,
                    tipo: types,
                    imagem: img
                };
            }
            setLista([...lista, ...pokemons])
            setOff(newOff)
        }
        catch(err){
            toast.error('Erro: ' + err.message)
        }
    }
    
    function Buscar(e){
        if(e.key === 'Enter'){
            Mais()
        }
    }

    return(
        <div className='pag-principal'>
            <ToastContainer />
            <main>
                <section className='conteudo'>
                    <header>
                        <img src='/assets/images/pikachu.png' />
                        <div>
                            <button onClick={() => buscando()}> Encontrar Pokémons </button>
                        </div>
                    </header>
                    <article className='catalogo'>
                        {lista.map((item) => {
                            return(
                                <Pokemon pokemons={item}/>
                            )
                        })}
                    </article>
                    <article>
                        <button onClick={Mais} onKeyUp={Buscar}>Buscar mais</button>
                    </article>
                </section>
                    
                <section className='empty'></section>
            </main>
        </div>
    )
}