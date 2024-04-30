import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pokemonTypes } from '../data/pokemonType';
import ReactLoading from 'react-loading';

function Detail() {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { pokemonID } = useParams();
  const navigate = useNavigate();

  const fetchPokeDetail = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
      setPokemon(response.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPokeDetail();
  }, [pokemonID]);

  const goBack = () => {
    navigate('/');
  };


  return (
    <div className="max-w-7xl mx-auto h-screen flex justify-center items-center ">

      {isLoading ? (
        <div className="bg-white w-4/5 mx-auto shadow-2xl rounded-xl overflow-hidden lg:w-2/3">
          <div className="grid grid-rows-2">
            <div className="flex justify-center items-center" style={{ backgroundColor: pokemonTypes[pokemon.types?.[0]?.type?.name] }}>
              <img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon.name} className="object-cover w-[300px]" />
            </div>
            <div className="p-5 text-center flex flex-col gap-2">
              <p className='font-bold text-2xl'>{pokemon.name}</p>
              <p className='font-bold underline'>Type</p>
              <div className='flex justify-center gap-2 flex-wrap'>
                {pokemon.types.map((item, i) => (
                  <div key={i} className='text-sm px-3 py-1 rounded text-white' style={{ backgroundColor: pokemonTypes[pokemon.types?.[0]?.type?.name] }}>
                    {item.type.name}
                  </div>
                ))}
              </div>
              <p className='font-bold underline'>Abilities</p>
              <div className='flex justify-center gap-2 flex-wrap'>
                {pokemon.abilities.map((item, i) => (
                  <div key={i} className='text-sm px-3 py-1 rounded text-white bg-blue-400'>
                    {item.ability.name}
                  </div>
                ))}
              </div>
              <div className="">
                <button onClick={goBack} className="mt-5 px-4 py-2 font-bold bg-gray-100 text-black-500 rounded-xl border-[3px] transition ease-in-out hover:bg-gray-200 hover:text-white">&lt; Back to Pokemon List</button></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <ReactLoading type="spin" width={'100px'} color="#000" />
        </div>
      )}
    </div>
  );
}

export default Detail;
