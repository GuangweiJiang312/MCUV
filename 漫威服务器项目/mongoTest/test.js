let dbPromise = require('../db/index')

let descriptionModel = require('../model/descriptionModel')
let profileModel = require('../model/profileModel')
let alterEgoModel = require('../model/alterEgoModel')
let movieModel = require('../model/movieModel')
let relationshipModel = require('../model/relationshipModel')

let description = require('../assets/character')
let characters = require('../assets/detail')
let alter_ego = require('../assets/alterEgo')
let movies = require('../assets/movie')
let relationship = require('../assets/relationship')

//连接成功后进行的操作
dbPromise.then(() => {
    for(let data in description.description){
        descriptionModel.create({
            id:description.description[data].id,
            description:description.description[data].description,
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
            }else {
                console.log(err);
            }
        })
    }

    for(let data in characters.characters){
        profileModel.create({
            id:characters.characters[data].id,
            affiliation:characters.characters[data].affiliation,
            alias:characters.characters[data].alias,
            full_name:characters.characters[data].full_name,
            has_alter_ego:characters.characters[data].has_alter_ego,
            played_by:characters.characters[data].played_by,
            status:characters.characters[data].status,
            movies:characters.characters[data].movies,
            type:characters.characters[data].type,
            species:characters.characters[data].species,
            name:characters.characters[data].name,
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
            }else {
                console.log(err);
            }
        })
    }

    for(let data in alter_ego.alter_ego){
        alterEgoModel.create({
            id:alter_ego.alter_ego[data].id,
            movie_involved:alter_ego.alter_ego[data].movie_involved,
            name:alter_ego.alter_ego[data].name,
            origin_id:alter_ego.alter_ego[data].origin_id
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
            }else {
                console.log(err);
            }
        })
    }

    for(let data in movies.movies){
        movieModel.create({
            group_id:movies.movies[data].group_id,
            group_name:movies.movies[data].group_name,
            id:movies.movies[data].id,
            index:movies.movies[data].index,
            name:movies.movies[data].name,
            phase:movies.movies[data].phase,
            released:movies.movies[data].released,
            year:movies.movies[data].year
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
            }else {
                console.log(err);
            }
        })
    }

    for(let data in relationship.relationship){
        relationshipModel.create({
            id:relationship.relationship[data].id,
            is_updated_relationship:relationship.relationship[data].is_updated_relationship,
            movie_id:relationship.relationship[data].movie_id,
            relationship:relationship.relationship[data].relationship,
            target_id:relationship.relationship[data].target_id
        },(err,data) => {
            if(!err){
                console.log('插入数据成功');
                console.log(data);
            }else {
                console.log(err);
            }
        })
    }

}).catch((err) => {
    console.log(err);
})

//操作数据库代码