import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

import classes from './style';

export default function Page ()
{
  const [count, setCount] = useState(0);

  function onClick ()
  {
    setCount(e => e + 1);
  }

  console.log(classes);

  return html`
  <h1 class="${classes.title}" >
    # Contact
  </h1>
  <button onclick="${onClick}" >
    CLICK ME !!!
  </button>
  <pre>
    Count: ${count}
  </pre>
  <ul>
    <li>
      <a href="/" >
        Index
      </a>
    </li>
    <li>
      <a href="/about" >
        About
      </a>
    </li>
  </ul>
  `;
}