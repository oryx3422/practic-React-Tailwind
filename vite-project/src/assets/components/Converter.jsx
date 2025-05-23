import { React, useEffect, useState } from "react"
import { MdCurrencyRuble } from "react-icons/md";
import { MdEuroSymbol } from "react-icons/md";

const Converter = () => {
    const [inputRUB, setInputRUB] = useState('')
    const [inputEURO, setInputEURO] = useState('')
    const [rubToEuro, setRubToEuro] = useState(null)
    const [euroToRub, setEuroToRub] = useState(null)

    useEffect(() => {
        fetch("https://open.er-api.com/v6/latest/RUB")
        .then(res => res.json())
        .then(data => {
            setRubToEuro(data.rates["EUR"])
            setEuroToRub(1 / data.rates["EUR"])
            
        })
    }, [])

    const handleRUBChange = (e) => {
        const rub = e.target.value
        setInputRUB(rub)
        if (rubToEuro && rub !== '' && !isNaN(rub)) {
            const euro = parseFloat(rub) * rubToEuro
            setInputEURO(euro)
        } else {
            setInputEURO('')
        }

    }

    const handleEUROChange = (e) => {
        const euro = e.target.value
        setInputEURO(euro)
        if (euroToRub && euro !== '' && !isNaN(euro)) {
            const rub = parseFloat(euro) * euroToRub
            setInputRUB(rub)
        } else {
            setInputRUB('')
        } 

    }

  return (
    <div className="flex flex-col items-center m-10 p-6 border border-black rounded-md w-full max-w-md">
  <h1 className="text-2xl font-semibold mb-1">Конвертер</h1>
    <p className="text-sm font-semibold  ">1 RUB = {euroToRub ? euroToRub.toFixed(2) : '...'} EURO</p>
    <p className="text-sm font-semibold mb-3">1 EURO = {rubToEuro ? rubToEuro.toFixed(4) : '...'} RUB</p>

  {/* Блок 1 */}
  <div className="flex items-center w-full mb-4 p-3 border border-gray-300 rounded-md">
    <input
      type="text"
      className="flex-grow px-4 py-2 border border-gray-200 rounded-md focus:outline-none"
      placeholder="Введите сумму"
      value={inputRUB}
      onChange={handleRUBChange}
    />
    <MdCurrencyRuble className="ml-4 text-2xl text-gray-700" />
  </div>

  {/* Блок 2 */}
  <div className="flex items-center w-full p-3 border border-gray-300 rounded-md">
    <input
      type="text"
      className="flex-grow px-4 py-2 border border-gray-200 rounded-md focus:outline-none"
      placeholder="Введите сумму"
      value={inputEURO}
      onChange={handleEUROChange}
    />
    <MdEuroSymbol className="ml-4 text-2xl text-gray-700" />
  </div>
</div>

  )
}

export default Converter