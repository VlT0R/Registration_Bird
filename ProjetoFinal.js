class Passaro{
    constructor(cod,nome,ordem,familia){
        this.cod = cod;
        this.nome = nome;
        this.ordem = ordem;
        this.familia = familia;
    }
}

var listaPassaro = [];
var auxPosicao = '';

function cadastrarPassaro(lista,passaro){
    lista.push(passaro);
}

function alterarPassaro(lista,passaro,posicao){
    lista[posicao] = passaro;
}

function excluirPassaro(lista,posicao){
    lista.splice(posicao, 1);
}

function listarPassaros(lista){
    let auxHtml  = '';
    for (let i = 0; i< lista.length; i++){
        auxHtml += '<tr>' + 
                   '<td>' + lista[i].cod + '</td>'+
                   '<td>' + lista[i].nome + '</td>'+
                   '<td>' + lista[i].ordem + '</td>'+
                   '<td>' + lista[i].familia + '</td>'+
                   '<td>' + 
                   '<a class = "btn btn-secondary" rel="' + i +'">'+ '<i class="fas fa-edit"></i>' +
                   '</a>'+ 
                   '</td>'+ 
                   '<td>'+
                        '<a class="btn btn-danger" rel="'+ i +'">'+
                        '<i class="fas fa-remove"></i>'+
                        '</a>'+
                   '</td>'+
                   '</tr>';
    }
    return auxHtml;
}

$(document).ready(() => {
    // document.getElementById('btnSalvar');
    $('#btnSalvar').click(() => {
        // let nome = // document.getElementById('nome').value;
        let cod = $('#cod').val();
        let nome = $('#nome').val();
        let ordem = $('#ordem').val();
        let familia = $('#familia').val();

        if(cod != '' && nome != '' && ordem != '' && familia!= ''){
            let novoPassaro = new Passaro(cod,nome,ordem,familia);
            if(auxPosicao == '') {
                cadastrarPassaro(listaPassaro,novoPassaro);
            }else{
                alterarPassaro(listaPassaro,novoPassaro,auxPosicao);
                auxPosicao = '';
            }
            
            //document.getElementByTagName('input).value = '';
            $('#tbTabela').html(listarPassaros(listaPassaro));
            $('input').val('');
            $('select').val('');

        }else {
            alert('Todos os dados devem ser informados!');
        }
    });

    $('#btnCancelar').click(() => {
        auxPosicao = '';
        $('input').val('');
        
    });

    $('#tbTabela').on('click','.btn-secondary',function(){
        //let posicaoAtual = $(this).attr('rel');
        auxPosicao= $(this).attr('rel');
        $('#cod').val(listaPassaro[auxPosicao].cod );
        $('#nome').val(listaPassaro[auxPosicao].nome );
        $('#ordem').val(listaPassaro[auxPosicao].ordem );
        $('#familia').val(listaPassaro[auxPosicao].familia );

    });

    $('#tbTabela').on('click', '.btn-danger', function() {
		let posicaoExcluir = $(this).attr('rel');
		if (confirm('Tem certeza que deseja excluir?')) {
			excluirPassaro(listaPassaro, posicaoExcluir);
			$('#tbTabela').html(listarPassaros(listaPassaro));
		}
	});

    $('#btnAjax').click(() => {
        $.ajax({
            url: 'http://date.jsontest.com',
            method: 'GET'
        }).done(function(resposta){
            $('#retornoAjax').html(resposta.time)
        });
    });

    $('#btnJson').click(() => {
        let jsonPassaro = JSON.stringify(listaPassaro);
        console.log(jsonPassaro);
    });
});