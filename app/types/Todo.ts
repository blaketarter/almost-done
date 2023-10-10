export interface Todo {
  id: string
  isComplete: boolean
  text: string
  createdAt: string
  dueAt?: string
  listId?: string
}
