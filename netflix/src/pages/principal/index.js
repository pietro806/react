import { useState } from 'react';
import './index.scss';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import {toast, ToastContainer} from 'react-toastify'

export default function Principal() {
    const [nome, setNome] = useState('')
    const [filmes, setFilmes] = useState([
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
        },
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg'
        },
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BNjI3NjY1Mjg3MV5BMl5BanBnXkFtZTgwMzk5MDQ3MjE@._V1_SX300.jpg'
        },
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BNDJiZDliZDAtMjc5Yy00MzVhLThkY2MtNDYwNTQ2ZTM5MDcxXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg'
        },
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg'
        },
        {
            Poster: 'https://m.media-amazon.com/images/M/MV5BNWI1NjkxM2MtOTU4My00YzQ5LTliNGMtNmFlM2U5NWM3MDY1XkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg'
        }
    ])

    async function Buscar() {
        try{
            let url = `http://www.omdbapi.com/?apikey=fac66924&s=${nome}`;
            let response = await axios.get(url)
            if(nome == '' || response.data.Response == 'False'){
                toast.dark('Não encontramos, tente novamente.')
            }
            else {
                setFilmes(response.data.Search)
            }
        }
        catch(err) {
            toast.error('Erro: ' + err.message)
        }

    }
    function Enter(e) {
        if(e.key === 'Enter'){
            Buscar()
        }
    }

    return(
        <div className='pag-principal'>
            <div className='pag'>
                <ToastContainer />
                <section className='s1'>
                    <header>
                        <section className='pt-1'>
                            <article className='imgs'>
                                <img src='/assets/images/logo.png' className='logo'/>
                                <img src='/assets/images/text-logo.png'/>
                            </article>
                            <article className='p'>
                                <p> Início </p>
                                <p>Séries</p>
                                <p>Filmes</p>
                                <p>Bombando</p>
                                <p>Minha Lista</p>
                            </article>
                        </section>
                        <section className='pt-2'>
                            <article className='input'>
                                <input type='text' placeholder='Pesquise pelo Título' onKeyUp={Enter} onChange={e => setNome(e.target.value)}/>
                                <img onClick={Buscar} src='/assets/images/icon-buscar.png' />
                            </article>
                            <article>
                                <p>Pietro</p>
                                <img src='/assets/images/icon-sino.png' className='icon' />
                                <img src='/assets/images/ninja.webp' className='img'/>
                                <img src='/assets/images/icon-seta.png' className='icon'  />
                            </article>
                        </section>
                    </header>
                    <article>
                        <h1> Friends </h1>
                        <p> Seis jovens são unidos por laços familiares, românticos e, principalmente, de amizade, enquanto tentam vingar em Nova York</p>
                        <button>Assistir</button>
                    </article>
                    <aside></aside>
                </section>
                <section className='s2'>
                    <h3>Resultado da Busca</h3>
                    <div>
                        {filmes.map(item => {
                            return(
                                    item.Poster == 'N/A' ? '' : <img src={item.Poster} />
                            )
                        })}
                    </div>
                </section>
                
            </div>
        </div>
    )
}