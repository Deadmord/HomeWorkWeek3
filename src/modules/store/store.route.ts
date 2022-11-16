import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import StoreController from "./store.controller";
import AuthMiddleware from "../../core/middleware/auth.middleware";
import { Role } from "../../enums";

export class StoreRoutes extends RouteConfig {

  constructor(app: Application) {
    super(app, "StoreRoutes", "/general")
  }

  public configureRoutes() {
    //Stores
    //this.app.route(`/general/stores`)       .get([AuthMiddleware.verifyToken1, StoreController.getStores]);
    //this.app.route(`/general/stores`)       .get([AuthMiddleware.verifyToken2, StoreController.getStores]);
    this.app.route(`${this.baseUrl}/stores`)          .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.getStores]);
    this.app.route(`${this.baseUrl}/store/:id`)       .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.getStoreById]);
    this.app.route(`${this.baseUrl}/storeTitle/:title`).get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.getStoreByTitle]);
    this.app.route(`${this.baseUrl}/store/:id`)       .put([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.updateStoreById]);
    this.app.route(`${this.baseUrl}/store`)           .post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.addStore]);
    this.app.route(`${this.baseUrl}/store-sp`)        .post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.addStoreByStoredProcedure]);
    this.app.route(`${this.baseUrl}/store-sp-output`) .post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.addStoreByStoredProcedureOutput]);
    this.app.route(`${this.baseUrl}/store/:id`)       .delete([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.deleteStoreById]);
    //Products
    this.app.route(`${this.baseUrl}/products`)        .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.getProducts]);
    this.app.route(`${this.baseUrl}/product/:id`)     .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), StoreController.getProduct]);
    //Status
    this.app.route(`${this.baseUrl}/status/:id`)      .get([AuthMiddleware.verifyToken([Role.Manager, Role.RegularUser]),       StoreController.getStatusById]);
    return this.app
  }
}