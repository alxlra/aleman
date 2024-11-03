// JavaScript Document
var palabras = [
	[//profesión
		"Ingenieur -in",
		"Architekt -in",
		"Student -in",
		"Hausmann | Hausfrau",
		"Koch -in",
		"Artz | Ärtzin",
		"Lehrer -in",
		"Landwirt -in",
		"Sänger -in",
		"Fotograf -in",
		"Musiker -in",
		"Verkäufer  -in",
		"Friseur  -in",
		"Kellner -in",
		"Tänzer -in",
	],[//ciudad
		"Berlin",
		"Hamburg",
		"München",
		"Köln",
		"Frankfurt am Main",
		"Stuttgart",
		"Düsseldorf",
		"Dortmund",
		"Leipzig",
		"Dresden",
		"Hannover",
	],[//calle
		"Ackerstraße",
		"Motzartstraße",
		"Turmstraße",
		"Tiergartenstraße",
		"Karl-Marx-Allee",
		"Rigaer Straße",
		"Wilhelmstraße",
		"Ahornstraße",
		"Frankfurter Allee",
		"Friedrichstraße",
		"Leipziger Straße"
	],[//pais de procedencia
		"Mexiko",
		"Deutschland",
		"die Schweiz",
		"Österreich",
		"Belgien",
		"Russland",
		"Spanien",
		"Frankreich",
		"Argentinien",
		"Kolumbien",
		"die USA",
		"Australien"
	],[//edo civil
		"ledig",
		"verheiratet",
		"geschieden",
		"verwitwet"
	]
];

function getProfesion(){
	var i = Math.floor(Math.random() * palabras[0].length);
	return "<b>Beruf:</b> "+palabras[0][i];
}

function getCiudad(){
	var i = Math.floor(Math.random() * palabras[1].length);
	return palabras[1][i];
}

function getCalle(){
	var num  = Math.floor(Math.random() * 90)+10;
	var i = Math.floor(Math.random() * palabras[2].length);
	return "<b>Addresse:</b> "+getCiudad()+", "+palabras[2][i]+" #"+num;
}

function getPais(){
	var i = Math.floor(Math.random() * palabras[3].length);
	return "<b>Herkunftsort:</b> "+palabras[3][i];
}
function getEdoCivil(){
	var i = Math.floor(Math.random() * palabras[4].length);
	return "<b>Familienstand:</b> "+palabras[4][i];
}
function getTelefono(){
	var num = "";
	var size = 6;
	for(var i=0; i< size; i++){
		num = num+""+Math.floor(Math.random() * 10);
	}
	return "<b>Telefonnumer:</b> "+num;
}