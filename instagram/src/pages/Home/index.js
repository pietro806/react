import { useState } from 'react';
import './index.scss';
import Postagem from '../../components/postagem';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer} from 'react-toastify';


function Home() {
  const [usuario, setUsuario] = useState('')
  const [tempo, setTempo] = useState('');
  const [avatar, setAvatar] = useState('');
  const [descricao, setDescricao] = useState('');
  const [post, setPost] = useState('oi');
  const [curtidas, setCurtidas] = useState(0);
  const [publicacoes, setPublicacoes] = useState([{
      usuario: 'pietrosss',
      tempo: 'agora',
      avatar: 'https://imgs.search.brave.com/OYucyWJ57ya7YUD6xQYn0p9tYcM8kuMWu2kZaACFBV0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA4/MzU1MTc4L3B0L2Zv/dG8vbmluamEtYXNz/YXNzaW4uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXdvdFpw/aDh3UGVCWFlqQXRV/NGJ5TGZSMmUwMVVp/ZGVhcmFCXzhTQnNW/Wjg9',
      descricao: 'Primeira postagem',
      post: 'https://imgs.search.brave.com/3GU3uEPa7-ZCfo9Nuyl5vlqk3WEfHUn4A9KXky4lelg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ldWZh/Y29wcm9ncmFtYXMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzEyLzUucG5n',
      curtidas: 26
  }
  ])

  function Adicionar() {
    try{
      if(usuario != '' && tempo != '' && avatar != '' && descricao != '' && post != '' && curtidas != 0){
        let publicacao = {
          usuario: usuario,
          tempo: tempo,
          avatar: avatar,
          descricao: descricao,
          post: post,
          curtidas: curtidas
        }
        setPublicacoes([...publicacoes, publicacao])
      }
      else{
        toast.error('Há campo incompleto.')
      }
    }
    catch(err){
      toast.error('Erro: ' + err.message)
    }
  }
  
  function Enter(e){
    try{
      if(e.key === 'Enter'){
        Adicionar()
      }
    }
    catch(err){
      toast.error('Erro: ' + err.message)
    }
  }

  return (
    <div className="pag-home">
      <ToastContainer />
      <aside>
        <img src='/assets/images/icon-home.png' alt='icon-home' />
      </aside>
      <main>
        <div> <h4>Novas publicações</h4> </div>
        <section className='pessoas'>
          <div>
            <img src='/assets/images/pessoas1.png' />
          </div>
          <div>
            <img src='/assets/images/pessoas2.png' />
          </div>
          <div>
            <img src='/assets/images/pessoas3.png' />
          </div>
          <div>
            <img src='/assets/images/pessoas4.png' />
          </div>
          <div>
            <img src='/assets/images/pessoas5.png' />
          </div>
          <div>
            <img src='/assets/images/pessoas6.png' />
          </div>
          <div>
            <img src='/assets/images/pessoas7.png' />
          </div>
          <div>
            <img src='/assets/images/pessoas8.png' />
          </div>
        </section>
        <section className='detalhes'>
          <article>
            <div className='usuario' >
              <h5>Usuário: </h5>
              <input type='text' placeholder='ex.: pietro' onChange={e => setUsuario(e.target.value)}/>
            </div>
            <div className='curtidasTempo' >
              <h5>Tempo: </h5>
              <input type='text' placeholder='2 sem' onChange={e => setTempo(e.target.value)}/>
            </div>
          </article>
          <article className='avatar'>
            <h5> Avatar: </h5>
            <input type='text' placeholder='https://imgs.search.brave.com/x7dtf_BcP0nkyFRPXXTFbDPyxnU3yxeNa9cMNRQUttM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdGVjaHdl/ay5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDEvdW1h/LWltZ2VtLWJvYS1w/YXJhLXBlcmZpbC5q/cGc_cmVzaXplPTQ3/Niw1NDUmc3NsPTE' onChange={e => setAvatar(e.target.value)}/>
          </article>
          <article className='desc'>
            <h5>Descrição: </h5>
            <input type='text' placeholder='Primeiro publicação' onChange={e => setDescricao(e.target.value)}/>
          </article>
          <article>
            <div className='post' >
              <h5>Post: </h5>
              <input type='text' placeholder='https://imgs.search.brave.com/3GU3uEPa7-ZCfo9Nuyl5vlqk3WEfHUn4A9KXky4lelg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ldWZh/Y29wcm9ncmFtYXMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzEyLzUucG5n' onChange={e => setPost(e.target.value)}/>
            </div>
            <div className='curtidasTempo' >
              <h5>Curtidas: </h5>
              <input type='number' placeholder='123' onChange={e => setCurtidas(e.target.value)}/>
            </div>
          </article>
          <button onClick={Adicionar} onKeyUp={Enter}>Postar</button>
        </section>
        <section>
          {publicacoes.map(item => {
            return(
              <Postagem postagens={item}/>
            )
          })}
        </section>
      </main>
    </div>
  );
}

export default Home;
