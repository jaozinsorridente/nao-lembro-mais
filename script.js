let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("input[type='text']");
let dadosCompletos = []; // Array para armazenar todos os dados

// 1. Função de Carregamento Inicial
async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        dadosCompletos = await resposta.json();
        
        // Renderiza TODOS os cards na primeira vez
        renderizarCards(dadosCompletos);
        
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        cardContainer.innerHTML = '<h2>Não foi possível carregar os dados.</h2>';
    }
}

// 2. Função de Renderização dos Cards
function renderizarCards(dadosParaRenderizar) {
    // Limpa os resultados anteriores
    cardContainer.innerHTML = ''; 

    if (dadosParaRenderizar.length === 0) {
        cardContainer.innerHTML = '<h2>Nenhum resultado encontrado.</h2>';
        return;
    }

    // Cria e adiciona um artigo para cada item
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Nascimento:</strong> ${dado.nascimento}</p>
        <p><strong>Descrição:</strong> ${dado.descrição}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

// 3. Função Principal de Busca (Chamada pelo botão)
function iniciarBusca() {
    // Obtém e padroniza o termo de busca (minúsculas)
    let termoBusca = inputBusca.value.trim().toLowerCase();
    
    // Se o campo estiver vazio, exibe todos os dados
    if (termoBusca === '') {
        renderizarCards(dadosCompletos);
        return;
    }

    // Filtra o array 'dadosCompletos'
    const resultadosFiltrados = dadosCompletos.filter(dado => {
        // Busca insensível a maiúsculas/minúsculas no nome OU na descrição
        const nomeInclui = dado.nome.toLowerCase().includes(termoBusca);
        const descricaoInclui = dado.descrição.toLowerCase().includes(termoBusca);
        
        return nomeInclui || descricaoInclui;
    });

    // Renderiza a lista de resultados filtrados
    renderizarCards(resultadosFiltrados);
}

// Inicia o carregamento dos dados quando a página estiver pronta
carregarDados();