import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

/**
 * This is the StorageService class.
 */
export class StorageService {
  constructor() {}

  /**
   * This method sets a current object
   */
  public setCurrentObject(obj: any): void {
    const CURRENT_OBJ = JSON.stringify(obj);
    localStorage.setItem("data", CURRENT_OBJ);
  }

  /**
   * This method gets a current object
   */
  public getCurrentObject(): any {
    const CURRENT_OBJ = localStorage.getItem("data");
    if ((CURRENT_OBJ !== null) || (CURRENT_OBJ !== undefined)) {
      const OBJ = JSON.parse(CURRENT_OBJ);
      return OBJ;
    }
    return undefined;
  }

  /**
   * This method removes a current object
   */
  public removeCurrentObject(): void {
    localStorage.removeItem("data");
  }
}
