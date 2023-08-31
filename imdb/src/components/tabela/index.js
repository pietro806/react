import './index.scss';


export default function Tabela(props) {
    return(
        <div className='comp-tabela'>
            <table>
                <thead>
                    <tr>
                        <th> Código </th>
                        <th> Título </th>
                        <th> Ano </th>
                    </tr>
                </thead>
                
                <tbody>
                    {props.lista.map( (item) => {
                        return(
                            <tr className='tr'>
                                <div>
                                    <td> {item.imdbID}</td>
                                    <td> {item.Title} </td>
                                    <td> {item.Year}  </td>
                                </div>
                                <img src= {item.Poster}  alt='Imagem não poder ser carregada'/>
                            </tr>
                        )})}
                </tbody>
            </table>
        </div>
    )
}