const express = require('express');
const Prestador = require('./models/Prestador');

const router = express.Router();

// Listar todos os prestadores de serviço
router.get('/prestadores', async (req, res) => {
  try {
    const prestadores = await Prestador.find();
    res.json(prestadores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os prestadores de serviço.' });
  }
});

// Criar um novo prestador de serviço
router.post('/prestadores', async (req, res) => {
    try {
      const { codigo_prestador, nome_prestador, cpf_prestador, categoria, servico_principal } = req.body;
  
      let vlr_servico = 50.0; // Valor base do serviço
  
      // Verificar a experiência do prestador e atualizar o valor do serviço
      if (servico_principal.experiencia === 3) {
        vlr_servico *= 1.3; // Acréscimo de 30%
      } else if (servico_principal.experiencia > 3 && servico_principal.experiencia <= 5) {
        vlr_servico *= 1.5; // Acréscimo de 50%
      } else if (servico_principal.experiencia > 5) {
        vlr_servico *= 1.75; // Acréscimo de 75%
      }
  
      const prestador = new Prestador({
        codigo_prestador,
        nome_prestador,
        cpf_prestador,
        categoria,
        servico_principal: {
          id_servico: servico_principal.id_servico,
          nome_servico: servico_principal.nome_servico,
          vlr_servico,
          experiencia: servico_principal.experiencia,
        },
      });
  
      await prestador.save();
  
      res.json(prestador);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar novo prestador de serviço.' });
    }
  });

// Obter detalhes de um prestador de serviço específico
router.get('/prestadores/:codigo_prestador', async (req, res) => {
  try {
    const prestador = await Prestador.findOne({ codigo_prestador:req.params.codigo_prestador});
    if (prestador) {
      res.json(prestador);
    } else {
      res.status(404).json({ error: 'Prestador de serviço não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o prestador de serviço.' });
  }
});

// Obter detalhes de um prestador de uma categoria
router.get('/prestadores/categoria/:nome_categoria', async (req, res) => {
    try {
      const prestador = await Prestador.find({ 'categoria.nome_categoria': req.params.nome_categoria });
      if (prestador) {
        res.json(prestador);
      } else {
        res.status(404).json({ error: 'Prestador de serviço não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o prestador de serviço.' });
    }
  });
  // Obter detalhes de um prestador de um serviço
router.get('/prestadores/servico/:nome_servico', async (req, res) => {
    try {
      const prestador = await Prestador.find({ 'servico_principal.nome_servico': req.params.nome_servico });
      if (prestador) {
        res.json(prestador);
      } else {
        res.status(404).json({ error: 'Prestador de serviço não encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o prestador de serviço.' });
    }
  });

// Atualizar os dados de um prestador de serviço
router.put('/prestadores/:codigo_prestador', async (req, res) => {
  try {
    const prestador = await Prestador.findOneAndUpdate({ codigo_prestador:req.params.codigo_prestador}, req.body, {
      new: true,
    });
    if (prestador) {
      res.json(prestador);
    } else {
      res.status(404).json({ error: 'Prestador de serviço não encontrado.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar o prestador de serviço.' });
  }
});

// Excluir um prestador de serviço
router.delete('/prestadores/:codigo_prestador', async (req, res) => {
  try {
    const prestador = await Prestador.findOneAndDelete({ codigo_prestador:req.params.codigo_prestador});
    if (prestador) {
      res.json({ message: 'Prestador de serviço excluído com sucesso.' });
    } else {
      res.status(404).json({ error: 'Prestador de serviço não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o prestador de serviço.' });
  }
});

module.exports = router;
