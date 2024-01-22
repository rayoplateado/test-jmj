import axios, {type AxiosInstance} from 'axios'

export class ApiService {
  public client: AxiosInstance

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    })
  }

  public async get<TParams, TModel>({
    endpoint,
    params,
    headers,
  }: {
    endpoint: string
    params?: TParams
    headers?: Record<string, string>
  }): Promise<TModel> {
    const response = await this.client.get<TModel>(endpoint, {
      params,
      headers,
    })

    return response.data
  }

  public async post<TBody, TModel>({
    endpoint,
    headers,
    body = null,
  }: {
    endpoint: string
    headers?: Record<string, string>
    body?: TBody | null
  }): Promise<TModel> {
    const response = await this.client.post<TModel>(endpoint, body, {
      headers,
    })

    return response.data
  }
}
