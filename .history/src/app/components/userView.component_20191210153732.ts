import { LitElement, html, customElement, css, unsafeCSS, property } from "lit-element";
const style = require("../../../node_modules/bootstrap/dist/css/bootstrap.css");

@customElement("user-view-component")
export class UserViewComponent extends LitElement {
  @property({
    reflect: true
  })
  username;

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
        td {
          padding: 0 0.75rem;
        }
      `
    ];
  }

  render() {
    return html`
      <td><slot name="id"></slot></td>
      <td><slot name="name"></slot></td>
      <td><slot name="age"></slot></td>
      <td><slot name="salary"></slot></td>
      <td>
        <button
          type="button"
          class="btn btn-success btn-sm"
          @click="${this.editUserRecord}"
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="${this.deleteUserRecord}"
        >
          Delete
        </button>
      </td>
    `;
  }

  editUserRecord(e) {
    console.log(e);
    //this.username
    const eventObj = {
      identifer: "",
      channel: "onchange",
      data: {
        id: 1
      }
    };
  }

  deleteUserRecord(e) {
    console.log(e);
  }
}
