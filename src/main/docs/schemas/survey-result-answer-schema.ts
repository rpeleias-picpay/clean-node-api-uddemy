export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    count: {
      type: 'integer'
    },
    percent: {
      type: 'double'
    },
    isCurrentAccountAnswer: {
      type: 'double'
    }
  },
  required: ['answer', 'count', 'percent', 'isCurrentAccountAnswer']
}
