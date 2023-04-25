import * as yup from "yup";

export const validationSchema = yup.object({
  Title: yup.string().required("Title field is required"),
  Body: yup.string().required("Body field is required"),
  Author: yup.string().required("Author field is required"),
  Views: yup.number().required("Views field is required"),
  CreatedAt: yup.date().required("CreatedAt field is required"),
});
