import { html, Component } from 'htm/preact';

export default class Page extends Component {
  timer: NodeJS.Timeout = undefined;
  state: {
    count: number;
    time: number;
  };

  constructor() {
    super();

    this.state = {
      count: 0,
      time: Date.now(),
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onClick () {
    this.setState({ count: this.state.count + 1 });
  }

  render () {
    const time = new Date(this.state.time).toLocaleTimeString();

    return html`
    <h1>
      # Index ${time}
    </h1>
    <button onclick="${this.onClick}" >
      ${this.state.count}
    </button>
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
}