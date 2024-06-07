const config = {
    jwt: {
      secret: 'kuritza',
      expiresIn: '1h'
    },
    bcrypt: {
      saltRounds: 10
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100 
    }
  };
  
  export default config;
  