// Create
const formCadastro = document.getElementById("formCadastro")
let isEditando = null

formCadastro.onsubmit = (event) => {
    event.preventDefault()
    const nomeProdutoDigitado = document.getElementById("nome").value
    const precoProdutoDigitado = Number(document.getElementById("preco").value)
    const categoriaProdutoDigitado = document.getElementById("categoria").value

    const produto = {
        nome: nomeProdutoDigitado,
        preco: precoProdutoDigitado,
        categoria: categoriaProdutoDigitado
    }

    if (isEditando !== null) {
        produtosLocalStorage[isEditando] = produto
    } else {
        produtosLocalStorage.push(produto)
    }

    localStorage.setItem("Produtos", JSON.stringify(produtosLocalStorage))
    location.reload()
}

formCadastro.onreset = () => {
    isEditando = null
}

const produtosLocalStorage = JSON.parse(localStorage.getItem("Produtos") || "[]")
const listaProdutos = document.getElementById("itens")
listaProdutos.innerHTML = produtosLocalStorage.length
    ? produtosLocalStorage.map((produto, index) => `
    <tr>
        <td>${produto.nome}</td>
        <td>R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}</td>
        <td>${produto.categoria}</td>
        <td class="text-end text-nowrap">
            <button class="btn btn-sm btn-outline-success" type="button" aria-label="Editar ${produto.nome}" onclick="editarProduto(${index})">Editar</button>
            <button class="btn btn-sm btn-outline-danger" type="button" aria-label="Excluir ${produto.nome}" onclick="excluirProduto(${index})">Excluir</button>
        </td>
    </tr>
`).join("")
    : '<tr><td class="empty-list py-4" colspan="4">Nenhum produto cadastrado.</td></tr>'


function excluirProduto(index) {
    produtosLocalStorage.splice(index, 1)
    localStorage.setItem("Produtos", JSON.stringify(produtosLocalStorage))
    location.reload()
}

function editarProduto(index) {
    const produto = produtosLocalStorage[index]

    document.getElementById("nome").value = produto.nome
    document.getElementById("preco").value = produto.preco
    document.getElementById("categoria").value = produto.categoria
    isEditando = index
}
