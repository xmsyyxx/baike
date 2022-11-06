class eventBus {
  constructor() {
    this.events = this.events || new Object();
  }
}

eventBus.prototype.emit = function (type, ...args) {
  let e;
  e = this.events[type];
  if (Array.isArray(e)) {
    for (let i = 0; i < e.length; i++) {
      e[i].apply(this, args);
    }
  } else {
    e[0].apply(this, args);
  }
};

eventBus.prototype.on = function (type, fun) {
  const e = this.events[type];

  if (!e) {
    this.events[type] = [fun];
  } else {
    e.push(fun);
  }
};

eventBus.prototype.off = function (type, fun) {
  const e = this.events[type];
  if (Array.isArray(e)) {
    for (let i = 0; i < e.length; i++) {
      if (e[i] === fun) {
        e.splice(i, 1);
        break;
      }
    }
  }
};

const EventBus = new eventBus();
export default EventBus;
