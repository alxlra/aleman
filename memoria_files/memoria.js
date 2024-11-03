var empate = false;
var endGame = false;
//var alumnoID = "";//id de alumno que respondió bien
var pick = false;
var turno; //de quien es el turno? 0/1
//var anteriores = [];//registro de jugadores pasados

$(document).ready(function(){
   $('[data-toggle="tooltip"]').tooltip();
	var matchingGame = {};
	matchingGame.deck = [
	'card1_1', 'card1_2',
	'card2_1', 'card2_2',
	'card3_1', 'card3_2',
	'card4_1', 'card4_2',
	'card5_1', 'card5_2',
	'card6_1', 'card6_2',
	'card7_1', 'card7_2',
	'card8_1', 'card8_2',
	'card9_1', 'card9_2',
	'card10_1', 'card10_2',
	'card11_1', 'card11_2',
	'card12_1', 'card12_2',
	];

	function shuffle() {
		return 0.5 - Math.random();
	}
	matchingGame.deck.sort(shuffle);

	// initialize each card's position
	$(".card").each(function(index) {
		// get a pattern from the shuffled deck
		var pattern = matchingGame.deck.pop();
		// visually apply the pattern on the card's back side.
		$(this).find(".back").addClass(pattern);
		// embed the pattern data into the DOM element.
		var cardname = pattern.split("_");
		$(this).attr("data-pattern", cardname[0]);
		// listen the click event on each card DIV element.
		$(this).click(selectCard);
	});
	
	//puntos de equipos
	
	for(var eq_num=2; eq_num <= numEquipos; eq_num++){
		var clone = $("#resultados .resultado:first-child").clone().appendTo("#resultados");
		clone.find("#pares_1").attr("id", "pares_"+eq_num);
		clone.find("strong").html("Equipo "+eq_num);
	}

	function selectCard() {
		if(pick){
		// we do nothing if there are already two card flipped.
			if ($(".card-flipped").size() > 1) {
				return;
			}
			$(this).addClass("card-flipped");
			// check the pattern of both flipped card 0.7s later.
			if ($(".card-flipped").size() === 2) {
				setTimeout(checkPattern,700);
			}
		}
	}

	function checkPattern() {
		pick = false;
		if (isMatchPattern()) {//pareja quita
			$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
			$(".card-removed").bind("transitionend", removeTookCards);
			equipos[turno].pares++;
			$("#pares_"+(parseInt(turno)+1)).text(equipos[turno].pares);
		} else {//no pareja voltea
			//$(".card-flipped").removeClass("card-flipped");
			cambiaTurno();
			setTimeout(muestraTurno, 2000);
		}
		
	}

	function isMatchPattern() {
		var cards = $(".card-flipped");
		var pattern = $(cards[0]).data("pattern");
		var anotherPattern = $(cards[1]).data("pattern");
		return (pattern === anotherPattern);
	}
	function removeTookCards() {
		$(".card-removed").remove();
		if($(".card").length == 0){//se acabaron las cartas
			endGame = true;
			setTimeout(finJuego, 1000);
		}else{
			cambiaTurno();
			setTimeout(muestraTurno, 1000);
		}
	}
	
	$("#game-start").click(function(){
		empate = false;
		endGame = false;
		pick = false;
		turno = Math.floor((Math.random() * numEquipos));
		$(".comenzar").toggleClass("hidden");
		muestraTurno();
	});
	
	function muestraTurno(){
		$(".card-flipped").removeClass("card-flipped");//voltea cartas qe esten cara arriba
		
		$('#turno').text("Responde la pregunta");
		$('#modal').modal({
			show: true,
			backdrop: 'static',
			keyboard: false
		});
		$('#quien-modal').text("Equipo "+(turno+1));
		$('#formaModal .panel').removeClass().addClass("panel "+equipos[turno].color);
		if(preguntas.length == 0)
			$('#preg_txt').addClass("hidden");
		else{
			$('#preg_txt').removeClass("hidden");
			$('#preg_txt').html(getPregunta());
		}
	}
	
	/*function getAlumno(){
		var id = "";
		var i = 0;
		var jugTotal = equipos[turno].jugadores.length;
		if(jugTotal == 1){//solo uno, lo selecciona
			return equipos[turno].jugadores[0].nombre;
		}else{
			do{
				if(jugTotal == 2)
					i = Math.floor(Math.random()*jugTotal);
				else{
//					if(Math.floor(Math.random()*100 < 95))//95% mitad menos participativa
//						i = Math.floor(Math.random()* Math.ceil(jugTotal/2));
//					else//cualquiera
						i = Math.floor(Math.random()*jugTotal);
				}
				id = equipos[turno].jugadores[i].id;
			}while(anteriores[turno].indexOf(id) >= 0);
			alumnoID = id;
			registraAnterior(id);
			nombreAlArr = equipos[turno].jugadores[i].nombre.split(", ");
			return(nombreAlArr[1]+" "+nombreAlArr[0]);
		}
	}*/
	
	function getPregunta(){
		var pregTotal = preguntas.length;
		i = Math.floor(Math.random()*pregTotal);
		var textoPreg  = preguntas[i];
		preguntasOld.push(preguntas.splice(i, 1).toString());//quita pregunta utilizada
		if(preguntas.length == 0){//removió todas
			preguntas = preguntasOld;
			preguntasOld = [];
		}
		return(textoPreg);
	}
	
	function compare(a,b) {
		if (a.participaciones < b.participaciones) return -1;
		if (a.participaciones > b.participaciones) return 1;
		return 0;
	}
	/*function agregaParticipacion(id){//registra participación de alumnos
		for(var i=0; i < equipos[turno].jugadores.length; i++){
			if(parseInt(equipos[turno].jugadores[i].id) == parseInt(id)){
				equipos[turno].jugadores[i].participaciones++;
				break;
			}
		}
	}*/
	/*function registraAnterior(newID){//registra id de participante anterior
		if(anteriores[turno].length != 0){
			var j = anteriores[turno].length;
			if(j>= Math.round(equipos[turno].jugadores.length*2/3)){//No se puede repetir el 1/3 del min de alumnos ya seleccionado del equipo
				j = Math.round(equipos[turno].jugadores.length*2/3)-1;
			}
			for(; j>0; j--){
				anteriores[turno][j] = anteriores[turno][j-1];
			}
		}
		anteriores[turno][0] = newID;
	}*/
	
	$("#resp-ok").click(function(){//respuesta correcta
		$('#turno').text("Selecciona un par de cartas");
		//agregaParticipacion(alumnoID);
		//equipos[turno].jugadores.sort(compare);//reordena con nuava participación
		pick = true;//puede elegir
		$('#modal').modal('hide');
		//scrollToElement("#top", 500);
	});
	
	$("#modal .modal-header button").click(function(){
		if(!endGame){
			if(confirm("¿Deseas cancelar el concurso?")){
				$('#turno').text("Concurso terminado");
				return true;
			}
			return false;
		}
		return true;
	});									 
	$("#resp-err").click(function(){
		$('#turno').text("Cambio de turno");
		$('#modal').modal('hide');
		cambiaTurno();
		setTimeout(muestraTurno, 1000);
	});
	
	$(".game-restart").click(function(){
		location.reload();				 
	});
	
	function cambiaTurno(){
		turno = (parseInt(turno)+1)%numEquipos;
		$('#quien').text("Equipo "+(parseInt(turno)+1));
	}
	
	function checaGanador(){
		var maxPares = 0;
		var ganador = "";
		for(var i = 0; i<equipos.length; i++){
			if(equipos[i].pares > maxPares)
				maxPares = equipos[i].pares;
		}
		for(var i = 0; i<equipos.length; i++){
			if(equipos[i].pares == maxPares)
				ganador += i+",";
		}
		return ganador.substring(0, ganador.length-1);
	}
	
	function finJuego(){
		if(endGame){//si se terminó el juego
			$('#turno').text("Fin del concurso");
			var ganador = checaGanador();//busca quien gana, no es el ultimo en jugar
			if(ganador.indexOf(',') === -1){//no hay coma un solo ganador
				$("#quien-gano").text(parseInt(ganador)+1);//Numero del equipo ganador (0) 
			}else{//empate
				$("#modalEnd h3").text("¡Es un empate!");
				var ganadorText = "";
				var ganadorArr = ganador.split(",");
				var eq;
				for(var i=0; i<ganadorArr.length; i++){
					eq = parseInt(ganadorArr[i])+1;//Numero del equipo ganador (0,1,...) 
					if(i == ganadorArr.length-2){
						ganadorText += eq+" y ";
					}else{
						if(i < ganadorArr.length-2)
							ganadorText += eq+", ";
						else
							ganadorText += eq+"";
					}
				}
			}
			$("#ganador_id").val(ganador);//ids de los equipos involucrados
	  		$('#modalEnd').modal('show');
			// ajax para recompensas
			
			$(".equipo option").each(function(index) {//selecciona a todos
				$(this).attr("selected", true);
			});
		}
	}
});