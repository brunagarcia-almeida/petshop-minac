// SCRIPT DE SIMULAÇÃO - PETSHOP MINAC
// Preparado para a integração de dados e carrinho
//console.log("Script carregado com sucesso! Pronto para receber a lógica.");
const containerProdutos = document.querySelector('#produtos-container');
var produtos = [];

async function carregarProdutos() {
    try {
        const resposta = await fetch('produtos.json');
        produtos = await resposta.json();
        containerProdutos.innerHTML = '';

        produtos.forEach(produto => {
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
    } catch (error) {
        //console.log("Algo de errado não está certo.", error);
        //alert("Deu ruim");
        containerProdutos.innerHTML = 'Não foi possível carregar os produtos..'
    }
}

function filtrarPorCategoria(categoriaEscolhida) {
    let produtosFiltrados = produtos;

    if (categoriaEscolhida !== 'todos') {
        produtosFiltrados = produtos.filter(produto => produto.category === categoriaEscolhida);
    }

    containerProdutos.innerHTML = '';

    produtosFiltrados.forEach(produto => {
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