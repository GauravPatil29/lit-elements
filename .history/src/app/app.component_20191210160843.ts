import { LitElement, html, customElement, css } from "lit-element";
import "./components/userList.component";
import "./components/addUser.component";

@customElement("app-component")
export class AppComponent extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
      .card-outer {
        display: flex;
        justify-content: center;
        min-height: calc(100vh - 40px);
        margin-top: 15px;
      }
      .card {
        box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.7);
        transition: 0.3s;
        width: calc(100% - 20px);
        background-color: rgb(224, 224, 224);
        border-radius: 5px;
      }
    `;
  }

  render() {
    return html`
      <div class="card-outer">
        <div class="card">
          <add-user-component></add-user-component>
          <user-list-component></user-list-component>
        </div>
      </div>
    `;
  }
}
