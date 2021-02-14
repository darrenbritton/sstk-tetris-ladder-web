const constants = {
  serverUrl: (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'localhost:8080' : 'sstk-tetris-ladder.herokuapp.com'  // eslint-disable-line
};

export default constants;
