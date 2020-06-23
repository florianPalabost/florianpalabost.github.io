const dotenv = require('dotenv');
const models = require('./models');
const Sequelize = require('sequelize');
// require to call the different operators
// however since v5 it's integrated by default and acces with $, for ex $in, $neq
const Op = Sequelize.Op;
dotenv.config();

// TODO separate functions in differents files : DBanimes, DBgenres, ...
const getAllAnimes = async (req, res) => {
  console.log('access dao : retrieve all animes');
  // async/await with try/catch
  try {
    return await models.anime.findAll({
      attributes: ['id', 'status' ],
      include: [ {
        model: models.genre,
        through: { attributes: [] } // to avoid to take the attributes of animes_genres table
      }, {
        model: models.category,
        through: { attributes: [] }
        }
      ]

    },
    ); 
  } catch (err) {
    console.log('error in db for getAllAnimes() ::::', err.stack);
    return err; 
  }
};

const getAnimesWith = async (batch) => {
  try {
    // console.log('batch : ' + batch);
    return await models.anime.findAll({
          attributes: ['id', 'title', 'status', 'posterImage', 'coverImage', 'subtype'],
          include: [ {
            model: models.genre,
            attributes: ['genre_id','name'],
            through: { attributes: [] } // to avoid to take the attributes of animes_genres table
          }, {
            model: models.category,
            attributes: ['category_id','name'],
            through: { attributes: [] }
          }
          ],
          limit: 10,
          offset: batch
        },
    );
  } catch (err) {
    console.log('error in db for getAllAnimes() ::::', err.stack);
    return err;
  }
};


const getByTitle = async (title) => {
  try {
    return await models.anime.findOne({
      where: {
        title: title
      },
      include: [ {
        model: models.genre,
        through: { attributes: [] } // to avoid to take the attributes of animes_genres table
      }, {
        model: models.category,
        through: { attributes: [] }
      }, {
        model: models.character,
        attributes: ['name','role','description', 'img', 'other_name']
      }
    ]
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getCharacterByTitle = async (name) => {
  try {
    return await models.character.findOne({
      where: {
        name
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAnimesRecommendations = async (idAnime) => {
  try {
    return await models.animes_recommendation.findAll({
      where: {
        anime_id: idAnime
      },
      include: [ {
        model: models.anime
      },
      ]
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getWithUserId = async (userId, status) => {
  try {

    switch (status) {
      case 'completed':
        return await models.animes_completed.findAll({
          attributes: [],
          where: {
            user_id: userId
          },
          include: [{
            model: models.anime,
            include: [
              {
                model: models.genre,
                through: { attributes: [] } // to avoid to take the attributes of animes_genres table
              }, {
                model: models.category,
                through: { attributes: [] }
              }
            ]
          },

          ],
        });
      case 'watching':
        return await models.animes_watching.findAll({
          where: {
            user_id: userId
          },
          include: [ {
            model: models.anime,
          }]
        });
      case 'want_to_watch':
        return await models.anime_want_to_watch.findAll({
          where: {
            user_id: userId
          },
          include: [ {
            model: models.anime,
          }]
        });
      case 'dont_want_to_watch':
        return await models.animes_dont_want_to_watch.findAll({
          where: {
            user_id: userId
          },
          include: [ {
            model: models.anime,
          }]
        });
      case 'rewatched':
        return await models.animes_rewatched.findAll({
          where: {
            user_id: userId
          },
          include: [ {
            model: models.anime,
          }]
        });
    }

  } catch (err) {
    console.log('error in db for getWithUserId() ::::', err.stack);
    return err;
  }
};

const getAnimeUserStat = async (req, status) => {
  try {
    req.userId = req.userId.toString();
    switch (status) {
      case 'completed':
        return await models.animes_completed.findAll({
          where: {
            user_id: req.userId,
            anime_id: req.animeId
          }
        });
      case 'watching':
        return await models.animes_watching.findAll({
          where: {
            user_id: req.userId,
            anime_id: req.animeId
          }
        });
      case 'want_to_watch':
        return await models.anime_want_to_watch.findAll({
          where: {
            user_id: req.userId,
            anime_id: req.animeId
          }
        });
      case 'dont_want_to_watch':
        return await models.animes_dont_want_to_watch.findAll({
          where: {
            user_id: req.userId,
            anime_id: req.animeId
          }
        });
    }

  } catch (err) {
    console.log('error in db for getAnimeUserStat() ::::', err.stack);
    return err;
  }
};

const getWithFilters = async (form, genresAndcategories) => {
  try {
    const genres = genresAndcategories[0];
    const categories = genresAndcategories[1];
    let whereGeneralClause = {};
    let whereGenresClause = {};
    let whereCategoriesClause = {};

    // check if status filter is empty or not to add the where clause in the query
    if (form.status !== "") {
      whereGeneralClause['status'] =  form.status;
    }

    if (Object.keys(genres).length > 0) {
      whereGeneralClause['$genres.animes_genres.genreId$'] = genres;
      whereGenresClause['$genres.animes_genres.genreId$'] = genres;
    }

    if (Object.keys(categories).length > 0) {
      whereGeneralClause['$categories.animes_categories.categoryId$'] = categories;
      whereCategoriesClause['$categories.animes_categories.categoryId$'] = categories;
    }

    console.log('where general clause : ', whereGeneralClause);
    console.log('where genre clause : ', whereGenresClause);
    console.log('where categorie clause : ', whereCategoriesClause);

    return await models.anime.findAll({
      where: whereGeneralClause,
      include: [ {
        model: models.genre,
        where: whereGenresClause,
        attributes: ['genre_id','name'],
        through: {
          attributes: [] } // to avoid to take the attributes of animes_genres table
      },
        {
        model: models.category,
        where: whereCategoriesClause,
        attributes: ['category_id','name'],
        through: { attributes: [] }
      }
      ]
    });

  } catch (error) {
    console.log(error);
    return error;
  }
};

const getLikeByTitle = async (title) => {
  try {
    console.log('db title : ', title);
    return await models.anime.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: '%' + title + '%'
        }
      },
      attributes: ['id', 'title', 'status', 'posterImage', 'coverImage', 'subtype'],
      limit: 10
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getLikeByTitleAll = async (title) => {
  try {
    console.log('db title : ', title);
    return await models.anime.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: '%' + title + '%'
        }
      },
      attributes: ['id', 'title', 'status', 'posterImage', 'coverImage', 'subtype'],
      // limit: 10
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getByID = async (id) => {
  try {
    return await models.anime.findOne({
      include: [
        {
          model: models.animes_genre, as: 'genre'
        }
      ],
      where: {
        id: id
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAnimesRewatchTimes = async (req) => {
  try {
    req.idUser = req.idUser.toString();
    return await models.animes_rewatched.findOne({
      where: {
        anime_id: parseInt(req.idAnime),
        user_id: req.idUser
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createAnime = async (req, res) => {
  console.log('access dao : create new anime');
  try {
    const newAnime =  {
      title: req.title,
      synopsis: req.synopsis,
      rating: req.rating,
      startDate: req.startDate,
      endDate: req.endDate,
      status: req.status,
      posterImage: req.posterImage,
      coverImage: req.coverImage,
      nbEpisode: req.nbEpisode,
      episodeLength: req.episodeLength,
      ytVideoID: req.ytVideoID
    };
    // maybe use findOrCreate() 
    return await models.anime.create(newAnime);
  }
  catch(error) {
    // maybe an error about the creation of this item 
    // either the object is not well implement or either bug somewhere else
    console.log(error);
    return error;
  }  
};

const createAnimeRewatch = async (req, res) => {
  console.log('access dao : create new anime rewatched');
  try {
    const newAnimeRewatched = {
      user_id: req.idUser,
      anime_id: req.idAnime
    };
    return await models.animes_rewatched.create(newAnimeRewatched);
  }
  catch(error) {
    // maybe an error about the creation of this item
    // either the object is not well implement or either bug somewhere else
    console.log(error);
    return error;
  }
};

const updateAnime = async (req) => {
  try {
    // first get & check the anime to update if exist
    let anime = await getByID(req.id);
  
    if(anime !== null) {
      return await models.anime.update(req, {
        where: {
          id: req.id
        }
      });
    } 
    throw new Error(`anime not found with id: ${req.id}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateAnimeRewatch = async (req) => {
  try {
      return await models.animes_rewatched.increment('times_rewatched', {
        by: 1,
        where: {
          user_id: req.idUser,
          anime_id: req.idAnime
        }
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateAnimeUserStats = async (req, res) => {
  console.log('access dao : create new entry anime user stats DB::::', req);
  try {
    const newEntryUserAnime =  {
      user_id: req.userId,
      anime_id: req.animeId
    };

    switch (req.status_watch) {
      case "completed":
        return await models.animes_completed.create(newEntryUserAnime);
      case "watching":
        return await models.animes_watching.create(newEntryUserAnime);
      case "want-to-watch":
        return await models.anime_want_to_watch.create(newEntryUserAnime);
      case "dont-watch":
        return await models.animes_dont_want_to_watch.create(newEntryUserAnime);
      default:
          return null;
    }
  }
  catch(error) {
    // maybe an error about the creation of this item
    // either the object is not well implement or either bug somewhere else
    console.log(error);
    return error;
  }
};

const deleteAnime = async (idAnime) => {
  try {
    // check if anime exist
    let anime = await getByID(idAnime);
    console.log(anime);
    if(anime !== null) {
      return await models.anime.destroy({
        where: {
          id: idAnime
        }
      });   
    }
    throw new Error(`anime not found with id: ${idAnime}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};


const getNbCharacters = async (id) => {
  try {
    return await models.character.count({distinct:true, col: 'character_id'});
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllCategories = async (req, res) => {
  console.log('access dao : retrieve all categories');
  // async/await with try/catch
  try {
    return await models.category.findAll({
          attributes: ['category_id','name'],
        },
    );
  } catch (err) {
    console.log('error in db for getAllCategories() ::::', err.stack);
    return err;
  }
};


const getAllGenres = async (req, res) => {
  console.log('access dao : retrieve all genres');
  // async/await with try/catch
  try {
    return await models.genre.findAll({
          attributes: ['genre_id','name'],
        },
    );
  } catch (err) {
    console.log('error in db for getAllGenres() ::::', err.stack);
    return err;
  }
};
module.exports = {
  getAllAnimes,
  getAnimesWith,
  getByTitle,
  getAnimesRecommendations,
  getWithFilters,
  getAnimesRewatchTimes,
  getWithUserId,
  getLikeByTitle,
  getLikeByTitleAll,
  getByID,
  getAnimeUserStat,
  createAnime,
  createAnimeRewatch,
  updateAnime,
  updateAnimeUserStats,
  updateAnimeRewatch,
  deleteAnime,
  getNbCharacters,
  getCharacterByTitle,
  getAllCategories,
  getAllGenres,
};
