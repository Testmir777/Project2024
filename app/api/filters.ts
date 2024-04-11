import { Filters } from "@/app/models";

export class FiltersApi {
  constructor(private baseURL: string = "http://localhost:8080") { }

  async fetchFilters(): Promise<Filters> {
    const respose = await fetch(`${this.baseURL}/filters`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    return respose.json();
  }
}
