var criaController = function(jogo) {
  var entrada = $("#entrada");
  var lacunas = $("#lacunas");

  var exibeLacunas = function() {
    $("li").remove();
    var arrayLacunas = jogo.lacunas;
    arrayLacunas.forEach(element => {
      var li = $("<li>")
        .text(element == "" ? "*" : element)
        .addClass("lacuna");
      lacunas.append(li);
    });
  };

  var mudaPlaceHolder = function(texto) {
    entrada.attr("placeholder", texto);
  };

  var guardaPalavraSecreta = function() {
    var palavra = entrada.val();
    jogo.setPalavraSecreta(palavra);
    entrada.val("");
    entrada.attr("maxlength", 1);
  };

  var sinalizaFim = function(flag) {
    $(".jumbotron").css("background", flag ? "#3c763dcc" : "#ee6e73");
  };

  var reinicia = function() {
    $(".jumbotron").css("background", "#eee");
    $("li").remove();
    jogo.reinicia();
    mudaPlaceHolder("Digite a palavra secreta e aperte enter!");
    entrada.attr("maxlength", 100);
  };

  var leChute = function() {
    var letra = entrada.val();
    if (letra != "") {
      var retorno = jogo.jogaLacunas(letra);
      if (retorno) {
        exibeLacunas();
      }
      entrada.val("");
      if (jogo.ganhouOuPerdeu()) {
        var sinal = jogo.ganhou();
        sinalizaFim(jogo.ganhou());
        setTimeout(function() {
          alert(
            sinal
              ? "Parabéns você ganhou"
              : "Infelizmente você perdeu, tente novamente!"
          );
          reinicia();
        }, 2000);
      }
    }
  };

  var inicia = function() {
    entrada.keypress(function(event) {
      if (event.which == 13) {
        switch (jogo.getEtapa()) {
          case 1:
            guardaPalavraSecreta();
            mudaPlaceHolder("Por favor chute uma letra e tecle enter!");
            exibeLacunas();
            break;
          case 2:
            leChute();
            break;
        }
      }
    });
  };
  return { inicia: inicia };
};
