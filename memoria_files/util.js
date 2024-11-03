// JavaScript Document
function trim(cadena){
	for(i=0; i<cadena.length; ){
		if(cadena.charAt(i)==" ")
			cadena=cadena.substring(i+1, cadena.length);
		else
			break;
	}
	for(i=cadena.length-1; i>=0; i=cadena.length-1){
		if(cadena.charAt(i)==" ")
			cadena=cadena.substring(0,i);
		else
			break;
	}
	return cadena;
}
function blockButton(id, texto){
	var botonObj = document.getElementById(id);
	botonObj.readonly = "true";
	botonObj.value = texto;	
}
function validaFecha(fechaTxt){
	if(fechaTxt.charAt(4) == "-" && fechaTxt.charAt(7) == "-"){//yyyy-mm-dd
		var fechaArr = fechaTxt.split("-");
		var ano= fechaArr[0];
		var mes= fechaArr[1];
		var dia= fechaArr[2];
	}
	if(fechaTxt.charAt(2) == "/" && fechaTxt.charAt(5) == "/"){//dd-mm-aaaa
		var fechaArr = fechaTxt.split("/");
		var ano= fechaArr[2];
		var mes= fechaArr[1];
		var dia= fechaArr[0];
	}

	var d = new Date();
	var anoActual = d.getFullYear();
	if (isNaN(ano) || ano.length < 4 || parseInt(ano, 10) < (anoActual-1)){ return false; }
	if (isNaN(mes) || parseInt(mes, 10) < 1 || parseInt(mes, 10) > 12){ return false; }
	if (isNaN(dia) || parseInt(dia, 10) < 1 || parseInt(dia, 10) > 31){ return false; }
	if (mes == 4 || mes == 6 || mes == 9 || mes== 11) {
		if (dia > 30) { return false; }
	} else{
		if (mes == 2) {
			if(dia <= 28 )
				return true;
			else{
				if ((ano % 4 == 0) && dia == 29) return true;
				else return false;
			}
		}
	}
	return true;
}
function anoADia(fecha_str){//de yyyy-mm-dd a dd/mm/yyyy
	fecha_str = trim(fecha_str);
	if(fecha_str.charAt(4) == "-" && fecha_str.charAt(7) == "-"){//yyyy-mm-dd
		var fecha_arr = fecha_str.split("-");
		return fecha_arr[2]+"/"+fecha_arr[1]+"/"+fecha_arr[0];
	}
	return fecha_str;
}
function diaAAno(fecha_str){//de dd/mm/yyyy a yyyy-mm-dd 
	fecha_str = trim(fecha_str);
	if(fecha_str.charAt(2) == "/" && fecha_str.charAt(5) == "/"){//dd/mm/yyyy
		var fecha_arr = fecha_str.split("/");
		return fecha_arr[2]+"-"+fecha_arr[1]+"-"+fecha_arr[0];
	}
	return fecha_str;
}

function splitDate(fecha_id){//obtiene arreglo de fecha [aaaa,mm,dd]
	fechaObj = document.getElementById(fecha_id);
	if(fechaObj.value.charAt(4) == "-" && fechaObj.value.charAt(7) == "-"){//yyyy-mm-dd
		var fechaTmp_arr = fechaObj.value.split("-");
		var fecha_arr = new Array();// debe quedar yyyy/mm/dd. Mes 0-11
		fecha_arr[0] = fechaTmp_arr[0];
		fecha_arr[1] = fechaTmp_arr[1]-1;
		fecha_arr[2] = fechaTmp_arr[2];
		return fecha_arr;
	}
	if(fechaObj.value.charAt(2) == "/" && fechaObj.value.charAt(5) == "/"){//dd/mm/aaaa
		var fechaTmp_arr = fechaObj.value.split("/");
		var fecha_arr = new Array();// debe quedar yyyy/mm/dd. Mes 0-11
		fecha_arr[0] = fechaTmp_arr[2];
		fecha_arr[1] = fechaTmp_arr[1]-1;
		fecha_arr[2] = fechaTmp_arr[0];
		return fecha_arr;
	}
	return false;
}

function fechaAString(fecha_str) {
    fecha_str = trim(fecha_str);
	if(fecha_str.charAt(2) == "/" && fecha_str.charAt(5) == "/"){//dd/mm/yyyy
		var fecha_arr = fecha_str.split("/");
		return new Date(fecha_arr[2], fecha_arr[1]-1, fecha_arr[0]);
	}
	if(fecha_str.charAt(4) == "-" && fecha_str.charAt(7) == "-"){//yyyy-mm-dd
		var fecha_arr = fecha_str.split("-");
		return new Date(fecha_arr[0], fecha_arr[1]-1, fecha_arr[2]);
	}
	return null;
    
}

function cuentaDias(fechaI, fechaF) {//diferencia en días entre 2 fechas
    return Math.round((fechaF-fechaI)/(1000*60*60*24));
}

function validaPassword(texto){//solo letras, numeros y .
	patron = /^[\wñÑ\.]{6,32}$/;
	return patron.test(trim(texto));
}

function validaMail(email) {
  var patron = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return patron.test(trim(email));
}

function scrollToElement(objId, tiempo, offset = 0){//objID = ID objeto jquery , tiempo en ms
	$('html,body').stop(true, false).animate({scrollTop: $(objId).offset().top-offset}, tiempo);
}

function moneyParse(valor){//remueve decimales adicionales
	return Math.ceil(valor * 100) / 100;
}