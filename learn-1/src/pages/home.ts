import { html } from 'htm/preact';

export default function Page ()
{
  return html`
  <h1>
    # Index
  </h1>
  <ul>
    <li>
      <a href="/contact" >
        Contact
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