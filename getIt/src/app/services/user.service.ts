import { Injectable } from "@angular/core";
import { LoginSuccess } from "src/app/models/login.model";

@Injectable({
  providedIn: "root",
})

/**
 * This is the StorageService class.
 */
export class UserService {
  constructor() {}

  /**
   * This method sets a current object
   */
  public setCurrentUser(obj: any, key: string): void {
    const CURRENT_OBJ = JSON.stringify(obj);
    localStorage.setItem(key, CURRENT_OBJ);
  }

  /**
   * This method gets a current object
   */
  public getCurrentUser(key: string): any {
    const CURRENT_OBJ = localStorage.getItem(key);
    if ((CURRENT_OBJ !== null) || (CURRENT_OBJ !== undefined)) {
      const OBJ = JSON.parse(CURRENT_OBJ);
      return OBJ;
    }
    return undefined;
  }

  /**
   * This method removes a current object
   */
  public removeCurrentUser(key: string): void {
    localStorage.removeItem(key);
  }
}
