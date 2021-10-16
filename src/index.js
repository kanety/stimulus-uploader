import { Controller } from '@hotwired/stimulus';
import './index.scss';

export default class extends Controller {
  static targets = ['progress'];
  static values = {
    url: String,
    method: { type: String, default: 'post' },
    params: { type: Object, default: {} },
    fetchOptions: { type: Object, default: {} }
  };

  static params = {};
  static fetchOptions = {};
  static template = '<div class="st-uploader__progress">' +
    '<span class="st-uploader__progress-name"></span>' +
    '<span class="st-uploader__progress-value"></span>' +
    '</div>';

  get input() {
    return this.element.querySelector('input[type=file]');
  }

  run(e) {
    this.upload(e.target.files);
    e.target.value = '';
  }

  upload(files) {
    this.input.disabled = true;

    files = Array.from(files);
    this.before(files);

    Promise.all(
      Array.from(files).map((file, i) => this.uploadFile(file, i))
    ).then(() => {
      this.after(files);
      this.input.disabled = false;
    });
  }

  uploadFile(file, index) {
    return new Promise(resolve => {
      this.start(file, index);

      fetch(this.urlValue, Object.assign({
        method: this.methodValue,
        body: this.buildFormData(file),
        }, this.constructor.fetchOptions, this.fetchOptionsValue)
      ).then(response => {
        if (response.ok) {
          this.done(file, index, response);
        } else {
          this.fail(file, index, response);
        }
      }).catch(error => {
        this.fail(file, index, error);
      }).then(() => {
        this.end(file, index);
        resolve();
      });
    });
  }

  before(files) {
    if (this.hasProgressTarget) {
      files.forEach((file, index) => {
        this.progressTarget.append(this.createProgress(file, index));
      });
    }

    this.dispatch('before', { detail: { files: files } });
  }

  after(files) {
    this.dispatch('after', { detail: { files: files } });
  }

  start(file, index) {
    this.dispatch('start', { detail: { file: file, index: index } });
  }

  done(file, index, response) {
    this.dispatch('done', { detail: { file: file, index: index, response: response } });
  }

  fail(file, index, error) {
    this.dispatch('fail', { detail: { file: file, index: index, error: error } });
  }

  end(file, index) {
    if (this.hasProgressTarget) {
      let progress = this.findProgress(index);
      if (progress) progress.remove();
    }
    this.dispatch('end', { detail: { file: file, index: index } });
  }

  createProgress(file, index, value = '...') {
    var tmp = document.createElement('div');
    tmp.innerHTML = this.constructor.template;
    let node = tmp.firstChild;
    node.setAttribute('data-uploader-index', index)
    node.querySelector('.st-uploader__progress-name').innerHTML = file.name;
    node.querySelector('.st-uploader__progress-value').innerHTML = value;
    return node;
  }

  findProgress(index) {
    return this.progressTarget.querySelector(`[data-uploader-index="${index}"]`);
  }

  buildFormData(file) {
    let data = new FormData();
    data.append(this.input.name, file);

    let params = Object.assign({},
      this.constructor.resolveParams(this.constructor.params),
      this.constructor.resolveParams(this.paramsValue)
    );
    for (let key in params) {
      data.append(key, params[key]);
    }
    return data;
  }

  static resolveParams(params) {
    let data = {}

    switch (Object.prototype.toString.call(params)) {
      case '[object Function]':
        data = params();
        break;
      case '[object Array]':
      params.forEach((item)=> {
        data[item.name] = item.value;
      });
      break;
    case '[object Object]':
      Object.assign(data, params);
      break;
    }

    return data;
  }
}
