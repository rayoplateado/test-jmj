export interface AverageItemApi {
  date: string
  sum: number
  count: number
}

export interface AverageApi {
  data: AverageItemApi[]
}
