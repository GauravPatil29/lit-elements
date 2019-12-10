import { LitElement, html, customElement, css, unsafeCSS } from "lit-element";
const style = require("../../../node_modules/bootstrap/dist/css/bootstrap.css");

@customElement("add-user-component")
export class AddUserComponent extends LitElement {
  isUpdating: boolean = false;
  index: number = -1;
  userObj: any = {
    id: "",
    name: "",
    age: 0,
    salary: 0
  };

  constructor() {
    super();
    this.initListners();
  }

  initListners() {
    window["PubSub"].subscribe(
      "updateUserRecord",
      (_eventName: string, dataObj: object) => {
        this.isUpdating = true;
        this.userObj = dataObj;
        this.refreshView();
      }
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
                value="${this.userObj.name}"
                @change="${(e: any) => (this.userObj.name = e.target.value)}"
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
                value="${this.userObj.age}"
                @change="${(e: any) =>
                  (this.userObj.age = parseInt(e.target.value))}"
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
                value="${this.userObj.salary}"
                @change="${(e: any) =>
                  (this.userObj.salary = parseInt(e.target.value))}"
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
    window["PubSub"].publish("addUserRecord", this.userObj);
    window["PubSub"].subscribeOnce(
      "addUserRecordResponse",
      (_event, response) => {
        if (response.type === "success") {
          this.resetForm();
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
    window["PubSub"].publish("updateUserRecord", this.userObj);
    window["PubSub"].subscribeOnce(
      "updateUserRecordResponse",
      (_event, response) => {
        if (response.type === "success") {
          this.resetForm();
          console.log("Success: " + response.message);
        }
        if (response.type === "error") {
          console.log("Error: " + response.message);
        }
      }
    );
    this.isUpdating = false;
  }

  getInputElement(key: string): HTMLInputElement {
    return this.shadowRoot!.getElementById(key)! as HTMLInputElement;
  }

  refreshView() {
    this.getInputElement("name").value = this.userObj.name;
    this.getInputElement("age").value = this.userObj.age;
    this.getInputElement("salary").value = this.userObj.salary;
    this.requestUpdate();
  }

  resetForm(event?: any) {
    if (event) {
      event.preventDefault();
    }
    this.isUpdating = false;
    this.index = -1;
    this.userObj = {
      id: "",
      name: "",
      age: 0,
      salary: 0
    };
    this.refreshView();
  }
}
