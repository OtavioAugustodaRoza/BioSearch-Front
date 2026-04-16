import { useState } from 'react'
import toast from 'react-hot-toast'
export function useBioSearch (){
    

    const [resultados, setResultados] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [buscou, setBuscou] = useState(false)


    async function buscar(termo, banco, limite) {
        if (termo === '') {
          toast.error('Digite um termo para buscar!')
          return
        }
        const limiteValido = limite > 20 ? 20 : limite < 1 ? 5 : limite
    
    
        try {
          setCarregando(true)
          setBuscou(true)
          const resposta = await fetch(
            `https://biosearch-api.onrender.com/busca?q=${termo}&db=${banco}&limite=${limiteValido}`
          )
          const dados = await resposta.json()
          setResultados(dados ?? [])
        } catch {
          toast.error('Erro ao buscar dados!')
        } finally {
          setCarregando(false)
          
        }
      }
      return { resultados, carregando, buscou, buscar }
}