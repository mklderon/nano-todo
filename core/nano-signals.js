let currentObserver = null;
const pending = new Set();
let flushScheduled = false;

const scheduleFlush = () => {
  if (flushScheduled) return;
  flushScheduled = true;
  Promise.resolve().then(flush);
};

function flush() {
  flushScheduled = false;
  pending.forEach(e => e.execute());
  pending.clear();
}

export function signal(value) {
  const subs = new Set();
  const s = {
    _value: value,
    get value() {
      if (currentObserver) {
        subs.add(currentObserver);
        if (currentObserver.deps) currentObserver.deps.add(s);
      }
      return s._value;
    },
    set value(v) {
      if (Object.is(v, s._value)) return;
      s._value = v;
      subs.forEach(sub => sub.mark?.());
    }
  };
  return s;
}

export function computed(fn) {
  let cached;
  let dirty = true;
  const subs = new Set();

  const c = {
    get value() {
      if (dirty) {
        const prev = currentObserver;
        currentObserver = c;
        cached = fn();
        currentObserver = prev;
        dirty = false;
      }
      if (currentObserver) subs.add(currentObserver);
      return cached;
    },
    mark() {
      if (!dirty) {
        dirty = true;
        subs.forEach(sub => sub.mark?.());
      }
    }
  };
  return c;
}

export function effect(fn) {
  const e = {
    deps: new Set(),
    execute() {
      pending.delete(e);
      const prev = currentObserver;
      currentObserver = e;
      e.deps.forEach(dep => {
        if (dep._subs) dep._subs.delete?.(e);
      });
      e.deps.clear();
      fn();
      currentObserver = prev;
    },
    mark() {
      pending.add(e);
      scheduleFlush();
    }
  };
  e.execute();
  return () => {
    pending.delete(e);
    e.deps.forEach(dep => {
      if (dep._subs) dep._subs.delete?.(e);
    });
  };
}

export function batch(fn) {
  const wasScheduled = flushScheduled;
  flushScheduled = true;
  fn();
  flushScheduled = wasScheduled;
  if (!flushScheduled) flush();
}