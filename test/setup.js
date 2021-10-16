require('jest-fetch-mock').enableMocks();

import { Application } from '@hotwired/stimulus';
import UploaderController from 'index';

const application = Application.start();
application.register('uploader', UploaderController);

global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

global.mockInputFiles = (element, files) => {
  Object.defineProperty(element, 'files', {
    get: () => files
  });
  element.dispatchEvent(new CustomEvent('input'));
}
