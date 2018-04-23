import { eventToAction, isFunction, isSocketIo, unwrapIfSingle } from '../';

describe('.eventToAction()', () => {
  it('should be a function', () => {
    expect(eventToAction).toEqual(expect.any(Function));
  });

  it('should correctly convert socket event name to camelcased action name', () => {
    expect(eventToAction('SOCKET_USER_MESSAGE')).toBe('socket_userMessage');
    expect(eventToAction('SOCKET_userMessage')).toBe('socket_userMessage');
    expect(eventToAction('SOCKET_UserMessage')).toBe('socket_userMessage');
    expect(eventToAction('SOCKET_user-message')).toBe('socket_userMessage');
  });

  it('should add `socket_` prefix to action', () => {
    expect(eventToAction('message')).toBe('socket_message');
    expect(eventToAction('USER_MESSAGE')).toBe('socket_userMessage');
  });
});

describe('.isFunction()', () => {
  it('should return false for value other than function', () => {
    [undefined, null, '', true, NaN, 42, {}, []]
      .forEach((val) => {
        expect(isFunction(val)).toBe(false);
      });
  });

  it('should return true for arrow function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('should return true for common function', () => {
    // eslint-disable-next-line prefer-arrow-callback
    expect(isFunction(function test() {})).toBe(true);
  });

  it('should return true for class', () => {
    class Test {}
    expect(isFunction(Test)).toBe(true);
  });
});

describe('.isSocketIo()', () => {
  it('should return false for value with no socket.io client interface', () => {
    [undefined, null, '', true, NaN, 42, {}, []]
      .forEach((val) => {
        expect(isSocketIo(val)).toBe(false);
      });
  });

  it('should return true for object with socket.io client interface', () => {
    const socket = { on: jest.fn(), emit: jest.fn() };
    expect(isSocketIo(socket)).toBe(true);
  });
});

describe('.unwrapIfSingle()', () => {
  it('should return first item if given array contains only one item', () => {
    expect(unwrapIfSingle([true])).toBe(true);
    expect(unwrapIfSingle([{}])).toEqual({});
    expect(unwrapIfSingle(['test'])).toBe('test');
    expect(unwrapIfSingle([[]])).toEqual([]);
  });

  it('should return undefined if empty array given', () => {
    expect(unwrapIfSingle([])).toBe(undefined);
  });

  it('should return array as-is if it contains more than one argument', () => {
    expect(unwrapIfSingle([undefined, null, '', true, NaN, 42, {}, []]))
      .toEqual([undefined, null, '', true, NaN, 42, {}, []]);
    expect(unwrapIfSingle([{}, []])).toEqual([{}, []]);
  });

  it('should return value as-is if it\'s not an array', () => {
    [undefined, null, '', true, NaN, 42, {}, Symbol('test')]
      .forEach((val) => {
        expect(unwrapIfSingle(val)).toEqual(val);
      });
  });
});
