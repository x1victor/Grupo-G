const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/calcular-pontuacao', (req, res) => {
  const respostas = req.body;
  const perguntasInvertidas = [1, 5, 6, 10, 13, 14, 19, 23, 24, 27, 28, 29];

  const pontuacoes = respostas.map((resposta, index) => {
    if (perguntasInvertidas.includes(index + 1)) {
      return 7 - resposta;
    }
    return resposta;
  });

  const soma = pontuacoes.reduce((acc, val) => acc + val, 0);
  const media = soma / respostas.length;
  let resultadoTexto;

  if (media >= 1 && media < 3) {
    resultadoTexto = "Não Feliz. Se você respondeu honestamente e obteve esse score baixo, recomendamos que procure observar seu estilo de vida e procure ajuda profissional.";
  } else if (media >= 3 && media < 5) {
    resultadoTexto = "Moderadamente Feliz. Um score entre 3 e 5 pode ser uma média exata das suas respostas de felicidade e infelicidade. Fortaleça esses sentimentos com um estilo de vida saudável.";
  } else if (media >= 5 && media <= 6) {
    resultadoTexto = "Muito Feliz. Se sentir feliz tem mais benefícios do que apenas se sentir bem, pois a felicidade está relacionada à saúde, qualidade dos relacionamentos e desempenho.";
  }

  res.json({ pontuacaoFinal: media.toFixed(2), resultado: resultadoTexto });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
