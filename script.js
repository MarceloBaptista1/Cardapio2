const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// Abri o Modal Do carrinho
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price);
    }
});

function alertaNovoProduto(nome_lanche) {
    const isMobile = window.innerWidth <= 768;
    Toastify({
        text: nome_lanche + " Adicionado ao carrinho",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            fontSize: isMobile ? "14px" : "16px", // Fonte menor no mobile.
            padding: isMobile ? "10px" : "15px", // Padding ajustado.
            borderRadius: "12px",
            background: "DarkOrange",
            color: "#000000",
        },
    }).showToast();
}

// Função para ADD no carrinho
function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }
    updateCartModal();
}

// Atualizar Carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add(
            "flex",
            "mb-4",
            "flex-col",
            "justify-between"
        );
        cartItemElement.innerHTML = `
            <style>
                input[type=number]::-webkit-inner-spin-button { 
                    -webkit-appearance: none;

                }
                input[type=number] { 
                -moz-appearance: textfield;
                appearance: textfield;
                    margin-right: 10px;
                    margin-left: 10px;
                width: 60px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .btn-edit {
                font-size: 10px
                padding: 2px 6px;
                background-color: transparent; 
                color: green; 
                cursor: pointer; 
                transition: all 0.3s ease;
            }
            </style>
            <div class="flex items-center justify-between mb-8"> 
                <div>
                    <p class="font-bold mb-1">${item.name}
                    <button type="button" class="btn-edit ml-2" onclick="editItem(${index})">Editar</button>      
                    </p>
                    <p>Quantidade: <span id="quantityProductsCartUpdated-${index}">${
            item.quantity
        }</span></p>
                    <p class="font-medium">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-5">
                    <button type="button" class="fa-solid fa-minus btn-minus" onclick="decreaseQuantity(${index})"></button>
                    <input 
                        type="number" 
                        id="quantityProductsCart-${index}" 
                        name="quantityProductsCart" 
                        min="1" 
                        max="99"
                        value="${item.quantity}"
                        class="form-control text-center"
                        onchange="updateQuantity(${index})"
                    >
                    <button type="button" class="fa-solid fa-plus btn-plus" onclick="increaseQuantity(${index})"></button> 
                </div>
            </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    cartCounter.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

//Função quando apertar no Editar dentro do Modal

function editItem(index) {
    const item = cart[index];

    document.getElementById(
        "modalItemName"
    ).textContent = `Lanche: ${item.name}`;
    document.getElementById("modalQuantity").value = item.quantity;

    document.getElementById("editModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
}

// Função para diminuir a quantidade
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        updateCartModal();
    }
}

// Função para aumentar a quantidade
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCartModal();
}

// Função para atualizar a quantidade diretamente do input
function updateQuantity(index) {
    const quantityInput = document.getElementById(
        `quantityProductsCart-${index}`
    );
    const newQuantity = parseInt(quantityInput.value, 10);

    if (newQuantity >= 1) {
        cart[index].quantity = newQuantity;
        updateCartModal();
    } else {
        quantityInput.value = 1;
        cart[index].quantity = 1;
        updateCartModal();
    }
}

// Função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = cart.findIndex((item) => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== " ") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});

// Finalizar pedido
checkoutBtn.addEventListener("click", function () {
    const isMobile = window.innerWidth <= 768;
    const isOpen = checkOpenRestaurant();
    if (!isOpen) {
        Toastify({
            text: "Ops, restaurante fechado no momento!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                fontSize: isMobile ? "14px" : "16px", // Fonte menor no mobile.
                padding: isMobile ? "10px" : "15px", // Padding ajustado.
                borderRadius: "15px",
                background: "#ef4444",
            },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    const cartItems = cart
        .map((item) => {
            return ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`;
        })
        .join(" ");

    const message = encodeURIComponent(cartItems);
    const phone = "16992971084";

    window.open(
        `https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,
        "_blank"
    );

    cart = [];
    updateCartModal();
});

// Verificar se está aberto
function checkOpenRestaurant() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkOpenRestaurant();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
