import { LitElement, html, customElement, css, unsafeCSS } from "lit-element";
const style = require("../../../node_modules/bootstrap/dist/css/bootstrap.css");
import "../shared/common.service";

@customElement("add-user-component")
export class AddUserComponent extends LitElement {
  constructor() {
    super();
    pubsub.subscribe("once", fn => {
      console.log("sss");
    });
  }

  static get styles() {
    return [
      css`
        ${unsafeCSS(style)}
        .card {
          margin: 10px;
        }
        .card-header {
          font-size: 1.25em;
          font-weight: 500;
        }
        .col-form-label {
          font-weight: 600;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          User
        </div>
        <form class="card-body">
          <div class="alert alert-success" role="alert">
            This is a success alert—check it out!
          </div>
          <!-- <div class="alert alert-success" role="alert">
            This is a success alert—check it out!
          </div>
          <div class="alert alert-danger" role="alert">
            This is a danger alert—check it out!
          </div> -->
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="age" class="col-sm-2 col-form-label">Age</label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="age"
                placeholder="Enter your age"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="salary" class="col-sm-2 col-form-label">Salary</label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="salary"
                placeholder="Enter your salary"
              />
            </div>
          </div>
          <div class="form-group text-right">
            <button type="submit" class="btn btn-primary">Add</button>
            <button type="submit" class="btn btn-warning text-white">
              Reset Form
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
