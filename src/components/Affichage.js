import React, {useState} from 'react'
import '../App.css'
import axios from "axios";
import catsErrors from '../data/cats-error.json'

function Affichage() {

    const [loading, setLoasding] = useState(true);
    const [img, setImg] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('')


    const fetchData = () => {
        // Pour lancer le projet npm start
        // Pour tester api :voici le bon url "http://localhost:9001/cats" qu'il me retourne un status 200,
        // Pour générer les erreurs  :
        //                             - Changer le url par exemple "http://localhost:9001/dog"
        //                             - Changer la méthode get par post par exemple  "axios.post('http://localhost:9001/cats')"

        axios.get('http://localhost:9001/catssm')

            .then(resp => {
                setLoasding(false)
                const listCats = resp.data.filter(e => (e.href === "200"))[0];
                setTimeout(() => {
                    setLoasding(true);
                    setImg('https://http.cat/' + listCats.href)
                    setCode(listCats.href)
                    setDescription(listCats.description)


                }, 2000)


            })
            .catch(error => {
                setLoasding(false);
                const httpStatusValue = catsErrors[Math.floor(Math.random() * catsErrors.length)]
                setTimeout(() => {
                    setLoasding(true);
                    setImg('https://http.cat/' + httpStatusValue.href);
                    setCode(httpStatusValue.href);
                    setDescription(httpStatusValue.description);
                }, 2000)


            });


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
                        <p>{code + ':'} <span>{description}</span>
                        </p>
                    </div>

                </div>
            )}

        </div>
    )

}

export default Affichage
