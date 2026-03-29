import toast from 'react-hot-toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy } from 'lucide-react'

function Card({ item }) {
  const texto = Object.entries(item).map(([chave, valor]) => `${chave}: ${valor}`).join('\n')

  return (
    <div className="border-l-4 border-blue-400 bg-gray-900 p-5 rounded-lg shadow-lg  w-full max-w-2xl">

      <CopyToClipboard text={texto} onCopy={() => toast.success('Copiado!')}>
        <button className="float-right text-gray-400 hover:text-white cursor-pointer">
          <Copy size={16} />
        </button>
      </CopyToClipboard>

      {Object.entries(item).map(([chave, valor]) => (
        <div key={chave} className="mb-3 last:mb-0">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1">
            {chave}
          </p>

          <p className="text-gray-200 text-sm leading-relaxed">{valor}</p>
        </div>
      ))}
    </div>
  )
}

export default Card
