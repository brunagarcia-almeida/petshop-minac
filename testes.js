// ==========================================
// 1. FUNÇÕES DE REGRA (ISOLADAS DO DOM)
// ==========================================
function calcularSubtotal(preco, quantidade) {
  var subtotal;
  if (preco < 0 || quantidade < 0) return 0;
  subtotal = Number((preco * quantidade).toFixed(2));
  return subtotal;
}

// Regra do Minac: não há frete grátis por valor; existe opção de retirada na loja
function calcularFrete(total, retiradaNaLoja = false, taxaEntrega = 20) {
  if (total <= 0) return 0;
  if (retiradaNaLoja) return 0;
  return taxaEntrega;
}

function buscarProdutosPorNome(lista, termo) {
  const texto = (termo || '').trim().toLowerCase();
  if (!Array.isArray(lista)) return [];
  return lista.filter((produto) =>
    produto.title?.toLowerCase().includes(texto)
  );
}

function filtrarProdutosPorCategoria(lista, categoria) {
  if (!Array.isArray(lista)) return [];
  if (categoria === 'todos') return lista;
  return lista.filter((produto) => produto.category === categoria);
}

// ==========================================
// 2. AUXILIAR DIDÁTICO
// ==========================================
function verificar(nome, obtido, esperado) {
  const passou = obtido === esperado;
  console.log(passou ? 'PASSOU' : 'FALHOU', '-', nome, { obtido, esperado });
}

// ==========================================
// 3. ASSERÇÕES (console.assert + verificar)
// ==========================================
// Subtotal
console.assert(calcularSubtotal(25, 2) === 50, 'Subtotal de 2 itens de R$ 25 deve ser 50');
verificar('Subtotal 2 itens', calcularSubtotal(25, 2), 50);
verificar('Quantidade negativa zera subtotal', calcularSubtotal(25, -1), 0);

// Regra de frete / retirada em loja (mesmo com valor alto, sem retirada cobra taxa)
console.assert(calcularFrete(150, false, 15) === 15, 'Valor alto sem retirada ainda cobra frete');
console.assert(calcularFrete(50, true, 15) === 0, 'Retirada na loja zera o frete');
console.assert(calcularFrete(150, true, 15) === 0, 'Retirada na loja zera o frete mesmo acima de 100');
verificar('Entrega normal acima de 100 cobra 15', calcularFrete(150, false, 15), 15);
verificar('Retirada na loja zera frete', calcularFrete(50, true, 15), 0);

// Busca e categoria com dados fictícios de teste
const catalogoFake = [
  { id: 1, title: 'Ração Premium Cães', category: 'Rações', price: 189.9 },
  { id: 2, title: 'Arranhador Torre', category: 'Gatos', price: 249.9 }
];

console.assert(buscarProdutosPorNome(catalogoFake, 'RAÇÃO').length === 1, 'Busca case-insensitive por ração');
console.assert(buscarProdutosPorNome(catalogoFake, 'inexistente').length === 0, 'Termo inexistente retorna vazio');
console.assert(filtrarProdutosPorCategoria(catalogoFake, 'Gatos').length === 1, 'Filtro por categoria Gatos');
console.assert(filtrarProdutosPorCategoria(catalogoFake, 'todos').length === 2, 'Filtro todos retorna lista completa');