let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("input[type='text']");
let dadosCompletos = []; // Array para armazenar todos os dados

// 1. Função de Carregamento Inicial
// É chamada automaticamente ao carregar a página.
async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        dadosCompletos = await resposta.json();
        
        // Renderiza TODOS os cards na primeira vez
        renderizarCards(dadosCompletos);
        
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        // Exibe uma mensagem de erro no container se o JSON falhar
        cardContainer.innerHTML = '<h2>Não foi possível carregar os dados.</h2>';
    }
}

// 2. Função de Renderização dos Cards (Reutilizável)
function renderizarCards(dadosParaRenderizar) {
    // 3. Limpa os resultados anteriores antes de renderizar os novos
    cardContainer.innerHTML = ''; 

    if (dadosParaRenderizar.length === 0) {
        cardContainer.innerHTML = '<h2>Nenhum resultado encontrado.</h2>';
        return;
    }

    // Cria e adiciona um artigo para cada item no array fornecido
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

// 4. Função Principal de Busca (Chamada pelo botão)
function iniciarBusca() {
    // 4.1. Obtém o termo de busca do input e o padroniza (minúsculas)
    let termoBusca = inputBusca.value.trim().toLowerCase();
    
    // Se o campo estiver vazio, exibe todos os dados
    if (termoBusca === '') {
        renderizarCards(dadosCompletos);
        return;
    }

    // 4.2. Filtra o array 'dadosCompletos'
    // Retorna TRUE para manter o item, FALSE para descartar.
    const resultadosFiltrados = dadosCompletos.filter(dado => {
        // Verifica se o termo está no nome OU na descrição
        const nomeInclui = dado.nome.toLowerCase().includes(termoBusca);
        const descricaoInclui = dado.descrição.toLowerCase().includes(termoBusca);
        
        // Mantém o item se a busca for encontrada no nome OU na descrição
        return nomeInclui || descricaoInclui;
    });

    // 4.3. Renderiza a lista de resultados filtrados
    renderizarCards(resultadosFiltrados);
}

// Inicia o carregamento dos dados quando a página estiver pronta
carregarDados();