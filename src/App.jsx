import { useState } from 'react'
import { Search, Loader2, SearchX, Dna } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Card from './components/Card'

function App() {
  const [termo, setTermo] = useState('')
  const [banco, setBanco] = useState('pubmed')
  const [limite, setLimite] = useState(5)
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [buscou, setBuscou] = useState(false)

  async function buscar() {
    if (termo === '') {
      toast.error('Digite um termo para buscar!')
      return
    }

    setCarregando(true)
    setBuscou(true)
    try {
      const resposta = await fetch(
        `https://biosearch-api.onrender.com/busca?q=${termo}&db=${banco}&limite=${limite}`
      )
      const dados = await resposta.json()
      setResultados(dados ?? [])

      setTermo('')
    } catch {
      toast.error('Erro ao buscar dados!')
    } finally {
      setCarregando(false)
    }
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
      <div className="flex gap-4 mb-8">
        <div className="relative ">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Ex: HIV, Influenza..."
            value={termo}
            onKeyDown={(e) => {
              if (e.key === 'Enter') buscar()
            }}
            onChange={(e) => setTermo(e.target.value)}
            className="bg-gray-800 px-4 py-2  pl-9 rounded w-64"
          />
        </div>

        <select
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded"
        >
          <option value="pubmed">Artigos</option>
          <option value="taxonomy">Taxonomia</option>
          <option value="gene">Genes</option>
          <option value="protein">Proteínas</option>
        </select>

        <input
          type="number"
          value={limite}
          onChange={(e) => setLimite(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded w-20"
          min={1}
          max={20}
        />

        <button
          onClick={buscar}
          disabled={carregando}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded cursor-pointer font-semibold  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Buscar
        </button>
      </div>
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
