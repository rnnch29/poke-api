import React from 'react'
import ReactLoading from 'react-loading';
import { pokemonTypes } from '../data/pokemonType';


function Card({ pokemon, loading }) {
  return (
    <div>
      <div className="bg-white p-3 rounded-xl text-center shadow-xl transition ease-in-out duration-300 hover:translate-y-[-10px]  hover:text-blue-600">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <ReactLoading type='spokes' color='#000' width={'40px'} height={'40px'} />
          </div>
        ) : (
          <>
            <div className="flex justify-center relative">
              <p className="text-xl font-bold text-white absolute top-2 left-2">#{pokemon.id}</p>
              <img
                src={pokemon?.sprites?.other?.home?.front_default}
                alt={pokemon.name}
                className="w-full rounded-xl"
                style={{ backgroundColor: pokemonTypes[pokemon.types[0].type.name] }}
              />
            </div>
            <div className="my-3">
              <p className="text-xl">{pokemon.name}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Card