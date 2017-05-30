import PropTypes from 'prop-types';

const addons = {};
let preview;

const registerAddon = async config => {
  await 4;
};
const registerPanel = async config => {
  await validatePanel(config);
};
const registerDecorator = node => Promise.resolve();
const registerBuildExtention = fn => Promise.resolve();
const registerListener = (eventName, fn) => Promise.resolve();
const registerMiddelware = fn => Promise.resolve();

export const getApi = () => ({
  registerAddon,
  registerPanel,
  registerDecorator,
  registerBuildExtention,
  registerListener,
  registerMiddelware,
});

const Panel = {
  title: PropTypes.string.isRequired,
  location: PropTypes.oneOf(['overlay', 'top', 'right', 'bottom', 'left']),
  // needs more thought
};
export const validatePanel = panel => {
  PropTypes.checkPropTypes(Panel, panel, 'config', 'Addon');
};

// -------------------------

/*

const Addon = {
  // addon should have a unique ID
  id: (prop, propName) => Object.keys(addons).indexOf(prop) <= 0,

  // addon should have a name for dev-ease
  name: PropTypes.string.isRequired,

  // setup panel (might want to allow multiple)
  panels: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      location: PropTypes.oneOf(['overlay', 'top', 'right', 'bottom', 'left']),
      // needs more thought
    })
  ),

  // wrapper component for manager UI
  managers: PropTypes.objectOf(PropTypes.node)

  // a wrapper component inside preview
  decorator: PropTypes.node,

  // setup server middleware
  middleware: PropTypes.func,

  // extend webpack (possibly covered by middleware)
  buildExtention: PropTypes.func,

  // setup your
  config: PropTypes.func,

  // hash table of key = eventname , value = func
  callbacks: PropTypes.objectOf(PropTypes.func),
};

export const validate = addon => {
  PropTypes.checkPropTypes(Addon, addon, 'config', 'Addon');
};

export const register = addon =>
  new Promise((resolve, reject) => {
    !validate(addon) ? reject() : resolve();
  });

const registerPending = id => {
  let resolver, rejecter;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });

  addons[id] = {
    resolver,
    rejecter,
    promise,
  };
};

// - get a list or single value
// - if item is string we wait it to be resolved
// - if item is object we inject and wait
// - return promise for all addons requested

export const api = list =>
  Promise.all(
    [].concat(list).map(item => {
      switch (true) {
        case typeof item === 'string' && !addons[item]: {
          return registerPending(item);
        }
        case typeof item === 'object' && !addons[item]: {
          return register(item);
        }
        case typeof item === 'string' && addons[item]: {
          return addons[item].promise;
        }
        case typeof item === 'object' && addons[item]: {
          return Promise.reject(Error(`${item} could not be re-registered`));
        }
        default: {
          return Promise.reject(Error(`${item} could not be registered`));
        }
      }
    })
  );

*/

export class AddonStore {
  constructor() {
    this._loaders = {};
    this._panels = {};
    this._channel = null;
    this._preview = null;
    this._database = null;
  }

  getChannel() {
    return this._channel;
  }

  setChannel(channel) {
    this._channel = channel;
  }

  getPreview() {
    return this._preview;
  }

  setPreview(preview) {
    this._preview = preview;
  }

  getDatabase() {
    return this._database;
  }

  setDatabase(database) {
    this._database = database;
  }

  getPanels() {
    return this._panels;
  }

  addPanel(name, panel) {
    this._panels[name] = panel;
  }

  register(name, loader) {
    this._loaders[name] = loader;
  }

  loadAddons(api) {
    Object.keys(this._loaders).map(name => this._loaders[name]).forEach(loader => loader(api));
  }
}

export default new AddonStore();
