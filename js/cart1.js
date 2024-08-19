let carrinho = [];

function start(){
    fetch('https://fakestoreapi.com/products?limit=10')
    .then(response => response.json())
    .then(data => {
        preencherCarrinho(data)
    })
    .catch(error => {
        console.log('Ocorreu um erro', error);
    })
}

function preencherCarrinho(produtos){
    produtos.forEach(data => {
        adicionarAoCarrinho(
            data.title,
            data.image,
            data.description,
            data.price
        )
    });

    atualizarCarrinho()
}

function adicionarAoCarrinho(nome, imgLink, descricao, preco){
    carrinho.push({
        "nome": nome, 
        "imgLink": imgLink,
        "descrição": descricao,
        "preço": Number.parseFloat(preco),
        "quantidade": 0,
        "total": 0
    })
}

function atualizarCarrinho(){
    let carrinhoHTML = document.getElementById("carrinho");

    carrinho.forEach((produto,index) =>{

        carrinhoHTML.innerHTML +=
    `<div
        id='produto${index}'
        class='d-flex flex-row justify-content-between align-items-center pt-lg-12 pt-md-12 pt-2 pb-3 border-bottom mobile'>
        
        <div class='d-flex flex-row align-items-center'>
            <div>
                <img
                    src='${produto.imgLink}'
                    width='150'
                    height='150'
                    alt =''
                    id='image'
                />
            </div>
            <div class='d-flex flex-column pl-md-4 pl-1'>
                <div><h6>${produto.nome}</h6></div>   
            </div>
        </div>
        <div class='pl-md-2 pl-1 text-center'> <b>R$ ${produto.preço.toFixed(2)}</b></div>
        <div class='pl-md-3 pl-2 text-center'>
            <span class='fa fa-minus-square text-secondary' onclick='removeItem(${index})'></span>
            <span class='px-md-3 px-1' id='quantidade${index}'>${produto.quantidade}</span>
            <span class='fa fa-plus-square text-secondary' onclick='adicionarItem(${index})'></span>   
        </div>
        <div class='pl-md-0 pl-1 text-center'>
            <b>R$ <span id='total${index}'>0</span></b>
        </div>
        <div class='close' onclick='removeProduto(${index})'>
            <span class='fa fa-times'></span>
        </div>

    </div>`
    
    })
}

function adicionarItem(item){
    let qtd = document.getElementById('quantidade' + item)
    let produto  = carrinho[item]
    produto.quantidade += 1;
    qtd.innerHTML = produto.quantidade
    atualizarNumerosTela(qtd,item)
}

function removeItem(item){
    let qtd = document.getElementById('quantidade' + item)
    let produto  = carrinho[item]
    if(produto.quantidade > 0){
        produto.quantidade -=1;
        qtd.innerHTML = produto.quantidade
        atualizarNumerosTela(qtd,item)
    }
}

function atualizarNumerosTela(qtd, item){
    qtd.innerHTML = carrinho[item].quantidade
    atualizaTotalProduto(item)
    atualizaSubtotal()
}

function atualizaTotalProduto(item){
    let total = document.getElementById('total' + item)
    let produto = carrinho[item]
    produto.total  = Number.parseFloat(
        produto.quantidade * produto.preço
    )
    total.innerHTML = produto.total.toFixed(2)
}

function atualizaSubtotal(){
    let totalCompra = document.getElementById('valorTotalCompra')
    let subtotal = 0
    carrinho.forEach(produto => {
        subtotal +=produto.quantidade * produto.preço
    })
    totalCompra.innerHTML = subtotal.toFixed(2)
}

function removeProduto(item){
    let carrinhoHTMl = document.getElementById('carrinho')
    let produto = document.getElementById('produto' + item)
    if(confirm("Você tem certeza que deseja remover o produto?")){
        carrinho[item].quantidade = 0;
        atualizaSubtotal()
        carrinhoHTMl.removeChild(produto)
    }
}
