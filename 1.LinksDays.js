//
//
// Read all the links registered in archive.org for a IMDb link
//
// EDIT the IMDb link!!
//
//
//
// carga en puppeteer:
const puppeteer = require('puppeteer')
// ejecuta el módulo:
void (async () => { 
	//crea un archivo usando el módulo filesystem:
	var fs = require('fs');
	// lee el año de la primera fecha registrada del archivo creado por FirstDate.js y lo guarda en la variable "releaseYear":
	var ReleaseDate = JSON.parse(fs.readFileSync('FirstData.json', 'utf8'));
	var ReleaseYear = ReleaseDate.slice(0,4)
	// definime el año de la última fecha que tendremos en cuenta
	i=2020
	// crea una variable en la que guardaremos los enlaces de todos los días registrados
	var AllLinks = []
	try { // en caso de que no haya errores
		//bucle en el que permanece cuando la página sea igual o posterior al primer año de registro mientras este no sea anterior a 2010
		while (i>=ReleaseYear&&i>=2010) { 
			// crea un navegador:
			const browser = await puppeteer.launch() 
			// crea una pestaña en el navegador:
			const page = await browser. newPage()
			// define la parte inicial de la página web:
			var header = 'https://web.archive.org/web/'
			// define la parte final de la página web:
			var ending = '*/https://www.imdb.com/title/tt7653254/'
			// define la página web: 
			var WebSite=header+i+ending
			// evita el límite de 30000ms para que se cargue la página:
			await page.setDefaultNavigationTimeout(0);
			// va al calendario de un año del que se van a extraer las fechas en las que hay registro:
			await page.goto(WebSite) 
			// espera a que se cargue el selector que nos interesa:
			await page.waitForSelector("#react-wayback-search > div.calendar-layout > div.calendar-grid div > div > a"); // Espera a que se cargue el selector que nos interesa
			// guarda en la variable "links" el dato de salida del año "i":
			const links = await page.evaluate(() => { 
				/// guarda en la variable "DataDate" el valor del selector que corresponde a una fecha de la que hay registro:
				const DataDate = "#react-wayback-search > div.calendar-layout > div.calendar-grid div > div > a"
				// guarda en la lista "Dates" todos los "DataDate" que encuentra en la página web
				const Dates = document.querySelectorAll(DataDate) 
				// define el vector de salida "Linkdates"
				const Linkdates = [] 
				// recorre todos los registros de la lista "Dates" con la variable "day"
				for (const day of Dates) {
					// introduce en la variable "Linkdates" cada enlace registrado la variable "day"
					Linkdates.push({
						link: day.getAttribute("href"),
					})
				}
				//devuelve el vector definido como "Linkdates" en la variable "links":
				return Linkdates 
			})
			// añade a "AllLinks" los enlaces registrados en la variable "links" para el año "i":
			AllLinks=AllLinks.concat(links)
			// resta 1 al año del que extraeremos datos:
			i--
			//cierra el navegador:
			await browser.close() 
		}	
		// muestra el valor devuelto
		console.log(JSON.stringify(AllLinks, null, 2)) 
		const fs = require('fs')
		//crea un archivo usando el módulo filesystem:
		fs.writeFile( // el archivo json se crea en la ubicación indicada con el siguiente nombre:
			'./alldates.json',
			// convierte a formato JSON la variable "AllLinks":
			JSON.stringify(AllLinks, null, 2), 
			// indica si se ha escrito el archivo correctamente o no: 
			(err) => err ? console.error('Data not written', err) : console.log('Data written') // indica si se ha escrito el archivo correctamente o no
		)
	} catch (error) { // en caso de que haya errores
		console.log('error') // escribe error
	}
})()