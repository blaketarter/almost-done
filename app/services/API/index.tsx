import { Todo } from "@/app/types/Todo"
import { QueryFunctionContext } from "@tanstack/react-query"
import { ProductionAPIServiceAdapter } from "./adapters/production"
import { TestAPIServiceAdapter } from "./adapters/test"

export interface APIServiceAdapter {
  getTodos(list: string): Promise<Todo[]>
  createTodo(variables: { list?: string; body: Partial<Todo> }): Promise<Todo>
  updateTodo(variables: { list?: string; body: Partial<Todo> }): Promise<Todo>
  getLists(list: string): Promise<string[]>
}

export class APIService {
  adapater: APIServiceAdapter

  constructor(adapater: APIServiceAdapter) {
    this.adapater = adapater

    this.getTodos = this.getTodos.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.getLists = this.getLists.bind(this)
  }

  getTodos(context: QueryFunctionContext) {
    const list =
      (context.queryKey[context.queryKey.length - 1] as string) ?? "all"

    return this.adapater.getTodos(list)
  }

  createTodo(variables: { list?: string; body: Partial<Todo> }) {
    return this.adapater.createTodo(variables)
  }

  updateTodo(variables: { list?: string; body: Partial<Todo> }) {
    return this.adapater.updateTodo(variables)
  }

  getLists(context: QueryFunctionContext) {
    const list =
      (context.queryKey[context.queryKey.length - 1] as string) ?? "all"

    return this.adapater.getLists(list)
  }
}

export const productionAPIService = new APIService(ProductionAPIServiceAdapter)
export const testAPIService = new APIService(TestAPIServiceAdapter)

export function getAPIService(env: process.env.NEXT_PUBLIC_ENV) {
  switch (env) {
    case "production":
      return productionAPIService
    case "development":
      return productionAPIService
    case "test":
      return testAPIService
    default:
      return testAPIService
  }
}

const apiService = getAPIService(process.env.NEXT_PUBLIC_ENV)
export default apiService
