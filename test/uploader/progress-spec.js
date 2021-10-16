describe('progress', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="uploader"
           data-uploader-url-value="/post">
        <input type="file" name="file" multiple="true" data-action="uploader#run">
        <div data-uploader-target="progress"></div>
      </div>
    `;
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponses(['OK', { status: 200 }]);
  });

  let messages = [];
  beforeEach((done) => {
    $('[data-controller="uploader"]').addEventListener('uploader:start', e => {
      messages.push($('[data-uploader-target="progress"]').textContent.trim());
    });
    $('[data-controller="uploader"]').addEventListener('uploader:end', e => {
      messages.push($('[data-uploader-target="progress"]').textContent.trim());
    });
    $('[data-controller="uploader"]').addEventListener('uploader:after', e => {
      done();
    });
    mockInputFiles($('input'), [
      { name: 'file1.txt', type: 'text/plain', size: 1 }
    ]);
  });

  it('uploads files', () => {
    expect(messages).toEqual(['file1.txt...', '']);
  });
});
