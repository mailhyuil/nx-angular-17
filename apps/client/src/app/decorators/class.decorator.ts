export function ClassDecorator() {
  return function (target: any) {
    // target은 인스턴스를 가리킨고, target.prototype은 클래스를 가리킨다. target.prototype을 사용해라
    const method = Object.getOwnPropertyDescriptor(
      target.prototype,
      'method_name'
    );
    const field = Object.getOwnPropertyDescriptor(
      target.prototype,
      'field_name'
    );

    if (field) {
      // * view에 사용하는 변수에는 적용하지 말자, 계속 호출되기 때문에
      let _value: any; // 값을 저장할 변수

      Object.defineProperty(target, 'field_name', {
        // field 데코레이터는 실제로 값에 접근할 때 실행된다.
        get: function () {
          console.log('field decorator get');
          return _value; // 값을 가져올 때 _value 반환
        },
        set: function (value: any) {
          console.log('field decorator set');
          _value = value; // 값을 설정할 때 _value에 저장
        },
        enumerable: true,
        configurable: true,
      });
    }

    if (method) {
      const originalMethod = method.value;
      method.value = function (...args: any[]) {
        // this는 클래스의 인스턴스를 가리킨다. ex) 사용 예 this.httpService
        console.log('before logic...');
        const result = originalMethod.apply(this, args);
        console.log('value to return : ', result);
        console.log('after logic...');
        return result;
      };
      // 덮어쓰기
      Object.defineProperty(target.prototype, 'method_name', method);
    }
  };
}
