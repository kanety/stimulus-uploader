# stimulus-uploader

A stimulus controller for simple file uploader.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-uploader --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import UploaderController from '@kanety/stimulus-uploader';

const application = Application.start();
application.register('uploader', UploaderController);
```

Import css:

```css
@import '@kanety/stimulus-uploader';
```

Build html as follows:

```html
<div data-controller="uploader"
     data-uploader-url-value="YOUR_BACKEND_URL">
  <input type="file" name="file" multiple="true">
</div>
```

### Optional targets

#### progress

You can specify element to show progress message as follows:

```html
<div class="st-uploader"
     data-controller="uploader"
     data-uploader-url-value="YOUR_BACKEND_URL">
  <input type="file" name="file" multiple="true">
  <div class="st-uploader__progress" data-uploader-target="progress"></div>
</div>
```

### Options

#### params

Set additional query parameters:

```html
<div data-controller="uploader"
     data-uploader-params-value='{"key":"value"}'>
</div>
```

You can also set global query parameters as follows:

```javascript
import UploaderController from '@kanety/stimulus-uploader';
// set by object
UploaderController.params = { key: 'value' };
// set by function
UploaderController.params = () => {
  return { key: "value" };
}
```

#### fetch-options

Set additional fetch options recognized by fetch API:

```html
<div data-controller="uploader"
     data-uploader-fetch-options-value='{"key":"value"}'>
</div>
```

You can also set global options as follows:

```javascript
import UploaderController from '@kanety/stimulus-uploader';
UploaderController.fetchOptions = { key: 'value' };
```

### Callbacks

Run callbacks when files are uploaded or failed:

```javascript
let element = document.querySelector('[data-controller="uploader"]');
element.addEventListener('uploader:before', e => {
  console.log(e.detail.files);
});
element.addEventListener('uploader:start', e => {
  console.log(e.detail.index + ":" + e.detail.file);
});
element.addEventListener('uploader:done', e => {
  console.log(e.detail.index + ":" + e.detail.file);
});
element.addEventListener('uploader:fail', e => {
  console.log(e.detail.index + ":" + e.detail.file);
});
element.addEventListener('uploader:end', e => {
  console.log(e.detail.index + ":" + e.detail.file);
});
element.addEventListener('uploader:after', e => {
  console.log(e.detail.files);
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
