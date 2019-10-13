import React, {useState, useMemo} from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';
import './styles.css';

export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },[thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData();

        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        data.append('thumbnail', thumbnail);
        
        const user_id = localStorage.getItem('user');

        await api.post('/spots', data, {
            headers: {
                user_id
            }
        });

        history.push('/dashboard');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail"
                className={thumbnail ? 'has-thumbnail' : ''}
                style={{ backgroundImage: `url(${preview})` }}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Selecinar imagem"/>
            </label>
            
            <label htmlFor="company">EMPRESA *</label>
            <input 
                type="text" 
                id="company"
                placeholder="Sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                type="text" 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                type="text" 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
}