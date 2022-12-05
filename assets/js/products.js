

const btnProductsRegistration = document.querySelector('.menu-products');
const btnSaveProducts = document.querySelector('#btnAddProductTable');
const btnCancelTable = document.querySelector('#btn-cancelTable');
const btnUpdateProduct = document.querySelector('#btn-productUpdate');

const btnEdit = document.getElementById('btn-edit');
const btnTrash = document.getElementById('btn-trash');

let inputCode = document.querySelector('#productCode');
let inputProductName = document.querySelector('#productName');
let inputProductPrice = document.querySelector('#productPrice');

let url = "http://localhost:3000";

let valueInputCode = inputCode.value;
let valueProductName = inputProductName.value;
let valueProductPrice = inputProductPrice.value;

let addProduct = {}
let productList = {}

const tableProduct = document.querySelector('.productTable');


function changeTable() {
    sectionOrder.style.display = 'none';
    tableProduct.style.display = 'flex';
}

function changeButtonSaveUpdate() {
    btnAddProductTable.style.display = 'none';
    btnUpdateProduct.style.display = 'flex';
}

function changeButtonUpdate() {
    btnUpdateProduct.style.display = 'none';
    btnAddProductTable.style.display = 'flex';
    
}

const showProducts = () => {
    let trTds = '';

    fetch(`${url}/produto/todos`).then(response => {
        return response.json()
    }).then(response => {
        tBodyProductTable.innerHTML = '';
        const produtos = [...response]
        produtos.reverse().forEach(productList => {
            trTds +=
                `<tr>
                    <td>${productList.id}</td>
                    <td>${productList.nome}</td>
                    <td>${productList.preco}</td>
                    <td>
                    <button id="btn-edit" onClick="searchProductToUpdate('${productList.id}'); 
                    changeButtonSaveUpdate()">
                        <img src="/assets/images/edit.svg" alt="">
                    </button>
                </td>
                <td>
                    <button id="btn-trash" onClick="productDelete('${productList.id}')">
                        <img src="/assets/images/trash.svg" alt="">
                    </button>
                </td>
                </tr>`;
        })
        tBodyProductTable.innerHTML += trTds;
    })
}

const productRegistration = () => {
    let valueInputCode = inputCode.value;
    let valueProductName = inputProductName.value;
    let valueProductPrice = inputProductPrice.value;
    let product = {
        id: valueInputCode,
        nome: valueProductName,
        preco: valueProductPrice
    }

    const init = {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" }
    };
    fetch(`${url}/produto`, init).then((response) => {
        if (response.ok) {
            alert("Produto cadastrado com sucesso")
        } else if (valueInputCode === '' || valueProductName === '' || valueProductPrice === '') {
            return alert('Preencher todos os campos')
        } else {
            alert("Produto já cadastrado")
        }
        document.getElementById("productForm").reset();
        showProducts()
    })
}

const searchProductToUpdate = (id) => {

    fetch(`${url}/produto/${id}`, {
        method: "GET",
        headers: { "Content-type": "aplication/json" }
    }).then((response) => response.json())
        .then(produtos => {

            produtos.forEach(produto => {
                inputCode.value = produto.id;
                inputProductName.value = produto.nome;
                inputProductPrice.value = produto.preco;
            })
        })
}

const productUpdate = () => {
    let valueInputCode = inputCode.value;
    let valueProductName = inputProductName.value;
    let valueProductPrice = inputProductPrice.value;
    let product = {
        id: valueInputCode,
        nome: valueProductName,
        preco: valueProductPrice
    }

    const init = {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" }
    };
    fetch(`${url}/produto/${product.id}/atualizar`, init).then((response) => {
        if (response.ok) {
            alert("Produto atualizado com sucesso")
        } else if (valueInputCode === '' || valueProductName === '' || valueProductPrice === '') {
            return alert('Preencher todos os campos')
        }
        document.getElementById("productForm").reset();
        showProducts()
        changeButtonUpdate()
    })
}

const productDelete = (id) => {
    let valueInputCode = inputCode.value;
    let valueProductName = inputProductName.value;
    let valueProductPrice = inputProductPrice.value;
    let product = {
        id: valueInputCode,
        nome: valueProductName,
        preco: valueProductPrice
    }

    const init = {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" }
    };
    fetch(`${url}/produto/${id}/deletar`, init).then((response) => {
        if (response.ok) {
            alert("Produto deletado com sucesso")
        } 

        showProducts()
    })
}

function btnCancel() {
    inputCode.value = '';
    inputProductName.value = '';
    inputProductPrice.value = '';
}




btnSaveProducts.addEventListener('click', productRegistration);

btnProductsRegistration.addEventListener('click', showProducts);
btnProductsRegistration.addEventListener('click', changeTable);
btnCancelTable.addEventListener('click', btnCancel);
btnUpdateProduct.addEventListener('click', productUpdate);
