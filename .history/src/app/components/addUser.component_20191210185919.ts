import { LitElement, html, customElement, css, unsafeCSS } from "lit-element";
const style = require("../../../node_modules/bootstrap/dist/css/bootstrap.css");

@customElement("add-user-component")
export class AddUserComponent extends LitElement {
  isUpdating: boolean = false;

  constructor() {
    super();
    this.initListners();
  }

  initListners() {
    window["PubSub"].subscribe(
      "updateUserRecord",
      (_eventName: string, dataObj: object) => this.addUserRecord(dataObj)
    );
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
            <button
              type="submit"
              class="btn btn-primary"
              @click="${!this.isUpdating
                ? this.addUserRecord
                : this.updateUserRecord}"
            >
              ${!this.isUpdating ? "Add" : "Update"}
            </button>
            <button
              type="submit"
              class="btn btn-warning text-white"
              @click="${this.resetForm}"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    `;
  }

  addUserRecord(event: any) {
    event.preventDefault();
    window["PubSub"].publish("addUserRecord", {
      name: "Mayur Bagad",
      age: 27,
      salary: 34000
    });
    window["PubSub"].subscribeOnce(
      "addUserRecordResponse",
      (_event, response) => {
        if (response.type === "success") {
          console.log("Success: " + response.message);
        }
        if (response.type === "error") {
          console.log("Error: " + response.message);
        }
      }
    );
  }

  updateUserRecord(event: any) {
    event.preventDefault();
    this.isUpdating = false;
  }

  resetForm(event: any) {
    event.preventDefault();
  }
}
