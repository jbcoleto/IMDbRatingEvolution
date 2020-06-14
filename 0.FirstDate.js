//
//
// Read the first date registered in archive.org for a IMDb link
//
// EDIT the IMDb link!!
//
//
//
const puppeteer = require('puppeteer') // cargar en puppeteer

void (async () => { // ejecuta el módulo
	try { // en caso de que no haya errores
		const browser = await puppeteer.launch() // crea un navegador
		const page = await browser. newPage() // crea una pestaña en el navegador

		await page.setDefaultNavigationTimeout(0); //evita el límite de 30000ms para que se cargue la página
		await page.goto('https://web.archive.org/web/*/https://www.imdb.com/title/tt7653254/') // página de la que se va a extraer el valor
		await page.waitForSelector("#react-wayback-search > div.captures-range-info > span > a:nth-child(1)"); // espera a que se cargue el selector que buscamos

		const firstDate = await page.evaluate(() => { // guarda en la variable firstDate el primer dato registrado
			// guarda el valor del selector en la variable YEAR0_SELECTOR:
			const YEAR0_SELECTOR = "#react-wayback-search > div.captures-range-info > span > a:nth-child(1)" 
			const FirstData = document.querySelector(YEAR0_SELECTOR).innerText.trim() // variable donde se guarda la nota que está en formato texto evitando espacios en blanco

			return FirstData //devuelve el valor que se introducirá en la variable firstDate
		})

		var day=firstDate.slice(firstDate.length - 8, firstDate.length-6) //selecciono el día
		var num=parseFloat(day) // dar al día el formato con dos cifras
		if (num<10) {
			day="0"+num
		} else {
			day=num
		}
		const year=firstDate.slice(firstDate.length - 4, firstDate.length) //selecciono el año

		const MonNum=firstDate.slice(0, 3) //selecciona las cuatro primeras letras del mes para realizar la clasificación
		switch (MonNum) { // en función del mes le da formato YYYYMMDD a la variable ReleaseDate
			case 'Jan': var ReleaseDate=year+"01"+day
				break;
			case 'Feb': var ReleaseDate=year+"02"+day
				break;
			case 'Mar': var ReleaseDate=year+"03"+day
				break;
			case 'Apr': var ReleaseDate=year+"04"+day
				break;
			case 'May': var ReleaseDate=year+"05"+day
				break;
			case 'Jun': var ReleaseDate=year+"06"+day
				break;
			case 'Jul': var ReleaseDate=year+"07"+day
				break;
			case 'Aug': var ReleaseDate=year+"08"+day
				break;
			case 'Sep': var ReleaseDate=year+"09"+day
				break;
			case 'Oct': var ReleaseDate=year+"10"+day
				break;
			case 'Nov': var ReleaseDate=year+"11"+day
				break;
			case 'Dec': var ReleaseDate=year+"12"+day
				break;
		}

		console.log(JSON.stringify(ReleaseDate, null, 2)) /// muestra el valor devuelto
		const fs = require('fs') //crea un archivo usando el módulo filesystem
		fs.writeFile( // crea archivo json en la ubicación con el siguiente nombre
			'./FirstData.json',
			JSON.stringify(ReleaseDate, null, 2), // convierte a formato JSON
			(err) => err ? console.error('Data not written', err) : console.log('Data written') // indica si se ha escrito el archivo correctamente o no
		)
		await browser.close() //cierra el navegador
	} catch (error) { // en caso de que haya errores
		console.log('error') // escribe error
	}
})()
