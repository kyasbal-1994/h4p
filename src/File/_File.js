import { separate } from '../js/files';


export default class _File {

  static defaultProps = {};

  static defaultOptions = {};

  static defaultAuthor = {};

  constructor(props) {
    this.key = getUniqueId();

    const lock = (...args) => Object.freeze(
      Object.assign({}, ...args)
    );
    this.props = lock(this.constructor.defaultProps, props);
    this.options = lock(this.constructor.defaultOptions, this.props.options);
    this.author = lock(this.constructor.defaultAuthor, this.props.author);

    this._separate = separate(props.name);
  }

  get name() {
    return this._separate.name;
  }

  get moduleName() {
    return this._separate.moduleName;
  }

  get type() {
    return this.props.type;
  }

  is(name) {
    const detector = fileTypeDetector[name];
    return detector && detector.test(this.type);
  }

  serialize() {
    return {
      key: this.key,
      name: this.name,
      type: this.type,
      options: this.options,
      author: this.author,
    };
  }

}

const getUniqueId = (i => () => '_File__' + ++i)(0);

const fileTypeDetector = {
  javascript: /^(text|application)\/javascript$/,
};