const produtosLocalStorage = JSON.parse(localStorage.getItem("Produtos") || "[]")

const listaProdutos = document.getElementById("lista-produtos")
listaProdutos.innerHTML = produtosLocalStorage.length
    ? produtosLocalStorage.map((produto) => `
    <article>
        <h3>${produto.nome}</h3>
        <p>R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}</p>
        <p>Categoria: ${produto.categoria}</p>
    </article>
`).join("")
    : '<p class="empty-catalog">Nenhum produto cadastrado ainda. Acesse “Administrar produtos” para adicionar o primeiro.</p>'
