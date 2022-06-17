#! /usr/bin/env node

// eslint-disable-next-line no-console
console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

const userArgs = process.argv.slice(2);

const async = require('async');
const mongoose = require('mongoose');
const faker = require('@faker-js/faker');
const User = require('./models/Users');
const Post = require('./models/Posts');
// eslint-disable-next-line no-undef
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];
const posts = [];

const createUser = (cb) => {
  const username = faker.faker.internet.userName();
  const password = faker.faker.internet.password();
  const email = faker.faker.internet.exampleEmail();
  const profilePicUrl = faker.faker.image.people();
  const bio = faker.faker.lorem.words(100);

  const details = {
    username,
    password,
    email,
    profilePicUrl,
    bio,
  };
  const user = new User(details);
  user.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    users.push(user);
    cb(null, user);
  });
};

const createPost = (author, cb) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = author._id;
  const message = faker.faker.lorem.words(150);
  const image = faker.faker.image.abstract();

  const postDetails = {
    author: user,
    message,
    image,
  };
  const newPost = new Post(postDetails);
  newPost.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('new post', newPost);
    posts.push(newPost);
    cb(null, newPost);
  });
};

// const createFriends = (requester, recipient) => {
//   const req = requester._id;
//   const recip = recipient._id;
//   const num = Math.round(Math.random() * 3);
//   let friend = new Friends({
//     requester: req,
//     recipient:recip,
//     status:
//   })

// };

// Increase this to make it have more users
const createUserInstances = (cb) => {
  async.parallel([
    (callback) => {
      createUser(callback);
    },
    (callback) => {
      createUser(callback);
    },
  ], cb);
};

const createPostInstances = (cb) => {
  async.parallel([
    (callback) => {
      createPost(users[0], callback);
    },
    (callback) => {
      createPost(users[1], callback);
    },
    // (callback) => {
    //   createPost(users[2], callback);
    // },
    // (callback) => {
    //   createPost(users[3], callback);
    // },
    // (callback) => {
    //   createPost(users[4], callback);
    // },
    // (callback) => {
    //   createPost(users[5], callback);
    // },
    // (callback) => {
    //   createPost(users[6], callback);
    // },
    // (callback) => {
    //   createPost(users[7], callback);
    // },
    // (callback) => {
    //   createPost(users[8], callback);
    // },
    // (callback) => {
    //   createPost(users[9], callback);
    // },
    // (callback) => {
    //   createPost(users[10], callback);
    // },
    // (callback) => {
    //   createPost(users[11], callback);
    // },
    // (callback) => {
    //   createPost(users[12], callback);
    // },
    // (callback) => {
    //   createPost(users[13], callback);
    // },
    // (callback) => {
    //   createPost(users[14], callback);
    // },
    // (callback) => {
    //   createPost(users[15], callback);
    // },
    // (callback) => {
    //   createPost(users[16], callback);
    // },
    // (callback) => {
    //   createPost(users[17], callback);
    // },
    // (callback) => {
    //   createPost(users[18], callback);
    // },
    // (callback) => {
    //   createPost(users[19], callback);
    // },
  ], cb);
};

async.series(
  [createUserInstances,
    createPostInstances,
  ],
  // eslint-disable-next-line no-unused-vars
  (err, results) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Final error', err);
    } else {
    // eslint-disable-next-line no-console
      console.log('users', users);
    }
    mongoose.connection.close();
  },
);
