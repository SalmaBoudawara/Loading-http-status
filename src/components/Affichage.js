import React, {useState} from 'react'
import '../App.css'
import cats from './../data/cats.json';


function Affichage() {
    // init url
    let url = 'https://http.cat/200';

    const [loading, setLoasding] = useState(true);
    const [img, setImg] = useState(url);
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('')

    const listCats = cats.filter((e => (e.href === "200") || (e.href === "401") || (e.href === "403") || (e.href === "500")))
    const randerCats = listCats[Math.floor(Math.random() * listCats.length)];

    const fetchData = () => {
        setLoasding(false);
        setTimeout(() => {
            setLoasding(true);
            setImg('https://http.cat/' + randerCats.href);
            setCode(randerCats.href)
            setDescription(randerCats.description)
        }, 2000)

    }

    return (

        <div style={{marginTop: "60px"}}>
            <button className="button" onClick={fetchData}>
                recharger!
            </button>
            {!loading && (
                <div className="random">
                    <div className="loader">Loading...</div>
                </div>
            )}
            {loading && (
                <div className="gallery">
                    <div className="imagePlaceholder">
                        <img src={img}/>
                        <p>{code}:<span>{description}</span>
                        </p>
                    </div>

                </div>
            )}

        </div>
    )

}

export default Affichage
