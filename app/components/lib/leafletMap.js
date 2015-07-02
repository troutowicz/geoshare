export default {
  componentWillMount() {
    this._leafletEvents = this.extractLeafletEvents(this.props);
  },

  componentDidMount() {
    this.bindLeafletEvents(this._leafletEvents);
    this.props.map.addLayer(this.leafletElement);
  },

  componentWillReceiveProps(nextProps) {
    const next = this.extractLeafletEvents(nextProps);
    this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents);
  },

  componentWillUnmount() {
    const el = this.leafletElement;
    if (!el) {
      return;
    }

    Object.keys(this._leafletEvents).forEach((ev) => {
      el.off(ev, this._leafletEvents[ev]);
    });

    this.props.map.removeLayer(this.leafletElement);
  },
};
