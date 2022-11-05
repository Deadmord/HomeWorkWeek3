import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import AuthenticationController from "./authentication.controller";

export class AuthenticationRoutes extends RouteConfig {

  constructor(app: Application) {
    super(app, "AuthenticationRoutes")
  }

  public configureRoutes() {
    this.app.route(`/auth/login`).post([AuthenticationController.login]);
    this.app.route(`/auth/logtest`).get([AuthenticationController.loginTest]);
    return this.app
  }
}