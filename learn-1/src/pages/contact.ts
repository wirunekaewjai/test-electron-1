import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

export default function Page ()
{
  const [count, setCount] = useState(0);

  function onClick ()
  {
    setCount(e => e + 1);
  }

  return html`
  <h1>
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