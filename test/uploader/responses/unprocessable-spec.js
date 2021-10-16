describe('unprocessable', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="uploader"
           data-uploader-url-value="/500"
           data-uploader-method-value="post">
        <input type="file" name="file" multiple="true" data-action="uploader#run">
      </div>
    `;
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponses(['Unprocessable Entity', { status: 422 }]);
  });

  let messages = [];
  beforeEach((done) => {
    $('[data-controller="uploader"]').addEventListener('uploader:fail', e => {
      messages.push(e.detail.file.name);
    });
    $('[data-controller="uploader"]').addEventListener('uploader:after', e => {
      done();
    });
    mockInputFiles($('input'), [
      { name: 'file1.txt', type: 'text/plain', size: 1 }
    ]);
  });

  it('uploads files', () => {
    expect(messages).toEqual(['file1.txt']);
  });
});
