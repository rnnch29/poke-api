import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo/pokemon.png'
import Card from '../components/Card'
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Home() {

    const [pokeData, setpokeData] = useState([])
    const [loading, setLoading] = useState(true)

    const pokeFetch = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
            const responsePokemon = await Promise.all(response.data.results.map(async (item) => {
                const result = await axios.get(item.url);
                return result.data;
            }))

            setpokeData(responsePokemon)

            setTimeout(() => {
                setLoading(false)
            }, 500)

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        pokeFetch();
    }, [])

    return (
        <div className='max-w-7xl mx-auto p-5'>

            <Header/>

            <div className="my-5 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {
                    pokeData.map((pokemon, i) => (
                        <Link key={i} to={`detail/${pokemon.id}`}><Card pokemon={pokemon} loading={loading} /></Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Home