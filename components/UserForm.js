import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Field, Form } from "react-final-form";

const UserForm = ({ onSubmit, isLoading, initialValues = undefined }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          render={({ input }) => (
            <TextField
              {...input}
              label="name"
              required
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />
        <LoadingButton loading={isLoading} variant="outlined" type="submit">
          save
        </LoadingButton>
      </form>
    )}
  />
);

export default UserForm;
