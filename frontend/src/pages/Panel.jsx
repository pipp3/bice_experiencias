import React from 'react'
import { Link } from 'react-router-dom'
const Panel = () => {
  return (
    <div>
        <div className='grid place-items-center'>
            <h1 className='text-sky-600 text-4xl font-semibold mt-5'>Panel de Administrador</h1>
            <nav className="flex items-center justify-between flex-wrap mt-5">
                <div>
                    <Link to="crear-usuario" className="inline-block text-sm px-4 py-2 leading-none border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 mt-4 lg:mt-0">
                        Crear usuario
                    </Link>
                    <Link to="editar-usuario" className=" ml-5 inline-block text-sm px-4 py-2 leading-none border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 mt-4 lg:mt-0">
                        Editar usuario
                    </Link>
                    <Link to="eliminar-usuario" className="ml-5 inline-block text-sm px-4 py-2 leading-none border rounded font-semibold bg-sky-500 text-white border-white hover:border-transparent hover:text-white hover:bg-sky-700 mt-4 lg:mt-0">
                        Eliminar usuario
                    </Link>
                </div>
            </nav> 
        </div>
       
    </div>
  )
}

export default Panel