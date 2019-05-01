var criaJogo = function(sprite) {
  return {
    sprite: sprite,
    palavra: null,
    lacundas: null,
    etapas: [1, 2, 3],
    etapa: 1,
    numeroErros: 0,
    //Palavra
    setPalavraSecreta: function(palavra) {
      this.palavra = palavra;
      this.lacundas = Array.apply(null, Array(palavra.length)).map(
        String.prototype.valueOf,
        ""
      );
      this.etapa = 2;
    },
    getPalavraSecreta: function() {
      return this.palavra;
    },
    hasPalavraSecreta: function() {
      return this.palavra == null ? false : true;
    },
    //Lacunas
    getLacunas: function() {
      return this.lacundas;
    },
    acabouLacunas: function() {
      if (this.lacundas.length == 0) {
        return false;
      }
      var flag = true;
      this.lacundas.forEach(element => {
        if (element == "") {
          flag = false;
        }
      });
      return flag;
    },
    // retorna true para acerto | retorna false para erro
    jogaLacunas: function(letra) {
      flag = false;
      var palavra = this.palavra.split("");
      palavra.forEach((element, index) => {
        if (element == letra) {
          flag = true;
          this.lacundas[index] = letra;
        }
      });

      if (flag == false) {
        this.numeroErros++;
        this.sprite.nextFrame();
        return false;
      } else {
        return true;
      }
    },
    getEtapa: function() {
      return this.etapa;
    },
    // Verifica
    perdeu: function() {
      return this.sprite.isFinish();
    },
    ganhou: function() {
      return this.acabouLacunas();
    },
    ganhouOuPerdeu: function() {
      return this.ganhou() || this.perdeu();
    },
    reinicia: function() {
      this.palavra = null;
      this.lacundas = null;
      this.etapas = [1, 2, 3];
      this.etapa = 1;
      this.numeroErros = 0;
      this.sprite.resetFrame();
    }
  };
};
