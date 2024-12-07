<?php
    require_once "../medicina/hamburger_tempera.php";
    try{
        $sql_lanche = "    SELECT 
                                    nome_lanche,
                                    descricao_lanche,
                                    GROUP_CONCAT(p.id_produto ORDER BY p.id_produto SEPARATOR ', ') AS id_ingredientes
                                FROM 
                                    LANCHES l
                                    JOIN LANCHES_PRODUTOS lp ON lp.id_lanche = l.id_lanche
                                    JOIN PRODUTOS p ON p.id_produto = lp.id_produto
                                GROUP BY
                                    lp.id_lanche
                            ";
        $sql_lanche_q = mysqli_query($conn, $sql_lanche);
        if(!$sql_lanche_q){
            throw new Exception("Erro ao recuperar lanches");
        }
        $sql_lanche_a = mysqli_fetch_assoc($sql_lanche_q);
        $array_id_ingredientes = explode(',', $sql_lanche_a['id_ingredientes']);
        var_dump($array_id_ingredientes);
        echo implode(",", $array_id_ingredientes);
        $sql_ingredientes = "   SELECT
                                     nome_produto
                                    ,preco_venda_produto
                                    ,foto_produto
                                    ,flag_bebida
                                    ,quantidade_produto as quantidade_ingrediente
                                FROM
                                    PRODUTOS p 
                                    JOIN LANCHES_PRODUTOS lp ON lp.id_produto = p.id_produto
                                WHERE
                                    p.id_produto in(1,2,3,4,5)
                            ";

    } catch (Exception $e) {
        echo 'Erro :: ' . $e->getMessage(), "\n";
    }
?>