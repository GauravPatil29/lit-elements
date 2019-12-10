import {
  LitElement,
  html,
  property,
  customElement,
  css,
  unsafeCSS
} from "lit-element";
import "./userView.component";
const style = require("../../../node_modules/bootstrap/dist/css/bootstrap.css");

@customElement("user-list-component")
export class UserListComponent extends LitElement {
  tableData: Array<any> = [];

  constructor() {
    super();
  }

  static get styles() {
    return [
      css`
        ${unsafeCSS(style)}
        .card {
          margin: 10px;
        }
        .table thead > tr > th {
          border-top: none;
        }
        user-view-component {
          border-bottom: 1px solid rgb(222, 226, 230);
        }
        user-view-component:last-child {
          border-bottom: none;
        }
        .card-header {
          font-size: 1.25em;
          font-weight: 500;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          List of Users
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Salary</th>
                <th scope="col" colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              ${this.tableData.map((item: any, index: number) => {
                item.id = index + 1;
                return html`
                  <user-view-component
                    username="${item.name}"
                    @on-edit="${e => }"
                    @on-delete="${e => console.log(e.detail)}"
                  >
                    <span slot="id">${index + 1}</span>
                    <span slot="name">${item.name}</span>
                    <span slot="age">${item.age}</span>
                    <span slot="salary">${item.salary}</span>
                  </user-view-component>
                `;
              })}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  editUserRecord(data: any) {
    console.log(data);
  }

  deleteUserRecord(data: any) {
    console.log(data);
  }
}
