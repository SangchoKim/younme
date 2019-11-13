const lex = require('greenlock-express').create({
    version: 'draft-11', 
    configDir: '/etc/letsencrypt', 
    server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
    approveDomains: (opts, certs, cb) => {
      if (certs) {
        opts.domains = ['13.125.221.14'];
      } else {
        opts.email = 'wjdrms1919@gmail.com';
        opts.agreeTos = true;
      }
      cb(null, { options: opts, certs });
    },
    renewWithin: 81 * 24 * 60 * 60 * 1000,
    renewBy: 80 * 24 * 60 * 60 * 1000,
  });
export default lex;
