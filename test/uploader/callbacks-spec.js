describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="uploader"
           data-uploader-url-value="/post">
        <input type="file" name="file" multiple="true" data-action="uploader#run">
      </div>
    `;
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponses(['OK', { status: 200 }]);
  });

  let messages = [];
  beforeEach((done) => {
    $('[data-controller="uploader"]').addEventListener('uploader:before', e => {
      messages.push('before');
    });
    $('[data-controller="uploader"]').addEventListener('uploader:after', e => {
      messages.push('after');
      done();
    });
    $('[data-controller="uploader"]').addEventListener('uploader:start', e => {
      messages.push('start');
    });
    $('[data-controller="uploader"]').addEventListener('uploader:end', e => {
      messages.push('end');
    });
    $('[data-controller="uploader"]').addEventListener('uploader:done', e => {
      messages.push('done');
    });
    $('[data-controller="uploader"]').addEventListener('uploader:fail', e => {
      messages.push('fail');
    });
    mockInputFiles($('input'), [
      { name: 'file1.txt', type: 'text/plain', size: 1 }
    ]);
  });

  it('runs callbacks', () => {
    expect(messages).toEqual(['before', 'start', 'done', 'end', 'after']);
  });
});
