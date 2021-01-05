import css from '@wirunekaewjai/css';

export default css`
module-container {
  padding: 8px;
}

@media screen and (min-width: 768px) {
  module-container {
    padding: 16px 24px;
  }
}

@media screen and (min-width: 992px) {
  module-container {
    padding: 24px 32px;
  }
}
`;