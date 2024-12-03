<?php require_once $_SERVER['DOCUMENT_ROOT'] . "/Cardapio2/header_sistema.php"?>
    <form>        
        <div class="row d-flex">
            <div class="mb-3 col-12 col-md-4 col-lg-1">
                <label for="id_cliente" class="form-label">Id</label>
                <input type="number" class="form-control" id="id_cliente">
            </div>
            <div class="mb-3 col-12 col-md-6 col-lg-4">
                <label for="nome_cliente" class="form-label">Nome Cliente</label>
                <input type="text" class="form-control" id="nome_cliente">
            </div>
            <div class="mb-3 col-12 col-md-6 col-lg-4">
                <label for="status_pedido" class="form-label">Status</label>
                <input type="text" class="form-control" id="status_pedido">
            </div>
            <div class="col-12 col-md-4 col-lg-2 d-flex align-items-center">
                <div class="form-check mt-2 me-3">
                    <label class="form-label" for="pedidos_ativos">
                        Ativos
                    </label>
                    <input class="form-check-input mt-1" type="radio" name="pedidos" id="pedidos_ativos">
                </div>
                <div class="form-check mt-2 me-3">
                    <label class="form-label" for="pedidos_inativos">
                        Inativos
                    </label>
                    <input class="form-check-input mt-1" type="radio" name="pedidos" id="pedidos_inativos">
                </div>
                <div class="form-check mt-2 me-3">
                    <label class="form-label" for="pedidos_todos">
                        Todos
                    </label>
                    <input class="form-check-input mt-1" type="radio" name="pedidos" id="pedidos_todos" checked>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-end">
            <div class="col-2">
                <button class="btn btn-success w-100">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span class="d-none d-md-inline">Buscar</span>
                </button>
            </div>
        </div>
    </form>
<?php require_once $_SERVER['DOCUMENT_ROOT'] . "/Cardapio2/footer_sistema.php" ?>