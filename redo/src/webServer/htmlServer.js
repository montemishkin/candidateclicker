import express from 'express';

// import randomPermutation from 'util/randomPermutation';
// import commafy from 'util/commafy';
// import {Candidate} from 'db';

const server = express();
// server.set('view engine', 'pug');
// server.set('views', './templates');
// server.all('*', (req, res) => {
//   // TODO: call db with timeout. if fails or timeout then respond without filling in db values
//   // make frontend fetch upon load regardless.
//   Candidate.all()
//     .then(candidates => {
//       res.render('index', {
//         candidates: randomPermutation(
//           candidates.map(candidate => {
//             return {
//               name: candidate.name,
//               src: candidate.src,
//               height: candidate.height,
//               width: candidate.width,
//               clicks: commafy(candidate.clicks),
//             };
//           }),
//         ),
//         year: new Date().getFullYear(),
//       });
//     })
//     .catch(() => {
//       // TODO: improve error handling
//       res.send('woops!');
//     });
// });

export default server;
