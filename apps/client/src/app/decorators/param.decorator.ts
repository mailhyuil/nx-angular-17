export function FieldDecorator() {
  return function (target: any, propertyKey: string) {
    // * view에 사용하는 변수에는 적용하지 말자, 계속 호출되기 때문에
    let _value: any; // 값을 저장할 변수

    Object.defineProperty(target, propertyKey, {
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
  };
}
