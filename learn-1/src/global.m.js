import css from '@wirunekaewjai/css';

export const entry = 'styles';
export default css`
*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;

  line-height: 1.15;
}

body {
  font-family: 'Sarabun', Helvetica, Arial, sans-serif;
  background: white;
  margin: 0;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}

b,
strong {
	font-weight: bolder;
}

small {
	font-size: 80%;
}

button,
input,
optgroup,
select,
textarea {
	font-family: inherit;
	font-size: 100%;
  line-height: 1.15;
  
	margin: 0;
}

button,
select {
	text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
	-webkit-appearance: button;
}
`;