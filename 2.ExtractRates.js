//
//
// Read all the IMDb ratings registered in archive.org for a film
//
// No necessary to edit
//
//
//
const moment = require('moment'); // importa libreria moment para calcular días entre fechas
const puppeteer = require('puppeteer-extra') // carga puppeteer con funcionalidades extra 
const StealthPlugin = require('puppeteer-extra-plugin-stealth') //carga StelathPlugin para usar opción headless
puppeteer.use(StealthPlugin()) //usa StealthPlugin en las páginas

const ReadRating = async function(Filmlink, InfoTotal, Release, browser, page) { //carga variables

	try { // en caso de que no haya errores
		var DataDate = Filmlink.slice(28,36) // extrae la fecha en la que guarda la nota a partir del enlace
		var newDesign=parseFloat(DataDate) // pasa cadena a punto flotante

		if (newDesign>20160123) { // si la fecha es posterior a 23/01/2016 los datos se sacan con unos selectores concretos
			await page.goto(Filmlink) /// va a la página de la que se va a extraer el valor
			await page.waitForSelector("#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1"); //espera a que se cargue el selector
			const rates = await page.evaluate(() => { // se guarda en la variable rates el dato de salida
			
				/// guarda el valor del selector en la variable RATE_SELECTOR:
				const TITLE_SELECTOR = "#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1" 
				const MovieTitle = document.querySelector(TITLE_SELECTOR).innerText.trim() /// variable donde se guarda el titulo que está en formato texto evitando espacios en blanco
			 	/// guarda el valor del selector en la variable RATE_SELECTOR:
			 	const RATE_SELECTOR = "#title-overview-widget > div.vital > div.title_block > div > div.ratings_wrapper > div.imdbRating > div.ratingValue > strong > span" 
			 	const MovieRating = document.querySelector(RATE_SELECTOR).innerText.trim() /// variable donde se guarda la nota que está en formato texto evitando espacios en blanco
			 	/// guarda el valor del selector en la variable NUMBER_SELECTOR:
			 	const NUMBER_SELECTOR = "#title-overview-widget > div.vital > div.title_block > div > div.ratings_wrapper > div.imdbRating > a > span" 
			 	const NumberVotes = document.querySelector(NUMBER_SELECTOR).innerText.trim() /// variable donde se guarda la nota que está en formato texto evitando espacios en blanco
				
			 	var InfoPeli = [MovieTitle, MovieRating, NumberVotes] // introduce en un vector las variables extraidas
			 	return InfoPeli //devuelve el valor que se introducirá en la variable rates

			})
			
			var fecha1=moment(Release,"YYYYMMDD"); // da formato a la fecha de la primera captura
			var fecha2=moment(DataDate,"YYYYMMDD"); // da formato a la fecha que acaba de extraer
			var totaldays=fecha2.diff(fecha1,"days") // calcula los días trascurridos entre ambas fechas

			rates.push(DataDate, totaldays) // añade a los datos extraidos de IMDb la fecha concreta de medida y los días trascurridos desde la primera captura

			InfoTotal.push( // añade los datos de la fecha concreta al vector que recopila todos los datos de fechas anteriores
						rates, 
					)
			console.log(InfoTotal) //imprime todos las datos extraidos hasta la fecha

		} else if (newDesign>20130220) { // si la fecha es posterior a 20/02/2013 los datos se sacan con unos selectores concretos
			await page.goto(Filmlink) 
			await page.waitForSelector("#overview-top > h1 > span.itemprop");
			const rates = await page.evaluate(() => {
				const TITLE_SELECTOR = "#overview-top > h1 > span.itemprop"
				const MovieTitle = document.querySelector(TITLE_SELECTOR).innerText.trim()
				const RATE_SELECTOR = "#overview-top > div.star-box.giga-star > div.star-box-details > strong > span"
				const MovieRating = document.querySelector(RATE_SELECTOR).innerText.trim()
				const NUMBER_SELECTOR = "#overview-top > div.star-box.giga-star > div.star-box-details > a:nth-child(3) > span"
				const NumberVotes = document.querySelector(NUMBER_SELECTOR).innerText.trim()
				
				var InfoPeli = [MovieTitle, MovieRating, NumberVotes]
				return InfoPeli 

			})

			var fecha1=moment(Release,"YYYYMMDD");
			var fecha2=moment(DataDate,"YYYYMMDD");
			var totaldays=fecha2.diff(fecha1,"days")

			rates.push(DataDate, totaldays)
			InfoTotal.push(
						rates, 
					)
			console.log(InfoTotal)

		} else if (newDesign>20110901) { // si la fecha es posterior a 01/09/2011 los datos se sacan con unos selectores concretos
			await page.goto(Filmlink) 
			await page.waitForSelector("#overview-top > h1");
			const rates = await page.evaluate(() => {
				const TITLE_SELECTOR = "#overview-top > h1" 
				const MovieTitle = document.querySelector(TITLE_SELECTOR).innerText.trim()
				const RATE_SELECTOR = "#overview-top > div.star-box.giga-star > div.star-box-details > strong > span" 
				const MovieRating = document.querySelector(RATE_SELECTOR).innerText.trim()
				const NUMBER_SELECTOR = "#overview-top > div.star-box.giga-star > div.star-box-details > a:nth-child(3) > span" 
				const NumberVotes = document.querySelector(NUMBER_SELECTOR).innerText.trim()
				
				var InfoPeli = [MovieTitle, MovieRating, NumberVotes]
				return InfoPeli

			})

			var fecha1=moment(Release,"YYYYMMDD");
			var fecha2=moment(DataDate,"YYYYMMDD");
			var totaldays=fecha2.diff(fecha1,"days")

			rates.push(DataDate, totaldays)
			InfoTotal.push(
						rates, 
					)
			console.log(InfoTotal)

		} else if (newDesign>20101010) { // si la fecha es posterior a 10/10/2010 los datos se sacan con unos selectores concretos
			await page.goto(Filmlink)
			await page.waitForSelector("#overview-top > h1");
			const rates = await page.evaluate(() => {
				const TITLE_SELECTOR = "#overview-top > h1" 
				const MovieTitle = document.querySelector(TITLE_SELECTOR).innerText.trim()
				const RATE_SELECTOR = "span.rating-rating"
				const MovieRating = document.querySelector(RATE_SELECTOR).innerText.trim()
				const NUMBER_SELECTOR = "#overview-top > div.star-box > a:nth-child(3)"
				const NumberVotes = document.querySelector(NUMBER_SELECTOR).innerText.trim()
				
				var Rating = MovieRating.substring(0,3) // saca la nota del selector, que tiene un formato diferente al resto de periodos
				var numVot = NumberVotes.slice(0,-6) // saca el número de votos del selector, que tiene un formato diferente al resto de periodos
				var InfoPeli = [MovieTitle, Rating, numVot]
				return InfoPeli

			})

			var fecha1=moment(Release,"YYYYMMDD");
			var fecha2=moment(DataDate,"YYYYMMDD");
			var totaldays=fecha2.diff(fecha1,"days")

			rates.push(DataDate, totaldays)

			InfoTotal.push(
						rates, 
					)
			console.log(InfoTotal)

		} else { // si la fecha es posterior anterior al 10/10/2010 y posterior al 01/01/2010 los datos se sacan con unos selectores concretos
			await page.goto(Filmlink)
			await page.waitForSelector("#tn15title > h1");
			const rates = await page.evaluate(() => {
				const TITLE_SELECTOR = "#tn15title > h1"
				const MovieTitle = document.querySelector(TITLE_SELECTOR).innerText.trim()
				const RATE_SELECTOR = "#tn15rating > div.general > div > div.starbar-meta > b" 
				const MovieRating = document.querySelector(RATE_SELECTOR).innerText.trim()
				const NUMBER_SELECTOR = "#tn15rating > div.general > div > div.starbar-meta > a" 
				const NumberVotes = document.querySelector(NUMBER_SELECTOR).innerText.trim()
				
				var Rating = MovieRating.substring(0,3)
				var numVot = NumberVotes.slice(0,-6)
				var InfoPeli = [MovieTitle, Rating, numVot]
				return InfoPeli

			})

			var fecha1=moment(Release,"YYYYMMDD");
			var fecha2=moment(DataDate,"YYYYMMDD");
			var totaldays=fecha2.diff(fecha1,"days")

			rates.push(DataDate, totaldays)

			InfoTotal.push(
						rates, 
					)
			console.log(InfoTotal)
		}
		
	} catch (error) { // en caso de que haya errores
		console.log('error') // escribe error
	}
}

void (async () => { // ejecuta el módulo
	var fs = require('fs'); //crea un archivo usando el módulo filesystem
	var linkDates = JSON.parse(fs.readFileSync('alldates.json', 'utf8')); //lee los enlaces del archivo "alldates.json" y 
	var ReleaseDate = JSON.parse(fs.readFileSync('FirstData.json', 'utf8')); // lee la fecha del primer registro del archivo "FirstData.json"
	var FinalFilmData = [] // crea un vector en el que se introducirán todos los datos extraidos
	const browser = await puppeteer.launch({ headless: true, args: ['--deterministic-fetch'] }) // mejora la adquisición de datos para páginas lentas
	const page = await browser. newPage() // crea una pestaña en el navegador
	await page.setJavaScriptEnabled(false); // no esperar a que se cargue JavaScript en la página web
	await page.setRequestInterception(true); //espera a que se cargue antes del siguiente paso
	page.on('request', req => {

	    if(req.url().endsWith('.png') || req.resourceType() == 'image' || req.resourceType() == 'video' || req.resourceType() == 'script')
	      	req.abort(); //evita que se carguen las imagen o los videos
	    else
	      	req.continue();345  
	  });
	await page.setDefaultNavigationTimeout(0); // evita el límite de 30000ms para que se cargue la página
	for (var i=0; i<linkDates.length; i++) { // recorre cada uno de los enlaces que hay en la variable linkDates
		var header = 'https://web.archive.org' // define la parte inicial de la página web
		var completLink = header.concat(linkDates[i].link) //añade el resto del link
		console.log(completLink) // escribe el link del que sacaremos la información
		await ReadRating(completLink, FinalFilmData, ReleaseDate, browser, page) // llama a la función que leerá los datos de la página

	}
	await browser.close() //cierra el navegador
	fs.writeFile( // crea archivo json en la ubicación con el siguiente nombre:
			'./allRates.json',
			JSON.stringify(FinalFilmData, null, 2), // convierte a formato JSON
			(err) => err ? console.error('Data not written', err) : console.log('Data written') // indica si se ha escrito el archivo correctamente o no
	)
})()

