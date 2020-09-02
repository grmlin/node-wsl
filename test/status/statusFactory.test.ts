import MockDate from 'mockdate';
import { createStatus } from '../../source/status/statusFactory';

describe('statusFactory', () => {
  beforeEach(() => {
    MockDate.set('2000-01-01');
  });
  afterAll(() => {
    MockDate.reset();
  });
  test('creates a status object', () => {
    const status = createStatus([
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
    ]);
    expect(status).toEqual({
      createdAt: '2000-01-01T00:00:00.000Z',
      distributions: [
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
      ],
      runningDistributions: [
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
          running: true,
          stopped: false,
          name: 'Debian',
          state: 'Running',
          version: '2',
        },
      ],
      stoppedDistributions: [
        {
          default: false,
          running: false,
          stopped: true,
          name: 'kali-linux',
          state: 'Stopped',
          version: '2',
        },
      ],
      defaultDistribution: {
        default: true,
        running: true,
        stopped: false,
        name: 'Ubuntu',
        state: 'Running',
        version: '2',
      },
      total: 3,
      running: 2,
      stopped: 1,
    });
  });

  test('creates a status object without a default distribution', () => {
    const status = createStatus([
      {
        default: false,
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
    ]);
    expect(status).toEqual({
      createdAt: '2000-01-01T00:00:00.000Z',
      distributions: [
        {
          default: false,
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
      ],
      runningDistributions: [
        {
          default: false,
          running: true,
          stopped: false,
          name: 'Ubuntu',
          state: 'Running',
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
      ],
      stoppedDistributions: [
        {
          default: false,
          running: false,
          stopped: true,
          name: 'kali-linux',
          state: 'Stopped',
          version: '2',
        },
      ],
      defaultDistribution: undefined,
      total: 3,
      running: 2,
      stopped: 1,
    });
  });
  test('can return null', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const status = createStatus('not an array');
    expect(status).toBe(null);
  });
});
