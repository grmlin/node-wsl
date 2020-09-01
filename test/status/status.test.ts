import MockDate from 'mockdate';
import { mocked } from 'ts-jest/utils';

jest.mock('../../source/status/statusParser', () => ({
  parse: jest.fn(),
}));
jest.mock('../../source/status/statusParser', () => ({
  parse: jest.fn(),
}));

import mockConsole from 'jest-mock-console';
import { status } from '../../source/status/status';
import { parse } from '../../source/status/statusParser';

describe('status', () => {
  beforeEach(() => {
    MockDate.set('2000-01-01');
  });
  afterAll(() => {
    MockDate.reset();
  });
  const data = [
    {
      default: true,
      running: true,
      stopped: false,
      name: 'Ubuntu',
      state: 'Running',
      version: '2',
    },
    {
      default: false,
      running: false,
      stopped: true,
      name: 'kali-linux',
      state: 'Stopped',
      version: '2',
    },
    {
      default: false,
      running: true,
      stopped: false,
      name: 'Debian',
      state: 'Running',
      version: '2',
    },
  ];

  test('returns the current status of the wsl as json', async () => {
    mocked(parse).mockReturnValueOnce(data);
    const result = await status();
    // have a look at the execa mock if you wonder where these values come from
    expect(result).toEqual({
      createdAt: '2000-01-01T00:00:00.000Z',
      defaultDistribution: {
        default: true,
        name: 'Ubuntu',
        running: true,
        state: 'Running',
        stopped: false,
        version: '2',
      },
      distributions: [
        { default: true, name: 'Ubuntu', running: true, state: 'Running', stopped: false, version: '2' },
        { default: false, name: 'kali-linux', running: false, state: 'Stopped', stopped: true, version: '2' },
        { default: false, name: 'Debian', running: true, state: 'Running', stopped: false, version: '2' },
      ],
      running: 2,
      runningDistributions: [
        { default: true, name: 'Ubuntu', running: true, state: 'Running', stopped: false, version: '2' },
        { default: false, name: 'Debian', running: true, state: 'Running', stopped: false, version: '2' },
      ],
      stopped: 1,
      stoppedDistributions: [
        { default: false, name: 'kali-linux', running: false, state: 'Stopped', stopped: true, version: '2' },
      ],
      total: 3,
    });
  });

  test('returns an empty array when the parser does not return an array', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mocked(parse).mockImplementationOnce(undefined);

    const result = await status();
    expect(result).toEqual(null);
  });

  test('returns an empty array when the parser fails', async () => {
    const restoreConsole = mockConsole();
    mocked(parse).mockImplementationOnce(() => {
      throw new Error('error');
    });

    const result = await status();
    expect(result).toEqual(null);
    expect(console.error).toHaveBeenCalled();
    restoreConsole();
  });
});
