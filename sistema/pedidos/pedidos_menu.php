<?php require_once $_SERVER['DOCUMENT_ROOT'] . "/Cardapio2/header_sistema.php"?>
    <div class="row w-100">
        <div class="col-4 text-center">
            <button class="btn btn-lg btn-primary" onclick="req_assincrona('pedidos/pedidos_listar.php', 'retorno')">
                <i class="fa-solid fa-list"></i>
                <span class="d-none d-md-inline">Listar pedidos</span>
            </button>
        </div>
        <div class="col-4 text-center">
            <button class="btn btn-lg btn-primary">
                <i class="fa-solid fa-plus"></i>
                <span class="d-none d-md-inline">Adicionar pedido</span>
            </button>
        </div>
        <div class="col-4 text-center">
            <a class="btn btn-lg btn-primary">
                <i class="fa-regular fa-clock"></i>
                <span class="d-none d-md-inline">Logs</span>
            </a>
        </div>
        <div class="col-12 mt-4">
            <div class="bg-light p-3" id="retorno" style="border-radius: 20px; border: 1px solid lightgray">
                Meu conteudo vai ficar aqui
            </div>
        </div>
    </div>
<?php require_once $_SERVER['DOCUMENT_ROOT'] . "/Cardapio2/footer_sistema.php" ?>