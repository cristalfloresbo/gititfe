import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filtro",
})
export class FiltroPipe implements PipeTransform {
  public transform(values: any[], param: any, field: string): any[] {
    switch (typeof param) {
      case "string":
        if (param === "") {
          return [];
        }
        return values.filter((value) => {
          return value[field].toLowerCase().includes(param.toLowerCase());
        });
      case "number":
        if (param <= 0) {
          return [];
        }
        return values.filter((value) => {
          return value[field] === param;
        });
    }
  }
}
