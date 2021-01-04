import { html } from 'htm/preact';

export default function Page ()
{
  return html`
  <h1>
    # About
  </h1>
  <ul>
    <li>
      <a href="/" >
        Index
      </a>
    </li>
    <li>
      <a href="/contact" >
        Contact
      </a>
    </li>
  </ul>
  `;
}