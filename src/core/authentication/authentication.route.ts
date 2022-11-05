import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import AuthenticationController from "./authentication.controller";

export class AuthenticationRoutes extends RouteConfig {

  constructor(app: Application) {
    super(app, "AuthenticationRoutes", "/auth")
  }

  public configureRoutes() {
    this.app.route(`${this.baseUrl}/login`).post([AuthenticationController.login]);
    this.app.route(`${this.baseUrl}/logtest`).get([AuthenticationController.loginTest]);
    return this.app
  }
}