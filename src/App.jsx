import { useState } from 'react'
import {Loader2, SearchX, Dna } from 'lucide-react'
import Card from './components/Card'
import SearchForm from './components/SearchForm'
import { Toaster } from 'react-hot-toast'
import { useBioSearch } from './hooks/useBioSearch'

function App() {
  const [termo, setTermo] = useState('')
  const [banco, setBanco] = useState('pubmed')
  const [limite, setLimite] = useState(5)
  const { resultados, carregando, buscou, buscar } = useBioSearch()
  
  async function handleBuscar() {
    await buscar(termo, banco, limite)
    setTermo('')
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8">
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #ef4444',
            },
          },
          success: {
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #22c55e',
            },
          },
        }}
      />
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Dna size={36} className="text-blue-400" />
          <h1 className="text-4xl font-bold tracking-tight">
            Bio<span className="text-blue-400">Search</span>
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          Pesquise dados biológicos no NCBI
        </p>
      </div>
      <SearchForm
        buscar={handleBuscar}
        limite={limite}
        carregando={carregando}
        banco={banco}
        termo={termo}
        onBancoChange={setBanco}
        onTermoChange={setTermo}
        onLimiteChange={setLimite}
              />
      {carregando && <Loader2 className="animate-spin mb-2" />}
      {resultados.length === 0 && !carregando && buscou ? (
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <SearchX size={48} />
          <p className="text-gray-400 text-sm">Nenhum resultado encontrado</p>
        </div>
      ) : (
        resultados.length !== 0 &&
        !carregando && (
          <>
            <p className="text-gray-400 text-2xl mb-4">
              {resultados.length} resultados encontrados
            </p>
          </>
        )
      )}
      <div className="flex flex-col gap-4  w-full max-w-2xl">
        {resultados.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default App
