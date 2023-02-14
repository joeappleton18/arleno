import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { FormButton } from "../Buttons/index";
import { useForm } from "react-hook-form";
import { useStores } from "../../stores/";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  form: { marginTop: theme.spacing(3) },
  error: { fontSize: 15, textAlign: "left" },
}));

const Form = (props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const userStore = useStores().user;
  const { register, handleSubmit, watch, errors, reset } = useForm({
    defaultValues: userStore.user,
  });

  /**
   * attempt to rehydrate the form
   */

  useEffect(() => {
    reset(userStore.user);
  }, [userStore.user]);

  const handleFormSubmit = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid spacing={3} container display="flex" justify="center">
        <Grid item xs={6}>
          <TextField
            fullWidth
            error={errors.firstName}
            name="firstName"
            className={classes.form}
            id="filled-required"
            label="First Name *"
            defaultValue=""
            variant="filled"
            inputRef={register({ required: true })}
          />
          {errors.firstName && (
            <Typography className={classes.error} color="error">
               First Name Is Required
            </Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            error={errors.lastName}
            name="lastName"
            className={classes.form}
            id="filled-required"
            label="Last Name *"
            defaultValue=""
            variant="filled"
            inputRef={register({ required: true })}
          />

          {errors.lastName && (
            <Typography className={classes.error} color="error">
               Last Name Is Required
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors.email}
            fullWidth
            name="email"
            className={classes.form}
            type="email"
            id="filled-required"
            label="Email *"
            defaultValue=""
            variant="filled"
            inputRef={register({ required: true, pattern: /^\S+@\S+$/i})}
          />

          {errors.email && (
            <Typography className={classes.error} color="error">
                You Must Enter a Valid Email
            </Typography>
          )}
        </Grid>

        <FormButton text="All Done!" type="submit" />
      </Grid>
    </form>
  );
};

export default Form;
