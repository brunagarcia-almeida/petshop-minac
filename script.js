// SCRIPT DE SIMULAÇÃO - PETSHOP MINAC
const containerDestaques = document.querySelector('#lista-produtos');
const containerProdutos = document.querySelector('#produtos-container');
var produtos = [];
var produtosApi = [];

// Usar essa função para carregar os destaques na tela. 
// API: https://fakestoreapi.com/products
async function carregarDestaquesAPI() {
try {
        const resposta = await fetch('https://fakestoreapi.com/products?limit=4');
        produtosApi = await resposta.json();

        containerDestaques.innerHTML = '';

        produtosApi.forEach(produto => {
            const cardHtml = `
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 6px; padding: 15px; width: 220px; display: flex; flex-direction: column; gap: 10px;">
                    <div style="background: #f0f0f0; height: 140px; border-radius: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 10px;">
                        <img src="${produto.image}" alt="${produto.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;">                    
                    </div>
                    <h4 style="font-size: 14px; color: var(--text-charcoal); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${produto.title}">${produto.title}</h4>
                    <p style="font-size: 15px; font-weight: bold; color: var(--primary-bordeaux);">US$ ${produto.price.toFixed(2)}</p>
                    <span style="font-size: 12px; color: #888;">🌐 API Externa</span>
                    <button class="btn-primary" style="width: 100%; padding: 8px; font-size: 13px;" onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
                </div>
            `;
            containerDestaques.innerHTML += cardHtml;
        });

    } catch (error) {
        console.log("Erro ao carregar a API externa:", error);
        containerDestaques.innerHTML = '<p>Não foi possível carregar os destaques da nuvem.</p>';
    }
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

    // Junta as duas listas temporariamente apenas para a busca
    const todosOsProdutos = produtos.concat(produtosApi);

    const produtosPesquisados = todosOsProdutos.filter(produto => 
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

function renderizarDestaques(lista) {
    containerDestaques.innerHTML = '';

    if (lista.length === 0) {
        containerDestaques.innerHTML = '<p>Nenhum destaque encontrado.</p>';
        return;
    }

    lista.forEach(produto => {
        const cardHtml = `
            <div style="background: white; border: 1px solid var(--border-color); border-radius: 6px; padding: 15px; width: 220px; display: flex; flex-direction: column; gap: 10px;">
                <div style="background: #f0f0f0; height: 140px; border-radius: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 10px;">
                    <img src="${produto.image}" alt="${produto.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;">                    
                </div>
                <h4 style="font-size: 14px; color: var(--text-charcoal); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${produto.title}">${produto.title}</h4>
                <p style="font-size: 15px; font-weight: bold; color: var(--primary-bordeaux);">US$ ${produto.price.toFixed(2)}</p>
                <span style="font-size: 12px; color: #888;">🌐 API Externa</span>
                <button class="btn-primary" style="width: 100%; padding: 8px; font-size: 13px;" onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
            </div>
        `;
        containerDestaques.innerHTML += cardHtml;
    });
}

/*
function filtrarPorNome(pesquisa) {
    const texto = pesquisa.toLowerCase(); 

    // Filtra e atualiza os Destaques (API)
    const destaquesFiltrados = produtosApi.filter(produto => 
        produto.title?.toLowerCase().includes(texto)
    );
    renderizarDestaques(destaquesFiltrados);

    // Filtra e atualiza a Vitrine Principal (Locais)
    const locaisFiltrados = produtos.filter(produto => 
        produto.title?.toLowerCase().includes(texto)
    );
    criarCardProduto(locaisFiltrados);
}
    */
carregarDestaquesAPI();
carregarProdutos();