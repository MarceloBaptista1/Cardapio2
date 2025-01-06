function req_assincrona(url, div_retorno, form = null) {
    $("#" + div_retorno).html("<p>Carregando...</p>"); 

    let formData = null;

    if (form) {
        formData = $("#" + form).serialize();
    }

    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        success: function(data) {
            $("#" + div_retorno).html(data); 
        },
        error: function(xhr, status, error) {
            $("#" + div_retorno).html('<p>Erro ao carregar conteúdo.</p>'); // Mostra mensagem de erro
            console.error('Erro ao carregar conteúdo:', error);
        }
    });
}
