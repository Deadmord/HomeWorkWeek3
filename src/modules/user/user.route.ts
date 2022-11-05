import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import UserController from "./user.controller";
import AuthMiddleware from "../../core/middleware/auth.middleware";
import { Role } from "../../enums";

export class UserRoutes extends RouteConfig {

  constructor(app: Application) {
    super(app, "UserRoutes", "/user")
  }

  public configureRoutes() {
    this.app.route(`${this.baseUrl}/:id`)   .get([AuthMiddleware.verifyToken([Role.Administrator]), UserController.getById]);
    this.app.route(`${this.baseUrl}/:id`)   .put([AuthMiddleware.verifyToken([Role.Administrator]), UserController.updateById]);
    this.app.route(`${this.baseUrl}/`)      .post([AuthMiddleware.verifyToken([Role.Administrator]), UserController.add]);
    this.app.route(`${this.baseUrl}/:id`)   .delete([AuthMiddleware.verifyToken([Role.Administrator]), UserController.deleteById]);

    this.app.route(`${this.baseUrl}/spGetById/:id`)     .get([AuthMiddleware.verifyToken([Role.Administrator]), UserController.spGetById]);
    this.app.route(`${this.baseUrl}/spGetByStoreId/:id`).get([AuthMiddleware.verifyToken([Role.Administrator]), UserController.spGetByStoreId]);
    this.app.route(`${this.baseUrl}/spUpdateById/:id`)  .put([AuthMiddleware.verifyToken([Role.Administrator]), UserController.spUpdateById]);
    return this.app
  }
}