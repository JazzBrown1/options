const Options = require('..');

const _property = true;
const _parent = true;

const useExpressErrorHandler = (r, rr, next, err) => next(err || new Error('Server Error'));
const send401 = { sendStatus: 401 };

const schema = {
  name: { _property, types: ['string'], default: '_default' },
  clientType: { _property, types: ['string'], default: 'client' },
  sessions: {
    _parent,
    useSessions: { _property, types: ['boolean'], default: false },
    deserializeTactic: { _property, enum: ['always', 'never', 'manual'], default: 'always' }, // enums in next ez-options release
    serialize: { _property, types: ['function'], default: (user) => user },
    deserialize: { _property, types: ['function'], default: (user) => user },
  },
  authenticate: {
    _parent,
    extract: { _property, types: ['string', 'function'], default: 'body' },
    getData: { _property, types: ['function'], default: () => ({}) },
    verify: { _property, types: ['function'], default: () => true },
    setUser: { _property, types: ['function'], default: (q, data) => data },
    onError: { _property, types: ['function', 'object'], default: useExpressErrorHandler },
    onFail: { _property, types: ['function', 'object'], default: send401 },
    onSuccess: { _property, types: ['null', 'function', 'object'], default: null },
    selfInit: { _property, types: ['boolean'], default: false },
  },
  init: {
    _parent,
    onError: { _property, types: ['function', 'object'], default: useExpressErrorHandler },
    onSuccess: { _property, types: ['null', 'function', 'object'], default: null },
  },
  checkAuthenticated: {
    _parent,
    onFail: { _property, types: ['function', 'object'], default: send401 },
    onSuccess: { _property, types: ['null', 'function', 'object'], default: null },
    by: { _property, enum: ['any', 'self'], default: 'any' }
  },
  checkUnauthenticated: {
    _parent,
    onFail: { _property, types: ['function', 'object'], default: send401 },
    onSuccess: { _property, types: ['null', 'function', 'object'], default: null },
    by: { _property, enum: ['any', 'self'], default: 'self' }
  },
  checkAuthentication: {
    _parent,
    onFail: { _property, types: ['function', 'object'], default: send401 },
    onSuccess: { _property, types: ['null', 'function', 'object'], default: null },
    by: { _property, enum: ['any', 'self'], default: 'self' },
    check: { _property, types: ['null', 'function'], default: null },
    is: { _property, types: ['boolean'], default: true }
  },
  logout: {
    _parent,
    onSuccess: { _property, types: ['null', 'function', 'object'], default: null },
    of: { _property, enum: ['all', 'self'], default: 'self' },
  }
};

{
  const startTime = Date.now();

  for (let i = 0; i < 10000; i++) {
  // eslint-disable-next-line no-unused-vars
    const options = new Options(schema);
  }

  const elapsedTime = Date.now() - startTime;
  console.log(elapsedTime);
}

{
  const startTime = Date.now();

  const config = { dieHard: true };

  for (let i = 0; i < 10000; i++) {
    // eslint-disable-next-line no-unused-vars
    const options = new Options(schema, config);
  }

  const elapsedTime = Date.now() - startTime;
  console.log(elapsedTime);
}
const findUserByUserName = () => {};

const merge = { // Authentication Model Options
  name: 'password', // This should be unique when using multiple models
  authenticate: {
    extract: 'body', // this will extract req.body for the query can pass a function here (req, done) => done(error, query);
    getData: async (query) => {
      const user = await findUserByUserName(query.username);
      return user;
    },
    verify: (query, user) => user.password && query.password === user.password,
    onFail: (req, res) => res.render('login', { error: 'Password or username did not match! Try again' }), // Accepts a response object or response function
    onSuccess: { redirect: '/' }, // equivalent to "(req, res) => res.redirect('/')"
  },
  sessions: {
    deserializeTactic: 'never', // req.user is an async function that only deserializes user when required
    useSessions: true,
    serialize: (user) => user.username, // don't save passwords in sessions
    deserialize: (username) => findUserByUserName(username),
  },
  logout: {
    onSuccess: { redirect: '/login' }
  },
  checkAuthenticated: {
    onFail: (req, res) => res.redirect('/login')
  },
  checkUnauthenticated: {
    onFail: { redirect: '/' }
  },
};

{
  const options = new Options(schema);
  const startTime = Date.now();

  for (let i = 0; i < 10000; i++) {
    options.merge(merge);
  }

  const elapsedTime = Date.now() - startTime;
  console.log(elapsedTime);
}

{
  const config = { dieHard: true };
  const options = new Options(schema, config);
  const startTime = Date.now();

  for (let i = 0; i < 10000; i++) {
    options.merge(merge);
  }

  const elapsedTime = Date.now() - startTime;
  console.log(elapsedTime);
}
