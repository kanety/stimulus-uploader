describe('basic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="uploader"
           data-uploader-url-value="/post"
           data-uploader-params-value='{"key":"value"}'>
        <input type="file" name="file" multiple="true" data-action="uploader#run">
      </div>
    `;
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponses(['OK', { status: 200 }], ['OK', { status: 200 }]);
  });

  let messages = [];
  beforeEach((done) => {
    $('[data-controller="uploader"]').addEventListener('uploader:done', e => {
      messages.push(e.detail.file.name);
    });
    $('[data-controller="uploader"]').addEventListener('uploader:after', e => {
      done();
    });
    mockInputFiles($('input'), [
      { name: 'file1.txt', type: 'text/plain', size: 1 },
      { name: 'file2.txt', type: 'text/plain', size: 1 }
    ]);
  });

  it('uploads files', () => {
    expect(messages).toEqual(['file1.txt', 'file2.txt']);
  });
});
