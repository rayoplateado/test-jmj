import {HttpResponse, http} from 'msw'

export const MetricsHandlers = [
  http.post(`/api/v1/analytics/metrics`, () => {
    return HttpResponse.json({id: 1})
  }),
  http.get(`/api/v1/analytics/metrics-averages`, () => {
    return HttpResponse.json({
      data: [
        {
          date: '2024/01/19',
          sum: 200.0,
          count: 1,
        },
        {
          date: '2024/01/20',
          sum: 230.0,
          count: 2,
        },
      ],
    })
  }),
]
