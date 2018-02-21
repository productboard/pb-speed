const gaussian = require('gaussian');

const { track } = require('./');
// user_id         integer,
//   space_id        integer,
//   action          varchar(40),
//   browser_type    varchar(40),
//   browser_version varchar(40),

// TODO: generate
// duration        integer,

const users = [...Array(10).keys()];
const spaces = [...Array(100).keys()];
const actions = ['load', 'first paint', 'render graph'];
// const browsers = [
// 	{name:'ie',ver:[8,9,10,11]},
// 	{name:'fx',ver:[40,41,42,43]},
// 	{name:'ch',ver:[54,55,56,57,58]},
// 	{name:'sa',ver:[9,10,11]}
// ];

const distribution = gaussian(50, 1000);


// track = async ({ userId, spaceId, action, duration }) => {

actions.forEach(action => {
  // const randomizer = parseInt(Math.random() * 50);
  const randomizer = 50;
  users.forEach(userId => {
    spaces.forEach(spaceId => {
      const duration = parseInt(Math.abs(distribution.ppf(Math.random())) * randomizer);

      track({
        userId, spaceId, action, duration,
      });
    });
  });
});


