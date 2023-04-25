import { FC } from "react";
import Form from "@/components/ui/Form";
import { IJoke } from "@/models/Joke";
import { useFormik } from "formik";
import { validationSchema } from "@/components/ui/Form/schemas/jokeValidationSchema";
import { useRouter } from "next/router";
import { addJoke } from "@/services/jokeService";

const initialValues: IJoke = {
  Title: "",
  Body: "",
  Author: "",
  Views: 0,
  CreatedAt: Date.now(),
};

const AddForm: FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      addJoke(values)
        .then(() => router.push("/"))
        .catch((error) => console.error(error));
    },
    onReset: () => router.push("/"),
  });

  return <Form formik={formik} />;
};

export default AddForm;
