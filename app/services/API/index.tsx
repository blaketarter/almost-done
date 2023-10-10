import { Todo } from "@/app/types/Todo"
import { QueryFunctionContext } from "@tanstack/react-query"
// import { ProductionAPIServiceAdapter } from "./adapters/production"
import { TestAPIServiceAdapter } from "./adapters/test"
import { List } from "@/app/types/List"
import { ProductionAPIServiceAdapter } from "./adapters/_production"
import { DevAPIServiceAdapter } from "./adapters/dev"

export interface APIServiceAdapter {
  getTodos(list: string): Promise<Todo[]>
  createTodo(variables: {
    listName?: string
    body: Partial<Todo>
  }): Promise<Todo>
  updateTodo(variables: { body: Partial<Todo> }): Promise<Todo>
  deleteTodo(variables: { id: string }): Promise<Todo>
  getLists(list: string): Promise<List[]>
  createList(variables: { body: Partial<List> }): Promise<List>
  updateList(variables: { body: Partial<List> }): Promise<List>
  deleteList(variables: { id: string }): Promise<List>
}

export class APIService {
  adapater: APIServiceAdapter

  constructor(adapater: APIServiceAdapter) {
    this.adapater = adapater

    this.getTodos = this.getTodos.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.getLists = this.getLists.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.createList = this.createList.bind(this)
    this.updateList = this.updateList.bind(this)
    this.deleteList = this.deleteList.bind(this)
  }

  getTodos(context: QueryFunctionContext) {
    const list =
      (context.queryKey[context.queryKey.length - 1] as string) ?? "all"

    return this.adapater.getTodos(list)
  }

  createTodo(variables: { listName?: string; body: Partial<Todo> }) {
    return this.adapater.createTodo(variables)
  }

  updateTodo(variables: { body: Partial<Todo> }) {
    return this.adapater.updateTodo(variables)
  }

  getLists(context: QueryFunctionContext) {
    const list =
      (context.queryKey[context.queryKey.length - 1] as string) ?? "all"

    return this.adapater.getLists(list)
  }

  deleteTodo(variables: { id: string }) {
    return this.adapater.deleteTodo(variables)
  }

  createList(variables: { body: Partial<List> }) {
    return this.adapater.createList(variables)
  }

  updateList(variables: { body: Partial<List> }) {
    return this.adapater.updateList(variables)
  }

  deleteList(variables: { id: string }) {
    return this.adapater.deleteList(variables)
  }
}

// export const productionAPIService = new APIService(ProductionAPIServiceAdapter)
export const devAPIService = new APIService(DevAPIServiceAdapter)
export const testAPIService = new APIService(TestAPIServiceAdapter)

export function getAPIService(env = process.env.NEXT_PUBLIC_ENV) {
  switch (env) {
    case "production":
      return testAPIService
    case "development":
      return devAPIService
    case "test":
      return testAPIService
    default:
      return testAPIService
  }
}

const apiService = getAPIService(process.env.NEXT_PUBLIC_ENV)
export default apiService
