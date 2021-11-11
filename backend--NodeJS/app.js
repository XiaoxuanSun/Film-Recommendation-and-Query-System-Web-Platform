const {
  response
} = require('express');
const express = require('express');
const http = require('http');
const fetch = require('node-fetch');
const { parse_current } = require('./utils');
const { parse_movie } = require('./utils');
const { search_result } = require('./utils');
const { parse_tv } = require('./utils');
const { moive_detail } = require('./utils');
const { moive_cast } = require('./utils');
const { moive_review } = require('./utils');
const { moive_video } = require('./utils');
const { tv_detail } = require('./utils');
const { cast_detail } = require('./utils');
const { cast_externalID } = require('./utils');

const app = express();

/* home of NodeJS */
app.get('/', (req, res) => {
  res.send('Please try some routes like "/multi_search/game"' +
    '   ' + '"/trending_movie"' +
    '   ' + '"/top_movie"' +
    '   ' + '"/current_playing"' +
    '   ' + '"/popular_movie"' +
    '   ' + '"/trending_tv"' +
    '   ' + '"/top_tv"' +
    '   ' + '"/popular_tv"'
  )
});

/* 4.1.1 Multi-Search Endpoint 7 */
app.get('/multi_search/:query', function (request, response) {
  console.log("/api/multi_search");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/search/multi?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&query=' + request.params.query, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
      response.send(search_result(result));
      // response.send(result);
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });

  // response.send([{"id":1399,"title":"Game of Thrones","backdrop_path":"https://image.tmdb.org/t/p/w500/suopoADq0k8YZr4dQXcU6pToj6s.jpg","media_type":"tv"},{"id":751394,"title":"The 100 Candles Game","backdrop_path":"https://image.tmdb.org/t/p/w500/1MJC1iOVPnmikmTTeE7EX3nDM5Z.jpg","media_type":"movie"},{"id":396371,"title":"Molly's Game","backdrop_path":"https://image.tmdb.org/t/p/w500/yvbXGWjg30sj7rohEZvSe90jSJC.jpg","media_type":"movie"},{"id":80274,"title":"Ender's Game","backdrop_path":"https://image.tmdb.org/t/p/w500/qGqlWb5izTPtFngBWdbJAEmninR.jpg","media_type":"movie"},{"id":343674,"title":"Gerald's Game","backdrop_path":"https://image.tmdb.org/t/p/w500/t9HChjSJi8B1PXSVh5Ec3pcDsAM.jpg","media_type":"movie"},{"id":12279,"title":"Spy Kids 3-D: Game Over","backdrop_path":"https://image.tmdb.org/t/p/w500/bmuTrxbPcr1nKCsV5YWWJi73PGR.jpg","media_type":"movie"},{"id":205596,"title":"The Imitation Game","backdrop_path":"https://image.tmdb.org/t/p/w500/sixfWYfNegaGGHKdXrNNUHaMiAC.jpg","media_type":"movie"},{"id":445571,"title":"Game Night","backdrop_path":"https://image.tmdb.org/t/p/w500/4hU1pC7MGQ7wU9ldkRJYNHK3vgb.jpg","media_type":"movie"},{"id":1535,"title":"Spy Game","backdrop_path":"https://image.tmdb.org/t/p/w500/nHnWAi55tEo822jVGwp50b3CH4D.jpg","media_type":"movie"},{"id":524708,"title":"Blindsided: The Game","backdrop_path":"https://image.tmdb.org/t/p/w500/ws50vG27TqpYhHDDVz9aOFNYCVw.jpg","media_type":"movie"},{"id":2649,"title":"The Game","backdrop_path":"https://image.tmdb.org/t/p/w500/b2s8QpoY5J0sGHYBF7GrhNfQi6K.jpg","media_type":"movie"},{"id":13680,"title":"The Game Plan","backdrop_path":"https://image.tmdb.org/t/p/w500/qCKO6xQMLgB1goL1v20tMOfMLBU.jpg","media_type":"movie"},{"id":13253,"title":"Futurama: Bender's Game","backdrop_path":"https://image.tmdb.org/t/p/w500/fBWaHdUhTIOLYPOcPLeTJiRacpn.jpg","media_type":"movie"},{"id":38363,"title":"Fair Game","backdrop_path":"https://image.tmdb.org/t/p/w500/5JtGSa0tVNXR6NcM5XUhYBo3bvE.jpg","media_type":"movie"},{"id":230179,"title":"Big Game","backdrop_path":"https://image.tmdb.org/t/p/w500/zOs0wSYHOQAbWslZFmQtLexoFl5.jpg","media_type":"movie"},{"id":456750,"title":"Game Over, Man!","backdrop_path":"https://image.tmdb.org/t/p/w500/hcRC8v4K26tDEXscJdVh82tdwzD.jpg","media_type":"movie"},{"id":434757,"title":"Barbie Video Game Hero","backdrop_path":"https://image.tmdb.org/t/p/w500/oLND0AXIOT1sORjQwt0MIVX1p7b.jpg","media_type":"movie"},{"id":10955,"title":"Ripley's Game","backdrop_path":"https://image.tmdb.org/t/p/w500/pipOIp5U2dPEaZzcTZzu1uS9BFl.jpg","media_type":"movie"},{"id":13929,"title":"Geri's Game","backdrop_path":"https://image.tmdb.org/t/p/w500/xvH1zFy9MGyB6ZLNpTevW9Xn72k.jpg","media_type":"movie"},{"id":428707,"title":"Kuroko's Basketball the Movie: Last Game","backdrop_path":"https://image.tmdb.org/t/p/w500/h6dJsYSm8x06bRxkF01sknpD9Iu.jpg","media_type":"movie"}])
});

/* 4.1.2 Trending Movies Endpoint */
app.get('/trending_movie', function (request, response) {
  console.log("/api/trending_movie");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=2aadd0e211a8542c57ce7842dcaa5062', {
    method : 'GET',
  })
  .then(response => response.json())
  .then(result => {
    response.send(parse_movie(result));
    console.log('Success');
  })
  .catch(error => {
    response.send(error);
    console.error('Error', error);
  });
});

/* 4.1.3 Top-Rated Movies Endpoint */
app.get('/top_movie', function (request, response) {
  console.log("/api/top_movie");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
      response.send(parse_movie(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });
});

/* 4.1.4 Current playing Moives Endpoint -- biggest Carousel 5 */
app.get('/current_playing', function (request, response) {
  console.log("/api/current_playing");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method : 'GET',
  })
  .then(response => response.json())
  .then(result => {
    response.send(parse_current(result));
    console.log('Success');
  })
  .catch(error => {
    response.send(error);
    console.error('Error', error);
  });

  // response.send([{"id":399566,"title":"Godzilla vs. Kong","backdrop_path":"https://image.tmdb.org/t/p/w1280/iopYFB1b6Bh7FWZh3onQhph1sih.jpg","poster_path":"https://image.tmdb.org/t/p/w500/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg"},
  // {"id":527774,"title":"Raya and the Last Dragon","backdrop_path":"https://image.tmdb.org/t/p/w1280/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg","poster_path":"https://image.tmdb.org/t/p/w500/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg"},
  // {"id":458576,"title":"Monster Hunter","backdrop_path":"https://image.tmdb.org/t/p/w1280/z8TvnEVRenMSTemxYZwLGqFofgF.jpg","poster_path":"https://image.tmdb.org/t/p/w500/1UCOF11QCw8kcqvce8LKOO6pimh.jpg"},
  // {"id":587807,"title":"Tom & Jerry","backdrop_path":"https://image.tmdb.org/t/p/w1280/fev8UFNFFYsD5q7AcYS8LyTzqwl.jpg","poster_path":"https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg"},
  // {"id":464052,"title":"Wonder Woman 1984","backdrop_path":"https://image.tmdb.org/t/p/w1280/egg7KFi18TSQc1s24RMmR9i2zO6.jpg","poster_path":"https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"}])

});

/* 4.1.5 Popular Movies Endpoint */
app.get('/popular_movie', function (request, response) {
  console.log("/api/popular_movie");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
      response.send(parse_movie(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });
});

/* 4.1.6 Recommended Movies Endpoint */
app.get('/recommend_movie/:id', function (request, response) {
  console.log("/api/recommend_movie");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '/recommendations?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
  })
    .then(response => response.json())
    .then(result => {
      response.send(parse_movie(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });

  // if(request.params.id == '577922'){
  //   response.send([{"id":546554,"title":"Knives Out","poster_path":"https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg"},{"id":530915,"title":"1917","poster_path":"https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg"},{"id":522627,"title":"The Gentlemen","poster_path":"https://image.tmdb.org/t/p/w500/jtrhTYB7xSrJxR1vusu99nvnZ1g.jpg"},{"id":466272,"title":"Once Upon a Time… in Hollywood","poster_path":"https://image.tmdb.org/t/p/w500/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg"},{"id":515001,"title":"Jojo Rabbit","poster_path":"https://image.tmdb.org/t/p/w500/7GsM4mtM0worCtIVeiQt28HieeN.jpg"},{"id":496243,"title":"Parasite","poster_path":"https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"},{"id":398978,"title":"The Irishman","poster_path":"https://image.tmdb.org/t/p/w500/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg"},{"id":181812,"title":"Star Wars: The Rise of Skywalker","poster_path":"https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg"},{"id":359724,"title":"Ford v Ferrari","poster_path":"https://image.tmdb.org/t/p/w500/dR1Ju50iudrOh3YgfwkAU1g2HZe.jpg"},{"id":473033,"title":"Uncut Gems","poster_path":"https://image.tmdb.org/t/p/w500/sg0xxJeb3u1C4kAxhSuTwTNpEDt.jpg"},{"id":556984,"title":"The Trial of the Chicago 7","poster_path":"https://image.tmdb.org/t/p/w500/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg"},{"id":492188,"title":"Marriage Story","poster_path":"https://image.tmdb.org/t/p/w500/pZekG6xabTmZxjmYw10wN84Hp8d.jpg"},{"id":503919,"title":"The Lighthouse","poster_path":"https://image.tmdb.org/t/p/w500/3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"id":419704,"title":"Ad Astra","poster_path":"https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"},{"id":740985,"title":"Borat Subsequent Moviefilm","poster_path":"https://image.tmdb.org/t/p/w500/kwh9dYvZLn7yJ9nfU5sPj2h9O7l.jpg"},{"id":340102,"title":"The New Mutants","poster_path":"https://image.tmdb.org/t/p/w500/xZNw9xxtwbEf25NYoz52KdbXHPM.jpg"},{"id":587792,"title":"Palm Springs","poster_path":"https://image.tmdb.org/t/p/w500/yf5IuMW6GHghu39kxA0oFx7Bxmj.jpg"},{"id":499932,"title":"The Devil All the Time","poster_path":"https://image.tmdb.org/t/p/w500/bVL7LGq528h3KzeNI90HOVbV5uW.jpg"},{"id":508442,"title":"Soul","poster_path":"https://image.tmdb.org/t/p/w500/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg"},{"id":292011,"title":"Richard Jewell","poster_path":"https://image.tmdb.org/t/p/w500/5Lgkm8jt4roAFPZQ52fKMhVmDaZ.jpg"}]); 
  // }else {
  //   response.send([{"id":577922,"title":"Tenet","poster_path":"https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg"},{"id":320288,"title":"Dark Phoenix","poster_path":"https://image.tmdb.org/t/p/w500/kZv92eTc0Gg3mKxqjjDAM73z9cy.jpg"},{"id":605116,"title":"Project Power","poster_path":"https://image.tmdb.org/t/p/w500/TnOeov4w0sTtV2gqICqIxVi74V.jpg"},{"id":524047,"title":"Greenland","poster_path":"https://image.tmdb.org/t/p/w500/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg"},{"id":551804,"title":"Freaky","poster_path":"https://image.tmdb.org/t/p/w500/8xC6QSyxrpm0D5A6iyHNemEWBVe.jpg"},{"id":456740,"title":"Hellboy","poster_path":"https://image.tmdb.org/t/p/w500/bk8LyaMqUtaQ9hUShuvFznQYQKR.jpg"},{"id":547016,"title":"The Old Guard","poster_path":"https://image.tmdb.org/t/p/w500/cjr4NWURcVN3gW5FlHeabgBHLrY.jpg"},{"id":443791,"title":"Underwater","poster_path":"https://image.tmdb.org/t/p/w500/gzlbb3yeVISpQ3REd3Ga1scWGTU.jpg"},{"id":590223,"title":"Love and Monsters","poster_path":"https://image.tmdb.org/t/p/w500/r4Lm1XKP0VsTgHX4LG4syAwYA2I.jpg"},{"id":464052,"title":"Wonder Woman 1984","poster_path":"https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"},{"id":625568,"title":"Unhinged","poster_path":"https://image.tmdb.org/t/p/w500/6JGjweoW3yzCV1VpZX1ATR6m1j0.jpg"},{"id":338967,"title":"Zombieland: Double Tap","poster_path":"https://image.tmdb.org/t/p/w500/dtRbVsUb5O12WWO54SRpiMtHKC0.jpg"},{"id":531309,"title":"Brightburn","poster_path":"https://image.tmdb.org/t/p/w500/sJWwkYc9ajwnPRSkqj8Aue5JbKz.jpg"},{"id":570670,"title":"The Invisible Man","poster_path":"https://image.tmdb.org/t/p/w500/5EufsDwXdY2CVttYOk2WtYhgKpa.jpg"},{"id":501170,"title":"Doctor Sleep","poster_path":"https://image.tmdb.org/t/p/w500/p69QzIBbN06aTYqRRiCOY1emNBh.jpg"},{"id":373571,"title":"Godzilla: King of the Monsters","poster_path":"https://image.tmdb.org/t/p/w500/mzOHg7Q5q9yUmY0b9Esu8Qe6Nnm.jpg"},{"id":501979,"title":"Bill & Ted Face the Music","poster_path":"https://image.tmdb.org/t/p/w500/4V2nTPfeB59TcqJcUfQ9ziTi7VN.jpg"},{"id":514847,"title":"The Hunt","poster_path":"https://image.tmdb.org/t/p/w500/fHCMPd1w8wcJmrplR3ebCl6nfFI.jpg"},{"id":457335,"title":"Guns Akimbo","poster_path":"https://image.tmdb.org/t/p/w500/vV23MzddmlZJ6TIXpmRUyGV9961.jpg"},{"id":479455,"title":"Men in Black: International","poster_path":"https://image.tmdb.org/t/p/w500/dPrUPFcgLfNbmDL8V69vcrTyEfb.jpg"}])
  // }

});

/* 4.1.7 Similar Movies Endpoint */
app.get('/similar_movie/:id', function (request, response) {
  console.log("/api/similar_movie");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '/similar?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
  })
    .then(response => response.json())
    .then(result => {
      response.send(parse_movie(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });
});

/* 4.1.8 Movies Video Endpoint */


/* 4.1.9 Movie Details Endpoint */


/* 4.1.10 Movie Reviews Endpoint 10 */


/* 4.1.11 Movie Casts Endpoint */


/* 4.1.12 Trending TV Shows Endpoint */
app.get('/trending_tv', function (request, response) {
  console.log("/api/trending_tv");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=2aadd0e211a8542c57ce7842dcaa5062', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
      response.send(parse_tv(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });
});

/* 4.1.13 Top-Rated TV shows Endpoint */
app.get('/top_tv', function (request, response) {
  console.log("/api/top_tv");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
      response.send(parse_tv(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });
});

/* 4.1.14 Popular TV shows Endpoint */
app.get('/popular_tv', function (request, response) {
  console.log("/api/popular_tv");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/tv/popular?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
      response.send(parse_tv(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });
});

// movie detail
app.get('/movie_detail/:id', async function (request, response) {
  console.log("/api/movie_detail");
  response.header("Access-Control-Allow-Origin", "*");
  const res1 = await fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
    });
  const res2 = await fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '/credits?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method: 'GET',
  });
  const res3 = await fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '/reviews?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method: 'GET',
  }); 
  // const res4 = await fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '/recommendations?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
  //   method: 'GET',
  // });
  // const res5 = await fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '/similar?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
  //   method: 'GET',
  // });
  const res6 = await fetch('https://api.themoviedb.org/3/movie/' + request.params.id + '/videos?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method: 'GET',
  });
    // .then(response => response.json())
    // .then(result => {
    //   response.send(moive_detail(result));
    //   // response.send(result);
    //   console.log('Success');
    // })
    // .catch(error => {
    //   response.send(error);
    //   console.error('Error', error);
    // });

    var list = {};
    const result1 = await res1.json();
    const result2 = await res2.json();
    const result3 = await res3.json();
    // const result4 = await res4.json();
    // const result5 = await res5.json();
    const result6 = await res6.json();
    list.movieDetial = moive_detail(result1);
    // list.movieDetial = result1;
    list.movieCast = moive_cast(result2);
    list.movieReview = moive_review(result3);
    // list.recomMovie = parse_movie(result4);
    // list.similMoive = parse_movie(result5);
    list.movieVideo = moive_video(result6);
    response.send(list);

    // response.send({"movieDetial":[{"title":"Wonder Woman 1984","genres":[{"id":14,"name":"Fantasy"},{"id":28,"name":"Action"},{"id":12,"name":"Adventure"}],"spoken_languages":"English","release_date":"2020-12-16","runtime":"2hrs 31mins","overview":"A botched store robbery places Wonder Woman in a global battle against a powerful and mysterious ancient force that puts her powers in jeopardy.","vote_average":6.8,"tagline":"A new era of wonder begins."}],"movieCast":[{"id":90633,"name":"Gal Gadot","character":"Diana Prince / Wonder Woman","profile_path":"https://image.tmdb.org/t/p/w500//fysvehTvU6bE3JgxaOTRfvQJzJ4.jpg"},{"id":62064,"name":"Chris Pine","character":"Steve Trevor","profile_path":"https://image.tmdb.org/t/p/w500//ipG3BMO8Ckv9xVeEY27lzq975Qm.jpg"},{"id":41091,"name":"Kristen Wiig","character":"Barbara Minerva / Cheetah","profile_path":"https://image.tmdb.org/t/p/w500//nwj7ibxkzYOYgcyGHCKV2qNwgxX.jpg"},{"id":1253360,"name":"Pedro Pascal","character":"Maxwell Lord","profile_path":"https://image.tmdb.org/t/p/w500//wROJBhRvazeFl1SIWfzwMcKrYYn.jpg"},{"id":32,"name":"Robin Wright","character":"Antiope","profile_path":"https://image.tmdb.org/t/p/w500//lj5o0pvHfWCEaPX3rzeGQkfIQzj.jpg"},{"id":935,"name":"Connie Nielsen","character":"Hippolyta","profile_path":"https://image.tmdb.org/t/p/w500//gSQ3O3PJ6ly6nT63joOtfZyscFP.jpg"},{"id":1829985,"name":"Lilly Aspell","character":"Young Diana","profile_path":"https://image.tmdb.org/t/p/w500//phfygRDYezltJge7s7UD4M6IMdI.jpg"},{"id":2960,"name":"Amr Waked","character":"Emir Said Bin Abydos","profile_path":"https://image.tmdb.org/t/p/w500//5rMQibz1vTvs8nfNQOvd4gpQvCX.jpg"},{"id":159386,"name":"Kristoffer Polaha","character":"Handsome Man","profile_path":"https://image.tmdb.org/t/p/w500//m4bwq7WE2lESK16QskibtrHnpQW.jpg"},{"id":1546282,"name":"Natasha Rothwell","character":"Carol (Co-Worker)","profile_path":"https://image.tmdb.org/t/p/w500//x5KdL3QoS4YuozVpfuPsu3MLwwf.jpg"},{"id":206485,"name":"Ravi Patel","character":"Babajide","profile_path":"https://image.tmdb.org/t/p/w500//94GutLAPx72fqxe6XUQ3HWxANxz.jpg"},{"id":24627,"name":"Oliver Cotton","character":"Simon Stagg","profile_path":"https://image.tmdb.org/t/p/w500//2I2W2hpNPRWpidKyRDGJ3p0hSRc.jpg"},{"id":2378424,"name":"Lucian Perez","character":"Alistair","profile_path":"https://image.tmdb.org/t/p/w500//unL7YfltCNcqYwMsUZTYxIlrCzS.jpg"},{"id":1014932,"name":"Gabriella Wilde","character":"Raquel","profile_path":"https://image.tmdb.org/t/p/w500//4ElIAtrcM1kY1ieWgH9T3dUUBA6.jpg"},{"id":51997,"name":"Kelvin Yu","character":"Jake","profile_path":"https://image.tmdb.org/t/p/w500//4hUTgkQCYIO2qEwUyqCscmXAriv.jpg"},{"id":96895,"name":"Stuart Milligan","character":"POTUS","profile_path":"https://image.tmdb.org/t/p/w500//gFZCxMayTR1xdS2m16QNbecY3I4.jpg"},{"id":1057877,"name":"Shane Attwooll","character":"Dangerous Drunk","profile_path":"https://image.tmdb.org/t/p/w500//xy1NWn88m18cwkLD11KqiiFql2Y.jpg"},{"id":2910101,"name":"David Al-Fahmi","character":"Mr. Khalaji","profile_path":"https://image.tmdb.org/t/p/w500//uq14uZsoapa3swGrApCZajHJrPR.jpg"},{"id":2910103,"name":"Kevin Wallace","character":"Televangelist","profile_path":"https://image.tmdb.org/t/p/w500//iKwN1wH5xm0Bz5QqoZ1X4u56AUg.jpg"},{"id":1599260,"name":"Wai Wong","character":"Lai Zhong","profile_path":"https://image.tmdb.org/t/p/w500//aZBRrj6vEcQt10Kc9vYrEZZ4eYm.jpg"},{"id":1009999,"name":"Doutzen Kroes","character":"Venelia","profile_path":"https://image.tmdb.org/t/p/w500//dAY10YAk55UeBzaxzMtru6Xkn59.jpg"},{"id":1831282,"name":"Hari James","character":"Herald (Trigona)","profile_path":"https://image.tmdb.org/t/p/w500//wYqYMPc4A9yn05jP9bDwpwma7yD.jpg"},{"id":1890510,"name":"Betty Adewole","character":"Amazon","profile_path":"https://image.tmdb.org/t/p/w500//ncvgnSmpJ0IhtcuaKp2WtkZF9lh.jpg"},{"id":1726321,"name":"Camilla Roholm","character":"Amazon","profile_path":"https://image.tmdb.org/t/p/w500//feaxjgK6F8egTGwlmrZHvN9TftR.jpg"},{"id":996220,"name":"Jessie Graff","character":"Competitor","profile_path":"https://image.tmdb.org/t/p/w500//ePoVxfGq9LUj8RJ9FfmViNFqcBB.jpg"},{"id":2205383,"name":"Bronte Lavine","character":"Competitor","profile_path":"https://image.tmdb.org/t/p/w500//eUgAOw9MsylIH9Ryf6pqBDUE2fb.jpg"},{"id":2824369,"name":"Briony Scarlett","character":"Competitor","profile_path":"https://image.tmdb.org/t/p/w500//c9oyAOnbi2K0533kqrgeQMFN28N.jpg"},{"id":2133107,"name":"Jade Johnson","character":"Competitor","profile_path":"https://image.tmdb.org/t/p/w500//hMvR39LNW8ohNrZIABeVTmXMDhk.jpg"},{"id":2628642,"name":"Miranda Chambers","character":"Competitor","profile_path":"https://image.tmdb.org/t/p/w500//hOnshlAhu8d3WQIVLrR64fPsTYB.jpg"},{"id":2752036,"name":"Moe Sasegbon","character":"Competitor","profile_path":"https://image.tmdb.org/t/p/w500//at7Hkl7JAOEZK8JFCKZbtHtvYov.jpg"},{"id":2719675,"name":"Gwendolyn Osborne-Smith","character":"Competitor","profile_path":"https://image.tmdb.org/t/p/w500//xg4NZciwNUTNJ3IyikplM48TxA.jpg"},{"id":1831280,"name":"Hayley Warnes","character":"Aella","profile_path":"https://image.tmdb.org/t/p/w500//2dPqpifxaxXc6urLimtC6bdkh5s.jpg"},{"id":5419,"name":"Saïd Taghmaoui","character":"Sameer (Photograph)","profile_path":"https://image.tmdb.org/t/p/w500//nn5SkRixPEQD49ttWmqwIPXolFR.jpg"},{"id":1125,"name":"Ewen Bremner","character":"Charlie (Photograph)","profile_path":"https://image.tmdb.org/t/p/w500//gge4f8Smr6nTjh6XscnmeRTa297.jpg"},{"id":1823591,"name":"Eugene Brave Rock","character":"Chief (Photograph)","profile_path":"https://image.tmdb.org/t/p/w500//27RL3pfNTBTu2zeNvFQTLFvCrJv.jpg"},{"id":11111,"name":"Lucy Davis","character":"Etta (Photograph)","profile_path":"https://image.tmdb.org/t/p/w500//A1ymILbxQA5w5TduCNaU0xD9C5a.jpg"},{"id":1432244,"name":"Lyon Beckwith","character":"Buzz Cut","profile_path":"https://image.tmdb.org/t/p/w500//vVY5DnT7uXQIU7cLbmb7HZItGEF.jpg"},{"id":2456540,"name":"Ryan Watson","character":"Bad Skin","profile_path":"https://image.tmdb.org/t/p/w500//3Ld7rcvDDtkCpnKw5MSprwrbPio.jpg"},{"id":1588704,"name":"Jimmy Burke","character":"Flat Top","profile_path":"https://image.tmdb.org/t/p/w500//5lZADRzUxifFTvRRVNgcqTjOmZk.jpg"},{"id":1237400,"name":"Brandon Thane Wilson","character":"Scowler","profile_path":"https://image.tmdb.org/t/p/w500//ytL4atSuVCpV4oJQ2PgovxkW8yV.jpg"},{"id":1795057,"name":"Oakley Bull","character":"Kelly (Girl Hostage)","profile_path":"https://image.tmdb.org/t/p/w500//dr2gXPMavXaJ9At9QuvCeh2Ifyn.jpg"},{"id":1331272,"name":"Andy Riddle","character":"Donkey Kong Geek (Mall)","profile_path":"https://image.tmdb.org/t/p/w500//mWa0KFNMKAn4FNVEeute9KG7kIF.jpg"},{"id":2910134,"name":"Rey Rey Terry","character":"Courtney","profile_path":"https://image.tmdb.org/t/p/w500//vEyFVaApMW8LAaJyivBfOMxFqVd.jpg"},{"id":2910143,"name":"Bill Debrason","character":"Mall Cop (Exterior)","profile_path":"https://image.tmdb.org/t/p/w500//tMcmtCxgmoUjy6mTy31xZ9i3MGW.jpg"},{"id":1208307,"name":"Rick Kain","character":"Mall Cop (Exterior)","profile_path":"https://image.tmdb.org/t/p/w500//6Iw3pCeGYAH4KNn0CA8iOGCoQsx.jpg"},{"id":1609246,"name":"Vickie Warehime","character":"Mall Security Guard","profile_path":"https://image.tmdb.org/t/p/w500//6iI6FRKTvMVFpkZq6OeVE0MiRbG.jpg"},{"id":1224594,"name":"Mike D. Anderson","character":"Mall Security Guard","profile_path":"https://image.tmdb.org/t/p/w500//lt2EjR8i3PCBC6vFhAxhfnwLj7z.jpg"},{"id":2437878,"name":"Christopher Crutchfield Walker","character":"Mall Security Guard","profile_path":"https://image.tmdb.org/t/p/w500//sbflzxPjip1P4t3R9pMEuTht4hz.jpg"},{"id":2225596,"name":"Gina Grinkemeyer","character":"Panicked Shopper","profile_path":"https://image.tmdb.org/t/p/w500//nNkZ8oJtzL02q9RHGpXevmS6Cuw.jpg"},{"id":2910159,"name":"Cassandra Newman","character":"Panicked Shopper","profile_path":"https://image.tmdb.org/t/p/w500//Aoi6TknyqNWOC2T1HMsJlR9aios.jpg"},{"id":2910167,"name":"Valerie Leonard","character":"Jewelry Sales Associate","profile_path":"https://image.tmdb.org/t/p/w500//eMSzpMYbyI26FqB59O7cNaUnx6q.jpg"},{"id":86159,"name":"Susan Smythe","character":"Jewelry Sales Associate","profile_path":"https://image.tmdb.org/t/p/w500//c8iXlaEJRhbxheWgRV3as1vfXYd.jpg"},{"id":2910169,"name":"Bob Cusack","character":"News Reporter (Aftermath)","profile_path":"https://image.tmdb.org/t/p/w500//aJ9YhSXJRM939ps3Fi0uuLyS4sT.jpg"},{"id":2910171,"name":"John Bucy","character":"Camaro Driver","profile_path":"https://image.tmdb.org/t/p/w500//a41u0dNBGv3t42Gg2TZhYjcI0Bm.jpg"},{"id":2615278,"name":"Mitch Holson","character":"Preppy Guy (Dupont Circle)","profile_path":"https://image.tmdb.org/t/p/w500//vziyt57fSGjGMScAeGnATFvZPwq.jpg"},{"id":2910177,"name":"Ashley Gladden","character":"Preppy Girl (Dupont Circle)","profile_path":"https://image.tmdb.org/t/p/w500//uFfxzlSdP4vAmtodXTBStCd47L2.jpg"},{"id":2910178,"name":"Spencer Trinwith","character":"Georgetown Café Waiter","profile_path":"https://image.tmdb.org/t/p/w500//r7MB98JSd5Yt65uc7qUqz20vjB7.jpg"},{"id":2910179,"name":"Parker Damm","character":"Commander Salamander Manager","profile_path":"https://image.tmdb.org/t/p/w500//3O6K4jJlLUY96na5iSuGV7sgyyY.jpg"},{"id":2174917,"name":"Caroline Coleman","character":"Shoplifter","profile_path":"https://image.tmdb.org/t/p/w500//DUYn5PashXyE184KGGjlElMXRC.jpg"},{"id":2910185,"name":"Summer Snead","character":"Shoplifter","profile_path":"https://image.tmdb.org/t/p/w500//urlksjx8Os0KYH4efk0GaSbZquF.jpg"},{"id":2910187,"name":"Tori Beverly","character":"Shoplifter","profile_path":"https://image.tmdb.org/t/p/w500//unlMJNh3JXVBbNwT6dMZGjPXJSM.jpg"},{"id":1596095,"name":"Raquel Merediz","character":"Eager Saleswoman (Clothes)","profile_path":"https://image.tmdb.org/t/p/w500//jPfKAG3ACVr9M33FwQFmhQKzkXR.jpg"},{"id":1757329,"name":"Vince Eisenson","character":"Guy Hailing Cab (Georgetown)","profile_path":"https://image.tmdb.org/t/p/w500//tEu8DZM6OzcEtBwyDljaF7CQlLr.jpg"},
    // {"id":1502438,"name":"Asim Chaudhry","character":"Roger (Co-Worker)","profile_path":"https://image.tmdb.org/t/p/w500//1F0DwOpxUAEpw5iovMHZ5Y1C8n6.jpg"},{"id":1224774,"name":"Danny Morgan","character":"Co-Worker 2 (Spare Coffee)","profile_path":"https://image.tmdb.org/t/p/w500//lUpq0zYBhpVq36XCjTYfMgCQtSn.jpg"},{"id":2361752,"name":"Tessa Bonham Jones","character":"Lucy (Co-Worker)","profile_path":"https://image.tmdb.org/t/p/w500//pCfKUSnKQ3lT7S3oEpMAD8urPJW.jpg"},{"id":1518112,"name":"Philip Philmar","character":"Janitor","profile_path":"https://image.tmdb.org/t/p/w500//z9QWTyjPFTuMMUX7uzDUrpLsjCw.jpg"},{"id":2854729,"name":"Mensah Bediako","character":"Leon","profile_path":"https://image.tmdb.org/t/p/w500//szyMjchx8grlD32kxTtyPBDXYeC.jpg"},{"id":1138284,"name":"Russell Barnett","character":"FBI Agent (Stagg's Office)","profile_path":"https://image.tmdb.org/t/p/w500//qhcR76eqtwZbAkLfthkLEdABdj0.jpg"},{"id":1070855,"name":"Peter Brooke","character":"FBI Agent (FBI Office)","profile_path":"https://image.tmdb.org/t/p/w500//5fRrmo1Xi9IkiVyypMgOPgZq5ed.jpg"},{"id":2389194,"name":"Jarren Dalmeda","character":"FBI Agent (Stagg's Lobby)","profile_path":"https://image.tmdb.org/t/p/w500//Aogz23Ojn3aXXNMIzGVce9TexOP.jpg"},{"id":2910204,"name":"Jasmine Clark","character":"Black Gold Receptionist","profile_path":"https://image.tmdb.org/t/p/w500//8HTKGj5m3HV2xHsD8TT9ZSkfQBS.jpg"},{"id":2559238,"name":"Jonathan Ajayi","character":"Black Gold Young Man - Emerson","profile_path":"https://image.tmdb.org/t/p/w500//fXyN5tv9prFx0hzbvtCVlW3QJhx.jpg"},{"id":2910206,"name":"Tomos Vaughan-Williams","character":"Black Gold Young Man","profile_path":"https://image.tmdb.org/t/p/w500//nIHRxgecbhIZL6AhEzxAihee9Rc.jpg"},{"id":1368639,"name":"Avi Rothman","character":"Black Gold Hotshot Aide","profile_path":"https://image.tmdb.org/t/p/w500//stJRvM5Zz1Atg31MxY0tZv5XQMV.jpg"},{"id":12820,"name":"Belinda Mayne","character":"Stagg's Secretary","profile_path":"https://image.tmdb.org/t/p/w500//p1gahR8dMufN1tXTqrQAL8dlPCq.jpg"},{"id":1186527,"name":"Orlando James","character":"Party Goer","profile_path":"https://image.tmdb.org/t/p/w500//ytGK31f9uV7xUfy5KjZOBD60kLo.jpg"},{"id":145039,"name":"Bruce McKinnon","character":"Party Goer","profile_path":"https://image.tmdb.org/t/p/w500//m4ygUs0es0BGd7Qpf2WpdsoaYNH.jpg"},{"id":1349801,"name":"Ed Birch","character":"White House Carl","profile_path":"https://image.tmdb.org/t/p/w500//k3CBVC3PVrcih7Q9xlySlqE8pMh.jpg"},{"id":1816343,"name":"Aykut Hilmi","character":"Cab Driver (Egypt)","profile_path":"https://image.tmdb.org/t/p/w500//k137y6o2JlIQP8ypldXBH0BDSZz.jpg"},{"id":1757702,"name":"Zaydun Khalaf","character":"Emir's Aide","profile_path":"https://image.tmdb.org/t/p/w500//vZPMRDIfgxjnPGXtF9ysK8Mh5RJ.jpg"},{"id":2910208,"name":"Nerea Palacios","character":"Egyptian Child 1 (Diana Saves)","profile_path":"https://image.tmdb.org/t/p/w500//9vzuAHDpMDFJ9tDS0IGgsNEVvr8.jpg"},{"id":2910210,"name":"Joanne Henry","character":"White House Staffer","profile_path":"https://image.tmdb.org/t/p/w500//tzPGuFiIEm7IHM6w2DZhCQpnGoE.jpg"},{"id":109653,"name":"Patrick Lyster","character":"CJCS (Oval Office)","profile_path":"https://image.tmdb.org/t/p/w500//zslHTSosjZcpztqo44eZx0WjOVH.jpg"},{"id":972459,"name":"Sam Sheridan","character":"US Army Tech","profile_path":"https://image.tmdb.org/t/p/w500//2gIDuWcE0dP5INECLmN50BPE7an.jpg"},{"id":2361851,"name":"Paul Boyd","character":"US Army Tech","profile_path":"https://image.tmdb.org/t/p/w500//sOJMvErwMGMrEFtGjKzGluTLUCx.jpg"},{"id":1083173,"name":"Vincent Jerome","character":"US Army Tech","profile_path":"https://image.tmdb.org/t/p/w500//vCtKI7J5vRtKkOWjGdyx7z3cAO2.jpg"},{"id":1322309,"name":"Akie Kotabe","character":"Air Traffic Controller","profile_path":"https://image.tmdb.org/t/p/w500//89qQru3SueSpKPhAb1MgoIZEnen.jpg"},{"id":59867,"name":"Kenneth Jay","character":"Air Traffic Controller","profile_path":"https://image.tmdb.org/t/p/w500//a2AfoXrNL1apy0XkOnOOdIfgx17.jpg"},{"id":1926536,"name":"Jasmine Hyde","character":"British News Reporter","profile_path":"https://image.tmdb.org/t/p/w500//98gf9BghpWH4YdOiFa5e6hHWSAn.jpg"},{"id":2894633,"name":"Paul McQuaid","character":"American Reporter","profile_path":"https://image.tmdb.org/t/p/w500//eC0RN5izFH4hzqyjiY5MleUU2zv.jpg"},{"id":1459975,"name":"Gabriel Constantin","character":"Silo Technician","profile_path":"https://image.tmdb.org/t/p/w500//zwTHzcYGoho4gbVdYVfMqF5Wxq3.jpg"},{"id":2592684,"name":"Alex Delescu","character":"Silo Technician","profile_path":"https://image.tmdb.org/t/p/w500//jfzHaK4SRZV2qTSg45oyPqhgSBS.jpg"},{"id":1322236,"name":"Mish Boyko","character":"Silo Technician","profile_path":"https://image.tmdb.org/t/p/w500//sAynqBOykz03qlcWM9hOKXUfH6y.jpg"},{"id":27425,"name":"Constantine Gregory","character":"Russian General","profile_path":"https://image.tmdb.org/t/p/w500//Wu1DUqLi8ZclEcdLGgYgnNcPmw.jpg"},{"id":1507209,"name":"Michael Poole","character":"Old Russian Grandafther","profile_path":"https://image.tmdb.org/t/p/w500//yGpV9QwhDJx5ed8Bh3lN8AO3u0M.jpg"},{"id":2910215,"name":"Joe Palka","character":"Neighbor / Cow Man","profile_path":"https://image.tmdb.org/t/p/w500//dxhkvBdUryHQqVqog0aUXSEJMTj.jpg"},{"id":2910216,"name":"Jean H. Miller","character":"Dog Walker","profile_path":"https://image.tmdb.org/t/p/w500//u6oUEIIzZmX23UB4EAjjLSBuvAG.jpg"},{"id":2910218,"name":"Mike Sengelow","character":"Head Technician (Inner Chamber)","profile_path":"https://image.tmdb.org/t/p/w500//94gLCJW9zCMARtpMx6Q5bcQi63C.jpg"},{"id":2330639,"name":"Paul Connaughton","character":"Irishman (Tea Shop)","profile_path":"https://image.tmdb.org/t/p/w500//mom4qr4KLNuQ2zsJgABGDuYehkL.jpg"},{"id":237409,"name":"Wendy Albiston","character":"Nasty Woman (Tea Shop)","profile_path":"https://image.tmdb.org/t/p/w500//fphjc3pDIHDexG61NTvf89wjbce.jpg"},{"id":28049,"name":"Rhonda Overby","character":"Passing Reporter","profile_path":"https://image.tmdb.org/t/p/w500//ribWbzgdoZezQhl1jw2Qs1hJqjd.jpg"},{"id":2910222,"name":"Luis Torrecilla","character":"Max's Father","profile_path":"https://image.tmdb.org/t/p/w500//gwsPZLWd3XQJQwJ3sN3tAN2YYKA.jpg"},{"id":2910223,"name":"Sarah Barlondo","character":"Max's Mother","profile_path":"https://image.tmdb.org/t/p/w500//oDq47Rv9yJDh7gWwlYqEDLiUf.jpg"},{"id":117281,"name":"Matt Costello","character":"Max's Driver","profile_path":"https://image.tmdb.org/t/p/w500//37qAeKsqdelcHPePldkQIqZv8cs.jpg"},{"id":2910226,"name":"Evan Bittner","character":"Photographer","profile_path":"https://image.tmdb.org/t/p/w500//3WVQybIpF3Jj4sj5GUoDJhsfSiW.jpg"},{"id":2910227,"name":"Archie L. Harris Jr.","character":"Penn Avenue Watergate Cop","profile_path":"https://image.tmdb.org/t/p/w500//yIGvYkmu7BM0atvQaadKEMpqttr.jpg"},{"id":2910228,"name":"Stephanie Waters","character":"Penn Avenue Mother","profile_path":"https://image.tmdb.org/t/p/w500//48LM0EspzIBPJGxsL3RZbzjXH6G.jpg"},{"id":2163739,"name":"Thomas Clay Strickland","character":"Wild Gunman","profile_path":"https://image.tmdb.org/t/p/w500//6rquwfQtPoArOZyTmHCBASnZVPj.jpg"},{"id":2676881,"name":"Chi-Lin Nim","character":"Wang (Chinese Kitchen)","profile_path":"https://image.tmdb.org/t/p/w500//1raMFdwm2qgm0wVhadRSQhyikWc.jpg"},{"id":2910230,"name":"Michael Kaurene","character":"Punk in Subway","profile_path":"https://image.tmdb.org/t/p/w500//8OB4c1704Q8aRyxrBF7QKzwVpdl.jpg"},{"id":117491,"name":"Michael Gabel","character":"Apocalyptic Preacher","profile_path":"https://image.tmdb.org/t/p/w500//cRxomoBed64sVgSHjiR2Pw7WSIL.jpg"},{"id":2910233,"name":"Dan De Luca","character":"Convoy Driver","profile_path":"https://image.tmdb.org/t/p/w500//84017BTIO0uIVckmSodsml4LrHE.jpg"},{"id":2910234,"name":"Ahmed Hussien","character":"Convoy Driver","profile_path":"https://image.tmdb.org/t/p/w500//oBdluciITK6A0yb9qNFfI9Iz47h.jpg"},{"id":1927469,"name":"Tony Zarouel","character":"Convoy Driver","profile_path":"https://image.tmdb.org/t/p/w500//k2VTiMvS82vvhV3JCDyKqADDFON.jpg"},{"id":1823833,"name":"Naithan Ariane","character":"Convoy Driver","profile_path":"https://image.tmdb.org/t/p/w500//vSLGS71zWAde32dq9VPXtJ8SdKk.jpg"},{"id":148141,"name":"Joel Morris","character":"Security Guard","profile_path":"https://image.tmdb.org/t/p/w500//m6QAeVWqkDqBIDqOtVoTOygAr4T.jpg"},{"id":1389276,"name":"Michael Salami","character":"Security Guard","profile_path":"https://image.tmdb.org/t/p/w500//n3ref1jkgE17KVrouV5BoSnxDd.jpg"},{"id":1159680,"name":"Kosha Engler","character":"US National News Anchor","profile_path":"https://image.tmdb.org/t/p/w500//iE4RR7pX5fHOpCpcJgyvdJnvImZ.jpg"},{"id":2910239,"name":"Asa Sheridan","character":"Jace Valentine","profile_path":"https://image.tmdb.org/t/p/w500//rWjhTz2mfj43l9wlbJFCFbrTGD0.jpg"},{"id":2910241,"name":"Alma Varsano","character":"Snowball Girl","profile_path":"https://image.tmdb.org/t/p/w500//zE27HRo063LHUqRGhVkSZwavwXr.jpg"},{"id":2910242,"name":"Maya Varsano","character":"Carousel Girl","profile_path":"https://image.tmdb.org/t/p/w500//mO21b2rYXpo8GETVctyqvouKomE.jpg"},{"id":2431947,"name":"Jaron Varsano","character":"Carousel Father","profile_path":"https://image.tmdb.org/t/p/w500//v3k0CYHiDsI8kydvXYtYQYq25WY.jpg"},{"id":2910244,"name":"Tilly Winford","character":"Christmas Player","profile_path":"https://image.tmdb.org/t/p/w500//jy9tJsDfc9oxdRv1fNdLGJVb2O0.jpg"},{"id":120888,"name":"Victoria Broom","character":"Grateful Parent","profile_path":"https://image.tmdb.org/t/p/w500//zyzIHbCqBNXCJ3PygvfthiIBwBG.jpg"},{"id":2910246,"name":"Hamza Siddique","character":"Militant","profile_path":"https://image.tmdb.org/t/p/w500//APIjPmolHDdjhZ4Ztu661iRBwc.jpg"},{"id":23608,"name":"Colin Stinton","character":"NORAD Colonel","profile_path":"https://image.tmdb.org/t/p/w500//py45eR9pshr0xDUMRN4B8FsqrsH.jpg"},
    // {"id":2910248,"name":"Katharine Pickering","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//sEiQe1R87wqaVgB5mygHiY1x06b.jpg"},{"id":2910249,"name":"Karis McCabe","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//ArA8bRqBl2ko0QrN1TPCkEnhgEw.jpg"},{"id":2910250,"name":"Saskia Neville","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//5E5o9sXgl7nXUStPHSDuZW4pOCB.jpg"},{"id":2910252,"name":"Jenny Pacey","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//m5UUzMh4VArIi4I2TJO3GZ4bBvJ.jpg"},{"id":2910254,"name":"Mikayla-Jade Barber","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//tDICMjbsXvqXJvHrk8qT4Necx62.jpg"},{"id":2910255,"name":"Candice Carbine","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//zfVNjqU1Jb8ADYk89pxd8B6NZa1.jpg"},{"id":2910256,"name":"Donna Forbes","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//2p6VbBu8v5cYuwWVBOPmGEPSh4j.jpg"},{"id":2910257,"name":"Chantal Nell","character":"Amazon Athlete","profile_path":"https://image.tmdb.org/t/p/w500//398WkklEPHcgLIRQvI07XSnkMAI.jpg"},{"id":44935,"name":"Lynda Carter","character":"Asteria","profile_path":"https://image.tmdb.org/t/p/w500//yExXEOoAP2xAOBNIlBSQz3bBGcx.jpg"},{"id":2110770,"name":"Al Clark","character":"Party Guest (uncredited)","profile_path":"https://image.tmdb.org/t/p/w500//dWIYkMudhwWn9bKHyATTTdIkRHq.jpg"},{"id":1502439,"name":"Bern Collaço","character":"Gala Guest (uncredited)","profile_path":"https://image.tmdb.org/t/p/w500//ziLGGjo5GWzYDL8H4MUquoFj8r0.jpg"},{"id":2656142,"name":"Chuck Taber","character":"Rioter / Driver (uncredited)","profile_path":"https://image.tmdb.org/t/p/w500//3Da2e0pDetKApfWkWr1R7bZmVhQ.jpg"}],
    // "movieReview":[{"author":"SWITCH.","content":"It isn't as easy in logic that defy even standards for a comic book film.\r\n\r\nThe first 90 minutes of the film has roughly 10-15 minutes of action tops and we are instead given lengthy scenes of Steve trying to find an 80s fashion look; flying over fireworks, and Maxwell trashing from one locale to another without much needed continuity.\r\n\r\nAn action scene involving a convoy chase through the desert seems very inspired by “Raiders of the Lost Ark” and ultimately does not deliver especially with such a long gape between the action sequences.\r\n\r\nThe final act does attempt to redeem the film as seeing Barbara transform into her new persona is interesting and Wiig does a very solid job with the role. This sadly is undermined with a single line of dialogue which takes away a big part of the transformation that audiences deserved to see.\r\n\r\nThere was also a sequence where Diana races down the streets and takes to flight with her Lasso and then discovers she can fly like Superman. Not only is this not in keeping with the character; but we see this extended fast moving sequence where she is clearly heading away from D.C. at great speed only to arrive at a destination with an item which had been established to be back at her home in D.C.  It is this sort of sloppiness that really detracts from the film. There is also the fact that Steve has to fly her around on a jet that even as a pilot he should not know how to fly as he has never flown a jet aircraft in his life.\r\n\r\nWhen the big confrontation comes it is a letdown as it is not overly epic and the CGI really does not seem to mesh. What is an even bigger disappointment is that a certain character stands emoting for several minutes while Diana gives such a bland and extended speech that even my wife had to ask “who wrote these lines”.\r\n\r\nThe film was not a total disaster as the characters were interesting and worked well with one another making the film entertaining in parts despite being really disappointed with it.\r\n\r\nThe film strikes me as a product of the talented Patty Jenkins being able to do whatever she wanted after the success of the first film. Jenkins not only Directed but did the screenplay for it. Considering the amazing job she did writing “Monster” I had high expectations for the film but to me it seemed like it could have used a bit more attention to several aspects.\r\n\r\nMy summary would be the following… good cast, entertaining in parts, not much action over two hours, takes huge liberties with Diana and her abilities, massive gaps in logic even for a comic movie. It aims to be epic and comes up lacking. At least the mid. credit scene was worth it.\r\n\r\n3 stars out of 5","created_at":"2020-12-23T15:36:37.849Z","url":"https://www.themoviedb.org/review/5fe364055be00e003d9e536c","rating":0,"avatar_path":"https://secure.gravatar.com/avatar/3593437cbd05cebe0a4ee753965a8ad1.jpg"},{"author":"Wehrmacht","content":"Heroes are only as good as their villains.  Nothing sums up the disappointment of WW84 more than this.\r\n\r\nMaxwell Lord & Barbara Minerva are two of the most dangerously dark psyches in DC lore, both fond of extremely nasty, deliberately sociopathic behavior.\r\n\r\nWhoever it was pretending to be them in WW84, it wasn't those two from the comics.\r\n\r\nWe had some namby-pamby twerp called \"Max Lord\" who was just a misguided fool trying to fill that emptiness in his pathetic life with a magic dream.  Yawn.\r\n\r\nAlso, some good-hearted ditz called \"Barbara Minerva\" basically became inadvertent collateral damage whilst Lord's dopey plan panned out.  Admittedly, that's vaguely similar to one of Cheetah's later origin stories, but it completely discounts her propensity for choosing the pure evil path.\r\n\r\nIt could have been fun watching a proper mind-controlling Lord and a proper soul-possessing Cheetah fight over the \"ownership\" of some red shirt.  Alas, no.\r\n\r\nWhat an absolute WASTE of two A-grade narrative heavyweights!  But then, that's the problem.\r\n\r\nYou simply could NOT use characters like Lord & Cheetah appropriately in a movie targeted towards a family audience, and it's obvious that \"make this family friendly\" was plastered all over the script in red sharpie.\r\n\r\nNothing's likely to change for the third WW installment, where, in keeping with the cinematic PG-downgrade of supervillains, Circe is portrayed as a lonely kid's party magician who gets angry when her balloons get popped, so she turns everyone into pet unicorns.","created_at":"2020-12-27T03:24:01.005Z","url":"https://www.themoviedb.org/review/5fe7fe505b1240003c695c82","rating":6,"avatar_path":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"},{"author":"Schwabihabi","content":"This movie is dumber than it should be. In short: it looks fantastic and the action is in perfect WONDER WOMAN style. The problems are with the plot, the attention to detail and coherence. I'm not saying this movie should be more realistic, but a lot of the decisions just don't make any sense and it is loaded to the brim with cliches (eg. ugly duckling that is not ugly at all). If you expect something to happen, it will 100%, there is no try to dig deeper - it is always the most obvious and easiest solution.  Especially the all solving \"action\" of Diana, is more than questionable and leaves so many plot-holes. \r\n\r\nIf you don't care about logic (not realism) or a challenging story this movie is perfect for you...","created_at":"2020-12-28T19:39:40.194Z","url":"https://www.themoviedb.org/review/5fea347ca14bef003f2f5f6f","rating":5,"avatar_path":"https://secure.gravatar.com/avatar/0cb956fc1daf59cfd92f71c55432b20e.jpg"},{"author":"mcse2000ca","content":"Do not trust the reviews before Dec 25th 2020 they are bought and paid for early release reviews, this movie is bad real bad, bad CGI and horrible story shame really the first one was amazing but Patty Jenkins should just stick with directing she is just not a good writer.","created_at":"2021-01-05T15:09:43.598Z","url":"https://www.themoviedb.org/review/5ff481377ef3810040d8a22e","rating":3,"avatar_path":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"},{"author":"Ricardo Oliveira","content":"1984, a sequel to the fantastic \"Wonder Woman\", which showed a cool breeze in the middle of a saturated superhero cinematic market, is a fantastic continuation of the story of our favourite super heroine. Lighter in action, but thematically profound, this may not be a film that pleases everyone.\r\n\r\nLet's start with the positives: Gal Gadot, as a wonder woman, continues to prove to be the perfect choice to play the part. The actress maintains a strong bond with the audience , really showing all the strong emotions that the character feels during the course of the story. Without her, the film would lose something really essential: her soul.\r\n\r\nThe story, thematically linked to greed, our deepest desires and selfishness, provides a journey of development for the characters that makes us reassess certain attitudes taken throughout our lives.  The story seeks to develop each of the characters, and this is what gives it so much strength.\r\n\r\nChris Pine, as Steve Trevor, is also one of the film's high points, and his chemistry with Gadot remains explosive, providing the film with an engaging romance that will make anyone feel warm inside.\r\n\r\nThe film is completely different from the first, its style is radically changed, becoming lighter, like a cartoon we watched on Saturday morning as children. For some, dramatic stylistic change may be a negative factor, but in a year of so much suffering, lightness and hope are exactly what we need to abstract ourselves from real life for two hours.\r\n\r\nWhen it comes to action, the film is not as explosive as first, it is contained and the action sequences, though incredible, are scarce. In a two and a half hour film, this may entice some to feel bored. But in my opinion, the film never slows down because of the incredible characters and their interactions. \r\n\r\nAs far as the most negative points of the film are concerned, I would say that the rope of suspension of credibility is really stretched during the duration of the film and we are asked to accept really ridiculous things that come out of nowhere. The film is also very cheesy, with sequences that can be considered lame and dull.\r\n\r\nAll in all, however, this film is a glimmer of hope and joy in a dark and desperate year. I strongly advise you to watch it, it's two hours of fun, with no problems and smiles in the mix. Although not perfect, and inferior to the first, this sequel is worthy of the adjective \"Wonder\".","created_at":"2021-01-07T13:44:37.447Z","url":"https://www.themoviedb.org/review/5ff710450cd32a0045471e8c","rating":0,"avatar_path":"https://image.tmdb.org/t/p/original/eZNonV9PyvmDzNtJw8NvfHUXujT.jpg"},
    // {"author":"oleksandrsavostian","content":"Wonder Woman 1984 is solid where it counts, maudlin in the way its fans need it to be, and, similarly, just funny enough to be charming. For all that goes unsaid, the writing is even occasionally clever.","created_at":"2021-01-18T20:36:36.046Z","url":"https://www.themoviedb.org/review/6005f154e942ee003fe66ef0","rating":0,"avatar_path":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"},{"author":"251Family","content":"**This movie was horrible... and I realize this isnt my genre..but I sat at Christmas and watched it with my 2 grand daughters as they were sooo excited to see it..and we literally ALL hated it...  The movie itself is pointless with alot of dialogue that means nothing... no real build up to anything.. If you have to use an entire 2 hours to \"explain\" a character your probably doing something wrong.. \r\n\r\nWas SERIOUSLY disappointed in ALL the actors in it..Particularly the guy from the Chapo Netflix series.. his character was HORRIBLE... and if I am being honest..I am not impressed with this woman they have chosen as WW... not in slightest.. extremely odd looking and well... I didnt even find her acting chops good for a film like this...\r\n\r\nIt was so bad we lasted about %80 of the film befoe we stopped it and started the older one.. I'm not a fan of this actess nor this take on WW at all... **","created_at":"2021-01-20T01:49:06.495Z","url":"https://www.themoviedb.org/review/60078c12fb3f61004a4133a8","rating":1,"avatar_path":"https://image.tmdb.org/t/p/original/7HhVbIfwM8RuLS33dTDXldwazd6.jpg"},{"author":"Suebee4024","content":"I have read the book \"1984\" and saw some aspects of the book in this movie- Big Brother, Group Think etc.  The moral dilemma that Wonder Woman faces is truly heart wrenching.  But as for the rest of the movie, there were some good action scenes and great CGI.I did notice that of all the great nations affected negatively, there was one significant one missing, China.  Why would China have been left out of the turmoil affecting the rest of the world?  Were the makers of the film afraid to show anything negative about China, but were willing to show other nations in a type of stereotypical light?  The depiction of the President of the US, who in 1984 was actually Ronald Reagan, was shown to be an insecure and to be overly ready to shoot off the nuclear warheads.  They never called him by name, but the dark hair and the jar of jelly beans were obvious who they were portraying.  The hair of the villain of the movie and his ever growing quest for power were subtle clues for another person that Hollywood has deemed a power hungry demonic person.  Ironically, the villain uses the same medium to spread his mental suggestions as the media uses to influence us to theirs.  The definite political agenda ruined some of my interest in the movie but as eye candy and brain numbing entertainment it fits the bill,    They leave the possibility of a prequel or sequel open in scenes at the end - after the credits","created_at":"2021-01-23T19:48:29.158Z","url":"https://www.themoviedb.org/review/600c7d8dcb8028003f01e76e","rating":0,"avatar_path":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"}],"movieVideo":[{"site":"YouTube","type":"Trailer","name":"Official Trailer","key":"sfM7_JLk-84"}]})

})

// tv detail
app.get('/tv_detail/:id', async function (request, response) {
  console.log("/api/tv_detail");
  response.header("Access-Control-Allow-Origin", "*");
  const res1 = await fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
    });
  const res2 = await fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '/credits?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method: 'GET',
  });
  const res3 = await fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '/reviews?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method: 'GET',
  }); 
  // const res4 = await fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '/recommendations?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
  //   method: 'GET',
  // });
  // const res5 = await fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '/similar?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
  //   method: 'GET',
  // });
  const res6 = await fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '/videos?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method: 'GET',
  });
    // .then(response => response.json())
    // .then(result => {
    //   response.send(moive_detail(result));
    //   // response.send(result);
    //   console.log('Success');
    // })
    // .catch(error => {
    //   response.send(error);
    //   console.error('Error', error);
    // });
    var list = {};
    const result1 = await res1.json();
    const result2 = await res2.json();
    const result3 = await res3.json();
    // const result4 = await res4.json();
    // const result5 = await res5.json();
    const result6 = await res6.json();
    list.movieDetial = tv_detail(result1);
    // list.movieDetial = result1;
    list.movieCast = moive_cast(result2);
    list.movieReview = moive_review(result3);
    // list.recomMovie = parse_tv(result4);
    // list.similMoive = parse_tv(result5);
    list.movieVideo = moive_video(result6);
    response.send(list);

})

/* 4.1.15 Recommended TV shows Endpoint */
app.get('/recommend_tv/:id', function (request, response) {
  console.log("/api/recommend_tv");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '/recommendations?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
  })
    .then(response => response.json())
    .then(result => {
      response.send(parse_tv(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });

  // if(request.params.id == '577922'){
  //   response.send([{"id":546554,"title":"Knives Out","poster_path":"https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg"},{"id":530915,"title":"1917","poster_path":"https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg"},{"id":522627,"title":"The Gentlemen","poster_path":"https://image.tmdb.org/t/p/w500/jtrhTYB7xSrJxR1vusu99nvnZ1g.jpg"},{"id":466272,"title":"Once Upon a Time… in Hollywood","poster_path":"https://image.tmdb.org/t/p/w500/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg"},{"id":515001,"title":"Jojo Rabbit","poster_path":"https://image.tmdb.org/t/p/w500/7GsM4mtM0worCtIVeiQt28HieeN.jpg"},{"id":496243,"title":"Parasite","poster_path":"https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"},{"id":398978,"title":"The Irishman","poster_path":"https://image.tmdb.org/t/p/w500/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg"},{"id":181812,"title":"Star Wars: The Rise of Skywalker","poster_path":"https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg"},{"id":359724,"title":"Ford v Ferrari","poster_path":"https://image.tmdb.org/t/p/w500/dR1Ju50iudrOh3YgfwkAU1g2HZe.jpg"},{"id":473033,"title":"Uncut Gems","poster_path":"https://image.tmdb.org/t/p/w500/sg0xxJeb3u1C4kAxhSuTwTNpEDt.jpg"},{"id":556984,"title":"The Trial of the Chicago 7","poster_path":"https://image.tmdb.org/t/p/w500/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg"},{"id":492188,"title":"Marriage Story","poster_path":"https://image.tmdb.org/t/p/w500/pZekG6xabTmZxjmYw10wN84Hp8d.jpg"},{"id":503919,"title":"The Lighthouse","poster_path":"https://image.tmdb.org/t/p/w500/3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"id":419704,"title":"Ad Astra","poster_path":"https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg"},{"id":740985,"title":"Borat Subsequent Moviefilm","poster_path":"https://image.tmdb.org/t/p/w500/kwh9dYvZLn7yJ9nfU5sPj2h9O7l.jpg"},{"id":340102,"title":"The New Mutants","poster_path":"https://image.tmdb.org/t/p/w500/xZNw9xxtwbEf25NYoz52KdbXHPM.jpg"},{"id":587792,"title":"Palm Springs","poster_path":"https://image.tmdb.org/t/p/w500/yf5IuMW6GHghu39kxA0oFx7Bxmj.jpg"},{"id":499932,"title":"The Devil All the Time","poster_path":"https://image.tmdb.org/t/p/w500/bVL7LGq528h3KzeNI90HOVbV5uW.jpg"},{"id":508442,"title":"Soul","poster_path":"https://image.tmdb.org/t/p/w500/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg"},{"id":292011,"title":"Richard Jewell","poster_path":"https://image.tmdb.org/t/p/w500/5Lgkm8jt4roAFPZQ52fKMhVmDaZ.jpg"}]); 
  // }else {
  //   response.send([{"id":577922,"title":"Tenet","poster_path":"https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg"},{"id":320288,"title":"Dark Phoenix","poster_path":"https://image.tmdb.org/t/p/w500/kZv92eTc0Gg3mKxqjjDAM73z9cy.jpg"},{"id":605116,"title":"Project Power","poster_path":"https://image.tmdb.org/t/p/w500/TnOeov4w0sTtV2gqICqIxVi74V.jpg"},{"id":524047,"title":"Greenland","poster_path":"https://image.tmdb.org/t/p/w500/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg"},{"id":551804,"title":"Freaky","poster_path":"https://image.tmdb.org/t/p/w500/8xC6QSyxrpm0D5A6iyHNemEWBVe.jpg"},{"id":456740,"title":"Hellboy","poster_path":"https://image.tmdb.org/t/p/w500/bk8LyaMqUtaQ9hUShuvFznQYQKR.jpg"},{"id":547016,"title":"The Old Guard","poster_path":"https://image.tmdb.org/t/p/w500/cjr4NWURcVN3gW5FlHeabgBHLrY.jpg"},{"id":443791,"title":"Underwater","poster_path":"https://image.tmdb.org/t/p/w500/gzlbb3yeVISpQ3REd3Ga1scWGTU.jpg"},{"id":590223,"title":"Love and Monsters","poster_path":"https://image.tmdb.org/t/p/w500/r4Lm1XKP0VsTgHX4LG4syAwYA2I.jpg"},{"id":464052,"title":"Wonder Woman 1984","poster_path":"https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"},{"id":625568,"title":"Unhinged","poster_path":"https://image.tmdb.org/t/p/w500/6JGjweoW3yzCV1VpZX1ATR6m1j0.jpg"},{"id":338967,"title":"Zombieland: Double Tap","poster_path":"https://image.tmdb.org/t/p/w500/dtRbVsUb5O12WWO54SRpiMtHKC0.jpg"},{"id":531309,"title":"Brightburn","poster_path":"https://image.tmdb.org/t/p/w500/sJWwkYc9ajwnPRSkqj8Aue5JbKz.jpg"},{"id":570670,"title":"The Invisible Man","poster_path":"https://image.tmdb.org/t/p/w500/5EufsDwXdY2CVttYOk2WtYhgKpa.jpg"},{"id":501170,"title":"Doctor Sleep","poster_path":"https://image.tmdb.org/t/p/w500/p69QzIBbN06aTYqRRiCOY1emNBh.jpg"},{"id":373571,"title":"Godzilla: King of the Monsters","poster_path":"https://image.tmdb.org/t/p/w500/mzOHg7Q5q9yUmY0b9Esu8Qe6Nnm.jpg"},{"id":501979,"title":"Bill & Ted Face the Music","poster_path":"https://image.tmdb.org/t/p/w500/4V2nTPfeB59TcqJcUfQ9ziTi7VN.jpg"},{"id":514847,"title":"The Hunt","poster_path":"https://image.tmdb.org/t/p/w500/fHCMPd1w8wcJmrplR3ebCl6nfFI.jpg"},{"id":457335,"title":"Guns Akimbo","poster_path":"https://image.tmdb.org/t/p/w500/vV23MzddmlZJ6TIXpmRUyGV9961.jpg"},{"id":479455,"title":"Men in Black: International","poster_path":"https://image.tmdb.org/t/p/w500/dPrUPFcgLfNbmDL8V69vcrTyEfb.jpg"}])
  // }

});

/* 4.1.16 Similar TV shows Endpoint */
app.get('/similar_tv/:id', function (request, response) {
  console.log("/api/similar_tv");
  response.header("Access-Control-Allow-Origin", "*");
  fetch('https://api.themoviedb.org/3/tv/' + request.params.id + '/similar?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
  })
    .then(response => response.json())
    .then(result => {
      response.send(parse_tv(result));
      console.log('Success');
    })
    .catch(error => {
      response.send(error);
      console.error('Error', error);
    });
});

/* 4.1.17 TV show Video Endpoint */


/* 4.1.18 TV show Details Endpoint */


/* 4.1.19 TV show Reviews Endpoint 10 */


/* 4.1.20 TV show Cast Endpoint */


/* 4.1.21 Cast Details Endpoint */
app.get('/cast_detail/:id', async function (request, response) {
  console.log("/api/cast_detail");
  response.header("Access-Control-Allow-Origin", "*");
  const res1 = await fetch('https://api.themoviedb.org/3/person/' + request.params.id + '?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
      method: 'GET',
    });
  const res2 = await fetch('https://api.themoviedb.org/3/person/' + request.params.id + '/external_ids?api_key=2aadd0e211a8542c57ce7842dcaa5062&language=en-US&page=1', {
    method: 'GET',
  });
  var list = {};
  const result1 = await res1.json();
  const result2 = await res2.json();
  
  // list.castDetial = result1;
  list.castDetial = cast_detail(result1);
  // list.externalID = result2;
  list.externalID = cast_externalID(result2);
  response.send(list);

  // response.send({"castDetial":[{"birthday":"1989-02-16","gender":"female","name":"Elizabeth Olsen","place_of_birth":"Sherman Oaks, California, USA","homepage":null,"also_known_as":["Elizabeth Chase \"Lizzie\" Olsen","Elizabeth Chase Olsen","Lizzie Olsen","엘리자베스 올슨"],"known_for_department":"Acting","biography":"Elizabeth Chase Olsen was born on February 16th, 1989 in Sherman Oaks, California, USA to Jarnette and David Olsen (now divorced). Elizabeth has five siblings, famous older sisters Mary-Kate & Ashley, big brother Trent and younger stepsiblings, Taylor and Jake (from her father’s remarriage).\n\nShe appeared in her older sisters movies How the West Was Fun in 1994 and The Adventures of Mary-Kate & Ashley: The Case of the Mystery Cruise in 1995. Elizabeth is a graduate of NYU Tisch School of the Arts and the Atlantic Theater Company Acting School in New York City.\n\nHer breakthrough came in 2011 when Elizabeth starred in the independent thriller drama Martha Marcy May Marlene, for which she was nominated for the Broadcast Film Critics Association Award for Best Actress and Independent Spirit Award for Best Female Lead, among other awards. Elizabeth subsequently starred in the films Silent House (2011), Liberal Arts (2012), Oldboy (2013), Godzilla (2014), I Saw the Light (2015), Ingrid Goes West (2017), and Wind River (2017). Olsen portrays Wanda Maximoff/Scarlet Witch in the Marvel Cinematic Universe. She has portrayed the character in Captain America: The Winter Soldier (2014), Avengers: Age of Ultron (2015), Captain America: Civil War (2016), Avengers: Infinity War (2018), Avengers: Endgame (2019). She reprises her role in the Disney+  series WandaVision (2021), and Doctor Strange in the Multiverse of Madness (2022).\n\nWikipedia, under the Creative Commons Attribution-Share-Alike License 3.0"}],"externalID":[{"imdb_id":"nm0647634","facebook_id":"OfficiallyElizabethOlsen","instagram_id":"","twitter_id":null}]});

})

/* 4.1.22 Cast external ids Endpoint */

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`listening on port ${port} at http://localhost:3000`);
})