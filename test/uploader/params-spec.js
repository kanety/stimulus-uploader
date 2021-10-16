import UploaderController from 'index';

describe('params', () => {
  it('set array', () => {
    let params = UploaderController.resolveParams([{name: 'name', value: 'value' }]);
    expect(params['name']).toEqual('value');
  });

  it('set object', () => {
    let params = UploaderController.resolveParams({ name: 'value' });
    expect(params['name']).toEqual('value');
  });

  it('set function', () => {
    let params = UploaderController.resolveParams(() => {
      return { 'name': 'value' };
    });
    expect(params['name']).toEqual('value');
  });
});
