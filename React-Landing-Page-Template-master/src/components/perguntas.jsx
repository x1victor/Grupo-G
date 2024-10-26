import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const perguntas = [
  "Eu não me sinto particularmente satisfeito com o jeito que sou",
  "Sou uma pessoa muito interessada em outras pessoas",
  "Sinto que a vida é muito gratificante",
  "Tenho sentimentos muito afetivos em relação a quase todos",
  "Raramente acordo me sentindo cansado",
  "Eu não estou, particularmente, otimista em relação ao futuro",
  "Sinto que a maioria das minhas experiências são divertidas",
  "Estou sempre comprometido e envolvido com várias iniciativas",
  "A vida é boa",
  "Eu não acho que o mundo seja um bom lugar para viver",
  "Eu me encontro, sempre sorrindo muito",
  "Estou bem satisfeito com tudo em minha vida",
  "Eu não me sinto uma pessoa atraente",
  "Existe uma lacuna entre o que gostaria de fazer e o que faço",
  "Estou muito feliz",
  "Eu encontro beleza e harmonia nas coisas",
  "Sempre consigo provocar alegria nas pessoas",
  "Sempre encontro tempo para tudo que quero realizar",
  "Sinto que não tenho controle da minha vida",
  "Sinto-me capaz de levar diversas iniciativas adiante",
  "Eu me considero uma pessoa mentalmente alerta",
  "Muitas vezes me sinto experimentando alegria e euforia",
  "Sinto que não é fácil tomar decisões, em várias situações",
  "Sinto não ter um significado e propósito em minha vida",
  "Sinto que tenho um nivel elevado de energia",
  "Eu geralmente, exerço uma boa influência sobre os acontecimentos",
  "Não costumo me divertir com outras pessoas",
  "Não me sinto, particularmente, uma pessoa saudável",
  "Não tenho, particularmente, lembranças felizes do meu passado"
];

const opcoes = [
  "Discordo totalmente",
  "Discordo moderadamente",
  "Discordo ligeiramente",
  "Concordo ligeiramente",
  "Concordo moderadamente",
  "Concordo totalmente"
];

export default function Perguntas() {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [pontuacaoFinal, setPontuacaoFinal] = useState(null);
  const [resultado, setResultado] = useState(null);

  const handleProximaPagina = () => {
    if (opcaoSelecionada !== null) {
      const novasRespostas = [...respostas];
      novasRespostas[paginaAtual] = opcaoSelecionada;
      setRespostas(novasRespostas);
      
      if (paginaAtual < perguntas.length - 1) {
        setPaginaAtual(paginaAtual + 1);
        setOpcaoSelecionada(null);
      } else {
        enviarRespostas(novasRespostas);
      }
    } else {
      alert("Por favor, selecione uma opção para prosseguir.");
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
      setOpcaoSelecionada(respostas[paginaAtual - 1]);
    }
  };

  const handleChange = (value) => {
    setOpcaoSelecionada(parseInt(value));
  };

  const enviarRespostas = async (respostas) => {
    const response = await fetch('http://localhost:3000/calcular-pontuacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(respostas),
    });

    const data = await response.json();
    setPontuacaoFinal(data.pontuacaoFinal);
    setResultado(data.resultado);
  };

  return (
    <div className="p-8 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Questionário</h1>
        {pontuacaoFinal === null ? (
          <form>
            <div className="mb-6 text-center">
              <p className="font-semibold mb-2">{perguntas[paginaAtual]}</p>
              <div className="grid grid-cols-2 gap-4 justify-items-start">
                {opcoes.map((opcao, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="radio" 
                      className="form-radio text-blue-500"
                      name={`pergunta${paginaAtual}`}
                      value={i + 1}
                      checked={opcaoSelecionada === i + 1}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <span>{opcao}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handlePaginaAnterior}
                disabled={paginaAtual === 0}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={handleProximaPagina}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {paginaAtual === perguntas.length - 1 ? 'Concluído' : 'Próxima'}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <Bar
              data={{
                labels: ['Pontuação'],
                datasets: [
                  {
                    label: 'Sua Pontuação',
                    data: [pontuacaoFinal],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 6,
                  },
                },
              }}
            />
            <p className="text-center mt-4 text-xl font-bold">Sua pontuação: {pontuacaoFinal}</p>
            <p className="text-center mt-2">{resultado}</p>
          </div>
        )}
      </div>
    </div>
  );
}
