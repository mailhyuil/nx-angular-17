export function log(arg?: any) {
  return function (target: any) {
    console.log('Hello from Decorator');

    Object.defineProperty(target.prototype, 'value1', {
      value: 100,
      writable: false,
    });

    Object.defineProperty(target.prototype, 'value2', {
      value: 200,
      writable: false,
    });
  };
}

export function simpleDecorator(target: any) {
  console.log('Hello from Decorator');

  Object.defineProperty(target.prototype, 'value1', {
    value: 100,
    writable: false,
  });

  Object.defineProperty(target.prototype, 'value2', {
    value: 200,
    writable: false,
  });
}
