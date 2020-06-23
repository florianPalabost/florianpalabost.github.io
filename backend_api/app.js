const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const cors = require('cors');
const animes = require('./routes/animes');
const characters = require('./routes/characters');
const genres = require('./routes/genres');
const categories = require('./routes/categories');
const cron = require('node-cron');
const pg = require('pg');
const dotenv = require('dotenv');
const request = require('request');
const models = require('./models/');

dotenv.config();
const Pool = pg.Pool;
const pool = new Pool({
	user: process.env.POSTGRES_USER || 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	database: process.env.POSTGRES_DB || 'animes_api',
	password: process.env.POSTGRES_PWD,
	port: process.env.POSTGRES_PORT || '5432',
});


let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

const API_VERSION = 'v1';

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set the routes here 
app.use('/api/' + API_VERSION + '/animes', animes);
app.use('/api/'+ API_VERSION +'/characters', characters);
app.use('/api/'+ API_VERSION +'/genres', genres);
app.use('/api/'+ API_VERSION +'/categories', categories);

let nbInsert = 0;
// set the cron animes, a la fin le lancer une fois par semaine
cron.schedule("* 10 18 * *", async () =>  {
	console.log("[CRON : Import animes] Job started every 10 min");

	// import anime
	// data.meta.count -> contient le nb total d'animes to proceed
	let nbLignes = 15049;

	let start = 0;
	let length = 20;
	const linkApi = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=';
	let link;

	// set all the link to scratch infos
	 while (start < nbLignes) {
		link = linkApi + start;
		// call url to have the 20 animes to proceed
		await request(link, async (err, resp, body) => {
			// on recup un string donc il faut le parse en json pour mieux l'utiliser
			body = JSON.parse(body);

			if (body.meta.count !== "" && nbLignes < body.meta.count) {
				nbLignes = body.meta.count;
			}

			for(let i = 0; i< Object.keys(body.data).length; i++) {
				// console.log('---------Process::', body.data[i].attributes.canonicalTitle);

				let anime = await models.anime.findOne({
					where: {
						title: body.data[i].attributes.canonicalTitle
					}
				});

				if (anime != null) {
					// anime already exist

					// Update the anime subtype : TV, ova, film, ...
					if (body.data[i].attributes.subtype !== null && body.data[i].attributes.subtype !== "") {
						// console.log('update subtype ', body.data[i].attributes.subtype);
						await models.anime.update(
							{
								subtype: body.data[i].attributes.subtype
							},
							{
								where: {
									title: body.data[i].attributes.canonicalTitle
								}
							}
						);

					}

				}
				else {
					console.log(':::::Create one anime::::::');

					let newAnime = {
						title: body.data[i].attributes.canonicalTitle,
					};

					let fields = {
						idApi: body.data[i].id ,
						linkApi: body.data[i].links.self !== 'undefined' ? body.data[i].links.self : null,
						synopsis: body.data[i].attributes.synopsis !== 'undefined' ? body.data[i].attributes.synopsis : null,
						subtype: body.data[i].attributes.subtype !== 'undefined' ? body.data[i].attributes.subtype : null,
						rating: body.data[i].attributes.averageRating !== 'undefined' && body.data[i].attributes.averageRating != null ? parseInt(body.data[i].attributes.averageRating) : null,
						startDate: body.data[i].attributes.startDate !== 'undefined' ? body.data[i].attributes.startDate : null,
						endDate: body.data[i].attributes.endDate !== 'undefined' ? body.data[i].attributes.endDate : null,
						status: body.data[i].attributes.status !== 'undefined' ? body.data[i].attributes.status : null,
						nbEpisode: body.data[i].attributes.episodeCount !== 'undefined' ? body.data[i].attributes.episodeCount : null,
						episodeLength: body.data[i].attributes.episodeLength !== 'undefined' ? body.data[i].attributes.episodeLength : null,
						ytVideoID: body.data[i].attributes.youtubeVideoId !== 'undefined' ? body.data[i].attributes.youtubeVideoId : null
					};

					for (let key in fields) {
						if(!checkIfEmpty(fields[key])) {
							newAnime[key] = fields[key];
						}
					}

					if(!checkIfEmpty(body.data[i].attributes.posterImage)) {
						newAnime.posterImage = body.data[i].attributes.posterImage.original;
					}
					if(!checkIfEmpty(body.data[i].attributes.coverImage)) {
						newAnime.coverImage = body.data[i].attributes.coverImage.original;
					}

					await models.anime.create(newAnime);
					nbInsert++;
				}

			}
		});

		start += length;
	}

	console.log(`Nombre d'insert : ${nbInsert}`);
});


// characters
cron.schedule("* 10 18 * *", async () => {
	console.log('::::::::::::::::::::::::::::::::::CHARACTERSs:::::::::::::::::::::::::::::::::::::::::::::::::::::::');
	let animes = await models.anime.findAll();

	// list of all animes
	for(let i=0; i < animes.length; i++) {
		console.log(':::::::::ANIME '+i+' / '+animes.length + ' ::::::::::::::::::');
		if (animes[i].linkApi !== "" && animes[i].linkApi !== null && animes[i].linkApi !== undefined) {

			await sleep(100);
			request(animes[i].linkApi + '/characters', async (err, resp, body) => {
				if(err)
					console.log('err load /characters : ', err);
				if(body !== undefined) {
					body = JSON.parse(body);
					if(Object.keys(body.data).length > 0) {
						// list of all the characters
						for(let j=0; j < Object.keys(body.data).length; j++) {
							// request  for info about the character
							if (body.data[j].relationships.character.links.related !== "" &&
								body.data[j].relationships.character.links.related !== null &&
								body.data[j].relationships.character.links.related !== undefined) {
								request(body.data[j].relationships.character.links.related, async (errC, resp, persoInfos) => {
									if(errC)
										console.log('err load character : ', errC);
									persoInfos = JSON.parse(persoInfos);

									// todo add condition on animeId on character where to find if character already exist for this anime
									let perso = await models.character.findOne({
										where: {
											name: persoInfos.data.attributes.canonicalName
										}
									});
									if (perso !== null) {
										// perso already exist -> update
										// let isUpdated = await models.character.upsert(perso);
										// if(isUpdated)
										//   console.log('animes_characters updated');
										// else
										//   console.log('animes_characters not updated');
										// console.log('perso already exist');

										// TODO just add character to animes
										let persoOtherAnime = {
											character_id: perso.character_id,
											name: perso.name,
											description: perso.description,
											role: perso.role,
											img: perso.img,
											other_name: perso.other_name
										};

										if(animes[i].id) {
											persoOtherAnime.animeId = animes[i].id;
											await models.character.create(persoOtherAnime);
											console.log('perso added to another anime');
										}
										else {
											throw new Error(`no anime id with perso ${persoOtherAnime.name}`);
										}

									}
									else {
										// perso dont exist -> create
										let newPerso = {
											name: persoInfos.data.attributes.canonicalName,
											animeId: animes[i].id
										};
										if(!checkIfEmpty(persoInfos.data.attributes.description)) {
											newPerso.description = persoInfos.data.attributes.description;
										}
										if(!checkIfEmpty(body.data[j].attributes.role)) {
											newPerso.role = body.data[j].attributes.role;
										}
										if(!checkIfEmpty(persoInfos.data.attributes.image) &&
											!checkIfEmpty(persoInfos.data.attributes.image.original) ) {
											newPerso.img = persoInfos.data.attributes.image.original;
										}
										if(!checkIfEmpty(persoInfos.data.attributes.otherNames) &&
											persoInfos.data.attributes.otherNames.length > 0) {
											newPerso.other_name = persoInfos.data.attributes.otherNames.join();
										}

										await models.character.create(newPerso);
										console.log('perso created');

									}
								});
							}

						}
					}
					else {
						console.log('pas de characters pour :',animes[i].linkApi + '/characters' );
					}
				}
				else {
					console.log('json empty for : ' + animes[i].linkApi + '/characters');
				}
			});
		}

	}

});

/**
 *
 * @param field
 * @returns {boolean}
 */
const checkIfEmpty = (field) => {
	if(field === undefined)
		return true;
	else if(field === null)
		return true;
	return false;
};

/**
 * method for fix timeout request to api
 * @param millis
 * @returns {Promise<unknown>}
 */
function sleep(millis) {
	return new Promise(resolve => setTimeout(resolve, millis));
}


module.exports = app;
