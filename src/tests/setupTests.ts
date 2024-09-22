import '@testing-library/jest-dom';

beforeAll(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});

afterAll(() => {
  const root = document.getElementById('root');
  if (root) {
    document.body.removeChild(root);
  }
});
