// SCRIPT DE SIMULAÇÃO - PETSHOP MINAC
// Preparado para a integração de dados e carrinho
//console.log("Script carregado com sucesso! Pronto para receber a lógica.");
const containerProdutos = document.querySelector('#produtos-container');
var produtos = [];

// Usar essa função para carregar os destaques na tela. 
// API: https://fakestoreapi.com/products
async function carregarDestaquesAPI() {

}

async function carregarProdutos() {
    try {
        const resposta = await fetch('produtos.json');
        produtos = await resposta.json();

        criarCardProduto(produtos);

    } catch (error) {
        //console.log("Algo de errado não está certo.", error);
        //alert("Deu ruim");
        containerProdutos.innerHTML = 'Não foi possível carregar os produtos..'
    }
}

function filtrarPorCategoria(categoriaEscolhida) {
    if (categoriaEscolhida === 'todos') {
        criarCardProduto(produtos);
        return;
    }
    
    const produtosFiltrados = produtos.filter(produto => produto.category === categoriaEscolhida);
    criarCardProduto(produtosFiltrados);
}

function filtrarPorNome(pesquisa) {
    const texto = pesquisa.toLowerCase(); 

    const produtosPesquisados = produtos.filter(produto => 
        produto.title?.toLowerCase().includes(texto)
    );

    criarCardProduto(produtosPesquisados);
}

function criarCardProduto(listaProdutos){
    containerProdutos.innerHTML =  '';

    if(listaProdutos.length === 0) {
        containerProdutos.innerHTML = 'Nenhum produto encontrado.';
        return;
    }

    listaProdutos.forEach(produto => {
            const cardHtml = `
                <div
                    style="background: white; border: 1px solid var(--border-color); border-radius: 6px; padding: 15px; width: 220px; display: flex; flex-direction: column; gap: 10px;">
                    <div
                        style="background: #f0f0f0; height: 140px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">
                        <img src="${produto.image}" alt="${produto.title}" style="width: 100%; height: 100%; object-fit: cover;">                    
                    </div>
                    <h4 style="font-size: 14px; color: var(--text-charcoal);">${produto.title}</h4>
                    <p style="font-size: 15px; font-weight: bold; color: var(--primary-bordeaux);">R$ ${produto.price.toFixed(2)}</p>
                    <span>${produto.category}</span>
                    <button class="btn-primary" style="width: 100%; padding: 8px; font-size: 13px;">Comprar</button>
                </div>
            `;
            containerProdutos.innerHTML += cardHtml;
        });
}

carregarProdutos();