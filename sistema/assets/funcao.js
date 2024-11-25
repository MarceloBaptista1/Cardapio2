// Realizar requisição assincrona
function req_assincrona(url) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            $('#retorno_req_assincrona').html(data); // Atualiza o conteúdo da div
        },
        error: function(xhr, status, error) {
            console.error('Erro ao carregar conteúdo:', error);
        }
    });
}