const EVENTS_RE = /on(?:Leaflet)?(.+)/i;

export default {
  getLeafletElement() {
    return this.leafletElement;
  },

  extractLeafletEvents(props) {
    return Object.keys(props).reduce((res, ev) => {
      if (EVENTS_RE.test(ev)) {
        const key = ev.replace(EVENTS_RE, (match, p) => p.toLowerCase());
        res[key] = props[ev];
      }

      return res;
    }, {});
  },

  bindLeafletEvents(next = {}, prev = {}) {
    const el = this.leafletElement;

    if (!el) {
      return undefined;
    }

    const diff = Object.assign({}, prev);

    Object.keys(prev).forEach((ev) => {
      if (!next[ev] || prev[ev] !== next[ev]) {
        delete diff[ev];
        el.off(ev, prev[ev]);
      }
    });

    Object.keys(next).forEach((ev) => {
      if (!prev[ev] || next[ev] !== prev[ev]) {
        diff[ev] = next[ev];
        el.on(ev, next[ev]);
      }
    });

    return diff;
  },

  fireLeafletEvent(type, data) {
    const el = this.leafletElement;

    if (el) {
      el.fire(type, data);
    }
  },
};
