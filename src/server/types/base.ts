export type InputCountQuery = {
  search?: string
  id?: string
}

export type InputBaseQuery = InputCountQuery & {
  limit?: number
  page?: number
  orderColumn?: string
  orderBy?: 'ASC' | 'DESC'
}