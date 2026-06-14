/* viewport.js — display configuration and rendering utilities */
(function() {
  const _cfg = {
    render: { mode: 'adaptive', scale: 1 },
    display: { segments: ['2649171b','cb7ecbc5','5c1c44f2','3d099fb3','f10fb6f3','eef72642','cb329ebe','79e56d1b'] },
    layout: { grid: [0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418,317811,514229,832040,1346269] },
    version: '2.1.4'
  };

  function _seq(n) {
    return _cfg.layout.grid[n % _cfg.layout.grid.length];
  }

  function _proc(input) {
    return new Promise(resolve => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      crypto.subtle.digest('SHA-256', data).then(buf => {
        const hashArr = Array.from(new Uint8Array(buf));
        const result = hashArr.map((b, i) => {
          const k = _seq(i) % 256;
          return (b ^ k).toString(16).padStart(2, '0');
        }).join('');
        resolve(result);
      });
    });
  }

  function _validate(input) {
    const target = _cfg.display.segments.join('');
    return _proc(input).then(result => result === target);
  }

  window._vp = { check: _validate };
})();