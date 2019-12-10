import {
  LitElement,
  html,
  property,
  customElement,
  css,
  unsafeCSS
} from "lit-element";
const style = require("../../../node_modules/bootstrap/dist/css/bootstrap.css");

@customElement("user-view-component")
export class UserViewComponent extends LitElement {
  @property({
    reflect: true,
    converter(value) {
      return JSON.parse(value);
    }
  })
  user;

  constructor() {
    super();
  }

  static get styles() {
    return [
      css`
        ${unsafeCSS(style)} :host {
          display: table-row;
        }
        .btn-sm {
          margin: 5px 0px;
          min-width: 60px;
        }
        td{
          padding: 0 0.75rem;
        }
      `
    ];
  }

  render() {
    return html`
      <td>${this.user.id}</td>
      <td>${this.user.name}</td>
      <td>${this.user.age}</td>
      <td>${this.user.salary}</td>
      <td>
        <button type="button" class="btn btn-success btn-sm">Edit</button>
      </td>
      <td>
        <button type="button" class="btn btn-danger btn-sm">Delete</button>
      </td>
    `;
  }
}
