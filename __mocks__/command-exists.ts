/* global jest */

const commandExists = jest.fn((command) => {
  return command;
});

export default commandExists;
