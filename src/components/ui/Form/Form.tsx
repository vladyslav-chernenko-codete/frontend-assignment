import { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { IJoke } from "@/models/Joke";

interface FormProps {
  formik: FormikProps<IJoke>;
  handleDelete?: () => void;
}

const Form: FC<FormProps> = ({ formik, handleDelete }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        margin="0 auto"
        width="400px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TextField
          sx={{ width: "400px", mb: 2 }}
          id="Title"
          name="Title"
          label="Title"
          value={formik.values.Title}
          onChange={formik.handleChange}
          error={formik.touched.Title && Boolean(formik.errors.Title)}
          helperText={formik.touched.Title && formik.errors.Title}
        />
        <TextField
          sx={{ width: "400px", mb: 2 }}
          multiline
          maxRows={4}
          id="Body"
          name="Body"
          label="Body"
          value={formik.values.Body}
          onChange={formik.handleChange}
          error={formik.touched.Body && Boolean(formik.errors.Body)}
          helperText={formik.touched.Body && formik.errors.Body}
        />
        <TextField
          sx={{ width: "400px", mb: 2 }}
          id="Author"
          name="Author"
          label="Author"
          value={formik.values.Author}
          onChange={formik.handleChange}
          error={formik.touched.Author && Boolean(formik.errors.Author)}
          helperText={formik.touched.Author && formik.errors.Author}
        />
        <TextField
          sx={{ width: "400px", mb: 2 }}
          id="Views"
          name="Views"
          label="Views"
          value={formik.values.Views}
          onChange={formik.handleChange}
          error={formik.touched.Views && Boolean(formik.errors.Views)}
          helperText={formik.touched.Views && formik.errors.Views}
        />
        <TextField
          sx={{ width: "400px", mb: 2 }}
          id="CreatedAt"
          name="CreatedAt"
          label="Created Date"
          type="date"
          value={formik.values.CreatedAt}
          onChange={formik.handleChange}
          error={formik.touched.CreatedAt && Boolean(formik.errors.CreatedAt)}
          helperText={formik.touched.CreatedAt && formik.errors.CreatedAt}
        />
        <Box width="100%" display="flex" justifyContent="space-around">
          <Button
            color="secondary"
            variant="contained"
            type="cancel"
            onClick={formik.handleReset}
          >
            Cancel
          </Button>
          {handleDelete && (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Form;
