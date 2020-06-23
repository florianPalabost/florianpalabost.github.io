const db = require('../../db');

const addOrUpdateAnimeRewatched = async (req, res) => {
  const animeRewatch = await db.getAnimesRewatchTimes(req);
  if(animeRewatch) {
    // already exist so we need to incremente watch time
    return await db.updateAnimeRewatch(req);
  }
  else {
    // not exist -> we create a new anime-rewatch with value 1;
    return await db.createAnimeRewatch(req);
  }

};


module.exports = {
  addOrUpdateAnimeRewatched
};
