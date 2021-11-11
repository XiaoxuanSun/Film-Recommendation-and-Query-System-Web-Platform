/* function for current multi search, no person in results, only seven results maximum */
function search_result(result) {
  data = result['results']
  i = 0
  count = 0
  ret = []
  if(!result['results']) {
    return ret;
  }

  console.log(data.length)
  while(i < data.length && count < 7) {
    if(data[i]['media_type'] == 'person') {
      i++;
      continue;
    } else {
      if(data[i]['id'] == null || !data[i]['backdrop_path'] || !data[i]['poster_path']) {
        i++;
        continue;
      }
    }
    
    // console.log(data[i]['title']);

    if(data[i]['media_type'] == 'movie') {
      ret.push({
        id : data[i]['id'],
        title: data[i]['title'],
        backdrop_path: 'https://image.tmdb.org/t/p/w500' + data[i]['backdrop_path'],
        poster_path: 'https://image.tmdb.org/t/p/w500' + data[i]['poster_path'],
        media_type: data[i]['media_type']
      })
    } else if(data[i]['media_type'] == 'tv') {
      ret.push({
        id : data[i]['id'],
        title: data[i]['name'],
        backdrop_path: 'https://image.tmdb.org/t/p/w500' + data[i]['backdrop_path'],
        poster_path: 'https://image.tmdb.org/t/p/w500' + data[i]['poster_path'],
        media_type: data[i]['media_type']
      })
    }
    i++;
    count++;
  }
  return ret;
}

/* function for current playing movie(biggest Carousel) only five results */
function parse_current(result) {
  data = result['results']
  i = 0
  count = 0

  console.log(data.length)

  ret = []
  while(i < data.length && count < 5) {
    if(data[i]['backdrop_path'] == null || data[i]['poster_path'] == null) {
      i++;
      continue;
    }
    // console.log(data[i]['title']);

    ret.push({
      id : data[i]['id'],
      title: data[i]['title'],
      backdrop_path: 'https://image.tmdb.org/t/p/w1280' + data[i]['backdrop_path'],
      poster_path: 'https://image.tmdb.org/t/p/w500' + data[i]['poster_path'],
    })
    i++;
    count++;
  }
  return ret;
}


/* function for all movie result, no restriction of amount of results */
function parse_movie(result) {
  
  data = result['results']
  i = 0
  ret = []
  if(!result['results']) {
    return ret;
  }
  while(i < data.length) {
    if(data[i]['id'] == null || data[i]['poster_path'] == null) {
      i++;
      continue;
    }
    // console.log(data[i]['title']);

    ret.push({
      id : data[i]['id'],
      title: data[i]['title'],
      poster_path: 'https://image.tmdb.org/t/p/w500' + data[i]['poster_path']
    })
    i++;
  }
  return ret;
}

/* function for all tv result, no restriction of amount of results */
function parse_tv(result) {
  data = result['results']
  i = 0
  ret = []
  if(!result['results']) {
    return ret;
  }

  console.log(data.length)
  while(i < data.length) {
    if(data[i]['id'] == null || data[i]['poster_path'] == null) {
      i++;
      continue;
    }
    ret.push({
      id : data[i]['id'],
      title: data[i]['name'],
      poster_path: 'https://image.tmdb.org/t/p/w500' + data[i]['poster_path']
    })
    i++;
  }
  return ret;
}

function moive_detail(result) {
  // data = result;
  // i = 0

  // console.log(data.length)
  // ret = []
  // while(i < data.length) {
    
  //   ret.push({
  //     title : data[i]['title'],
  //     geners: data[i]['geners'],
  //     spoken_languages: data[i]['spoken_languages'],
  //     release_date: data[i]['release_date'],
  //     runtime: data[i]['runtime'],
  //     overview: data[i]['overview'],
  //     vote_average: data[i]['vote_average'],
  //     tagline: data[i]['tagline']
  //   })
  //   i++;
  // }
  console.log("Movie detail success!");
  ret = [];
  if(result['spoken_languages'].length == 0) {
    result['spoken_languages'] = [{'english_name':'N/A'}];;
  }
  if(result['runtime'] == null) {
    result['runtime'] = "N/A hrs"
  } else {
    var hourTime = parseInt((result['runtime'])/60);
    var minuteTime = parseInt((result['runtime'])%60);
    if(hourTime == 0) {
      result['runtime'] =String(minuteTime) + "mins";
    }else if(hourTime == 1) {
      if(minuteTime == 1) {
        result['runtime'] =String(hourTime) + "hr " + String(minuteTime) + "min";
      } else {
        result['runtime'] =String(hourTime) + "hr " + String(minuteTime) + "mins";
      }
    }else{
      if(minuteTime == 1) {
        result['runtime'] =String(hourTime) + "hrs "+ String(minuteTime) + "min";
      } else {
        result['runtime'] =String(hourTime) + "hrs " + String(minuteTime) + "mins";
      }
    }
    // if(minuteTime == 0) {
    //   if(hourTime == 1) {
    //     result['runtime'] =String(hourTime) + "hr";
    //   } else {
    //     result['runtime'] =String(hourTime) + "hrs";
    //   }
    // } else if(minuteTime == 1){
    //   if(hourTime == 1) {
    //     result['runtime'] =String(hourTime) + "hr " + String(minuteTime) + "min";
    //   } else {
    //     result['runtime'] =String(hourTime) + "hrs "+ String(minuteTime) + "min";
    //   }
    // } else {
    //   if(hourTime == 1) {
    //     result['runtime'] =String(hourTime) + "hr " + String(minuteTime) + "mins";
    //   } else {
    //     result['runtime'] =String(hourTime) + "hrs " + String(minuteTime) + "mins";
    //   }
    // }
  }
  if(!result['release_date']) {
    result['release_date'] == "0000-00-00"
  }
  ret.push({
    title : result['title'],
    genres: result['genres'],
    spoken_languages: result['spoken_languages'].map(item =>{return " "+item['english_name']}),
    release_date: result['release_date'],
    runtime: result['runtime'],
    overview: result['overview'],
    vote_average: result['vote_average'],
    tagline: result['tagline']
  });
  return ret;
}

function moive_cast(result) {
  data = result['cast'];
  i = 0
  ret = []
  if(!result['cast']) {
    return ret;
  }

  console.log(data.length)
  while(i < data.length) {
    // var resObj = {};
    // if(!data[i]['profile_path']) {
    //   i++;
    //   continue;
    // }
    if(data[i]['profile_path'] == null) {
      i++;
      continue;
    }
    // console.log(data[i]['title']);
    
    ret.push({
      id : data[i]['id'],
      name: data[i]['name'],
      character: data[i]['character'],
      profile_path: 'https://image.tmdb.org/t/p/w500' + data[i]['profile_path'],
    })
    i++;
  }
  return ret;
}

function moive_review(result) {
  data = result['results'];
  i = 0
  count = 0;
  ret = []
  if(!result['results']) {
    return ret;
  }

  console.log(data.length)
  while(i < data.length && count < 10) {
    // var resObj = {};
    if(data[i]['author_details']['avatar_path'] == null) {
      data[i]['author_details']['avatar_path'] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
    } else {
      if(data[i]['author_details']['avatar_path'].indexOf("http") == -1) {
        data[i]['author_details']['avatar_path'] = "https://image.tmdb.org/t/p/original" + data[i]['author_details']['avatar_path'];
      } else if(data[i]['author_details']['avatar_path'].indexOf("/http") == 0) {
        const length = data[i]['author_details']['avatar_path'].length;
        data[i]['author_details']['avatar_path'] = data[i]['author_details']['avatar_path'].substr(1, length-1);
      }
    }
    if(data[i]['author_details']['rating'] == null || data[i]['author_details']['rating'] == 0) {
      data[i]['author_details']['rating'] = 0;
    }
    
    ret.push({
      author : data[i]['author'],
      content: data[i]['content'],
      created_at: data[i]['created_at'],
      url: data[i]['url'],
      rating: data[i]['author_details']['rating'],
      avatar_path: data[i]['author_details']['avatar_path']
    })
    i++;
    count++;
  }
  return ret;
}

function moive_video(result) {
  data = result['results'];
  i = 0
  count = 0
  ret = []
  find = false;
  find_teaser = false;

  if(!result['results']) {
    return ret;
  }

  if(data.length == 0) {
    ret.push({
      site : "N/A",
      type: "N/A",
      name: "N/A",
      key: "tzkWB85ULJY",
    });
    return ret;
  }

  for(i = 0;i < data.length;i++) {
    if(data[i]['type'] == "Trailer" && data[i]['site'] == "YouTube") {
      find = true;
      ret.push({
        site : data[i]['site'],
        type: data[i]['type'],
        name: data[i]['name'],
        key: data[i]['key'],
      });
      break;
    }
  }
  if(!find){
    for(i = 0;i < data.length;i++) {
      if(data[i]['type'] == "Teaser" && data[i]['site'] == "YouTube") {
        find_teaser = true;
        ret.push({
          site : data[i]['site'],
          type: data[i]['type'],
          name: data[i]['name'],
          key: data[i]['key'],
        });
        break;
      }
    }
  }
  if(!find && !find_teaser){
    ret.push({
      site : "YouTube",
      type: "Teaser",
      name: "Teaser",
      key: "tzkWB85ULJY",
    });
  }
  return ret;

  // while(i < data.length && count < 1) {
  //   if(!data[i]['key']) {
  //     data[i]['key'] = "tzkWB85ULJY"
  //   }
    
  //   ret.push({
  //     site : data[i]['site'],
  //     type: data[i]['type'],
  //     name: data[i]['name'],
  //     key: data[i]['key'],
  //   })
  //   i++;
  //   count++;
  // }
  // return ret;
}

function tv_detail(result) {
  console.log("Tv detail success!");
  ret = [];
  if(result['spoken_languages'].length == 0) {
    result['spoken_languages'] = [{'english_name':'N/A'}];
  }
  if(!result['first_air_date']) {
    result['first_air_date'] == "0000-00-00"
  }
  ret.push({
    title : result['name'],
    genres: result['genres'],
    spoken_languages: result['spoken_languages'].map(item =>{return " "+item['english_name']}),
    first_air_date: result['first_air_date'],
    episode_run_time: result['episode_run_time'],
    overview: result['overview'],
    vote_average: result['vote_average'],
    tagline: result['tagline']
  });
  return ret;
}

function cast_detail(result) {
  console.log("Cast detail success!");
  ret = [];
  if(result['gender'] == 1) {
    result['gender'] = "Female";
  } else if(result['gender'] == 2) {
    result['gender'] = "Male";
  } else {
    result['gender'] = "Secret";
  }

  if(result['homepage'] != null) {
    if(result['homepage'].indexOf("/http") == 0) {
      const length = result['homepage'].length;
      result['homepage'] = result['homepage'].substr(1, length-1);
    }
  }
  ret.push({
    birthday : result['birthday'],
    gender: result['gender'],
    name: result['name'],
    place_of_birth: result['place_of_birth'],
    homepage: result['homepage'],
    also_known_as: result['also_known_as'],
    known_for_department: result['known_for_department'],
    biography: result['biography'],
  });
  return ret;
}

function cast_externalID(result) {
  console.log("Cast external IDs success!");
  ret = [];
  // if(result['gender'] == 1) {
  //   result['gender'] = "female";
  // } else if(result['gender'] == 2) {
  //   result['gender'] = "male";
  // } else {
  //   result['gender'] = "secret";
  // }

  // if(data[i]['homepage'].indexOf("/http") == 0) {
  //   const length = data[i]['homepage'].length;
  //   data[i]['homepage'] = data[i]['homepage'].substr(1, length-1);
  // }
  ret.push({
    imdb_id : result['imdb_id'],
    facebook_id: result['facebook_id'],
    instagram_id: result['instagram_id'],
    twitter_id: result['twitter_id']
  });
  return ret;
}

// module.exports = { parse_current};
module.exports.search_result = search_result;
module.exports.parse_current = parse_current;
module.exports.parse_movie = parse_movie;
module.exports.parse_tv = parse_tv;

module.exports.moive_detail = moive_detail;
module.exports.moive_cast = moive_cast;
module.exports.moive_review = moive_review;
module.exports.moive_video = moive_video;
module.exports.tv_detail = tv_detail;

module.exports.cast_detail = cast_detail;
module.exports.cast_externalID = cast_externalID;