const htm = (function() {
  var n = function(e, t, r, u) {
      for (var o = 1; o < t.length; o++) {
        var f = t[o++],
          p = 'number' == typeof f ? r[f] : f
        1 === t[o]
          ? (u[0] = p)
          : 2 === t[o]
            ? ((u[1] = u[1] || {})[t[++o]] = p)
            : 3 === t[o]
              ? (u[1] = Object.assign(u[1] || {}, p))
              : u.push(t[o] ? e.apply(null, n(e, p, r, ['', null])) : p)
      }
      return u
    },
    e = function(n) {
      for (
        var e,
          t,
          r = 1,
          u = '',
          o = '',
          f = [0],
          p = function(n) {
            1 === r && (n || (u = u.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))
              ? f.push(n || u, 0)
              : 3 === r && (n || u)
                ? (f.push(n || u, 1), (r = 2))
                : 2 === r && '...' === u && n
                  ? f.push(n, 3)
                  : 2 === r && u && !n
                    ? f.push(!0, 2, u)
                    : 4 === r && t && (f.push(n || u, 2, t), (t = '')),
            (u = '')
          },
          s = 0;
        s < n.length;
        s++
      ) {
        s && (1 === r && p(), p(s))
        for (var i = 0; i < n[s].length; i++)
          (e = n[s][i]),
          1 === r
            ? '<' === e
              ? (p(), (f = [f]), (r = 3))
              : (u += e)
            : o
              ? e === o
                ? (o = '')
                : (u += e)
              : '"' === e || "'" === e
                ? (o = e)
                : '>' === e
                  ? (p(), (r = 1))
                  : r &&
                ('=' === e
                  ? ((r = 4), (t = u), (u = ''))
                  : '/' === e
                    ? (p(),
                    3 === r && (f = f[0]),
                    (r = f),
                    (f = f[0]).push(r, 4),
                    (r = 0))
                    : ' ' === e || '\t' === e || '\n' === e || '\r' === e
                      ? (p(), (r = 2))
                      : (u += e))
      }
      return p(), f
    },
    t = 'function' == typeof Map,
    r = t ? new Map() : {},
    u = t
      ? function(n) {
        var t = r.get(n)
        return t || r.set(n, (t = e(n))), t
      }
      : function(n) {
        for (var t = '', u = 0; u < n.length; u++)
          t += n[u].length + '-' + n[u]
        return r[t] || (r[t] = e(n))
      }
  return function(e) {
    var t = n(this, u(e), arguments, [])
    return t.length > 1 ? t : t[0]
  }
})()

function h(type, props, ...children) {
  return { type, props, children }
}

export default htm.bind(h)
