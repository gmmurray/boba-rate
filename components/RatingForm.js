import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Field, Form } from "react-final-form";

const RatingForm = ({
  onSubmit,
  isLoading,
  userOptions = [],
  initialValues = {},
  selectedUser = undefined,
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      ...initialValues,
      userId: selectedUser ?? initialValues.userId,
    }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="userId"
          render={({ input }) => (
            <FormControl
              fullWidth
              disabled={Object.keys(initialValues).length > 0}
              sx={{ mb: 2 }}
            >
              <InputLabel>user</InputLabel>
              <Select {...input} required>
                {userOptions.map((uo) => (
                  <MenuItem key={uo.value} value={uo.value}>
                    {uo.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Field
          name="name"
          render={({ input }) => (
            <TextField
              {...input}
              required
              fullWidth
              label="name"
              sx={{ mb: 2 }}
            />
          )}
        />
        <Field
          name="boba"
          render={({ input }) => (
            <Fragment>
              <Typography component="legend">boba</Typography>
              <Rating
                {...input}
                defaultValue={0}
                precision={0.5}
                sx={{ mb: 2 }}
              />
            </Fragment>
          )}
        />
        <Field
          name="tea"
          render={({ input }) => (
            <Fragment>
              <Typography component="legend">tea</Typography>
              <Rating
                {...input}
                defaultValue={0}
                precision={0.5}
                sx={{ mb: 2 }}
              />
            </Fragment>
          )}
        />
        <FormGroup>
          <Field
            name="overall"
            render={({ input }) => (
              <Fragment>
                <Typography component="legend">overall</Typography>
                <Rating
                  {...input}
                  defaultValue={0}
                  precision={0.5}
                  sx={{ mb: 2 }}
                />
              </Fragment>
            )}
          />
        </FormGroup>
        <LoadingButton loading={isLoading} variant="outlined" type="submit">
          save
        </LoadingButton>
      </form>
    )}
  />
);

export default RatingForm;
