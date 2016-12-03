import _File from './_File';


export default class BinaryFile extends _File {

  static defaultProps = {
    blob: null,
  };

  static defaultOptions = {
    isEntryPoint: false,
    isReadOnly: true,
    isTrashed: false,
    noBabel: false,
  }

  static defaultAuthor = {
    name: '',
    url: '',
  };

  static visible = _File.visible.concat(
    'isText',
    'blob',
    'blobURL'
  );

  constructor(props) {
    if (props.blob && !props.blobURL) {
      const blobURL = URL.createObjectURL(props.blob);
      props = Object.assign({}, props, { blobURL });
    }

    super(props);
  }

  get blob() {
    return this.props.blob;
  }

  get blobURL() {
    return this.props.blobURL;
  }

  get isModule() {
    return !this.options.isTrashed && !!this.moduleName;
  }

  get isText() {
    return false;
  }

  set(change) {
    if (change.blob && this.blobURL) {
      URL.revokeObjectURL(this.blobURL);
    }
    const seed = Object.assign(this.serialize(), change);

    return new BinaryFile(seed);
  }

  compose() {
    return new Promise((resolve, reject) => {
      const serialized = this.serialize();
      const reader = new FileReader();
      reader.onload = (e) => {
        const { result } = e.target;
        serialized.composed = result.substr(result.indexOf(',') + 1);
        resolve(serialized);
      };
      reader.readAsDataURL(this.blob);
    });
  }

  /**
   * @param file File|Blob
   * @return Promise gives BinaryFile
   */
  static load(file) {
    return Promise.resolve(
      new BinaryFile({
        type: file.type,
        name: file.name,
        blob: file,
      })
    );
  }

}