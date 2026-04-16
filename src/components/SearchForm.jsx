import {Search} from 'lucide-react'
function SearchForm({limite,carregando,banco,termo, onBancoChange, onTermoChange, onLimiteChange,buscar}) {
  

  return (
    <div className="flex gap-4 mb-8">
        <div className="relative ">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            disabled={carregando}
            type="text"
            placeholder="Ex: HIV, Influenza..."
            value={termo}
            onKeyDown={(e) => {
              if (e.key === 'Enter') buscar()
            }}
            onChange={(e) => onTermoChange(e.target.value)}
            className="bg-gray-800 px-4 py-2  pl-9 rounded w-64"
          />
        </div>

        <select
          value={banco}
          onChange={(e) => onBancoChange(e.target.value)}
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
          onChange={(e) => onLimiteChange(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded w-20"
          min={1}
          max={20}
        />

        <button
          onClick={buscar}
          disabled={carregando}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded cursor-pointer font-semibold  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>
  )
}

export default SearchForm
