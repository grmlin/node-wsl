/* global describe, test, expect */

const { parse } = require('../../lib/status/statusParser');

describe('statusParser', () => {
  test('parses the distro list', () => {
    expect(
      parse(`  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  kali-linux             Stopped         2
  Debian                 Running         2
          `)
    ).toEqual([
      {
        default: true,
        running: true,
        stopped: false,
        name: 'Ubuntu',
        state: 'Running',
        version: '2'
      },
      {
        default: false,
        running: false,
        stopped: true,
        name: 'kali-linux',
        state: 'Stopped',
        version: '2'
      },
      {
        default: false,
        running: true,
        stopped: false,
        name: 'Debian',
        state: 'Running',
        version: '2'
      }
    ]);
  });
  test('fails easily', () => {
    expect(() => {
      parse(1234);
    }).toThrow();
    expect(() => {
      parse();
    }).toThrow();
    expect(parse('a string that doesnt make any sense')).toEqual([]);
  });
});
