import { FC } from "react";
import { useFormik } from "formik";
import Form from "@/components/ui/Form";
import { IJoke } from "@/models/Joke";
import { validationSchema } from "@/components/ui/Form/schemas/jokeValidationSchema";
import { useRouter } from "next/router";
import { deleteJoke, updateJoke } from "@/services/jokeService";

interface EditFormProps {
  data: IJoke;
}

const EditForm: FC<EditFormProps> = ({ data }) => {
  const router = useRouter();

  const { id, Title, Body, Author, Views, CreatedAt } = data;

  const initialValues: IJoke = {
    id,
    Title,
    Body,
    Author,
    Views,
    CreatedAt,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      updateJoke(values)
        .then(() => router.push("/"))
        .catch((error) => console.error(error));
    },
    onReset: () => router.push("/"),
  });

  const handleDelete = () => {
    data.id &&
      deleteJoke(data.id)
        .then(() => router.push("/"))
        .catch((error) => console.error(error));
  };

  return <Form formik={formik} handleDelete={handleDelete} />;
};

export default EditForm;
