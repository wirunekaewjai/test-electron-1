import css from '@wirunekaewjai/css';

export default css`
module-row:not(:last-child),
module-row:first-child {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d9d9d9;
}

module-hover:hover {
  background-color: rgba(0,0,0, 0.08);
}
`;