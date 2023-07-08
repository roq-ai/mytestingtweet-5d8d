import * as yup from 'yup';

export const mediaValidationSchema = yup.object().shape({
  type: yup.string().required(),
  url: yup.string().required(),
  tweet_id: yup.string().nullable().required(),
});
