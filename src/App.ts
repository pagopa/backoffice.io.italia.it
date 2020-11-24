import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "./Main";
import './i18n';

export class App {
  private _appName: string = "Support Dashboard";

  constructor() {
    this.render();
  }

  public get appName(): string {
    return this._appName;
  }

  private render(): void {
    ReactDOM.render(
      React.createElement(Main, { app: this }),
      document.getElementById("app")
    );
  }
}

new App();
