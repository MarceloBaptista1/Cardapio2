function req_assincrona(url, div_retorno) {
    $("#" + div_retorno).html("<p>Carregando...</p>"); // Mostra o carregamento
    $.ajax({
        url: url,
        method: 'POST',
        success: function(data) {
            $("#" + div_retorno).html(data); // Atualiza o conteúdo da div
        },
        error: function(xhr, status, error) {
            $("#" + div_retorno).html('<p>Erro ao carregar conteúdo.</p>'); // Mostra mensagem de erro
            console.error('Erro ao carregar conteúdo:', error);
        }
    });
}
