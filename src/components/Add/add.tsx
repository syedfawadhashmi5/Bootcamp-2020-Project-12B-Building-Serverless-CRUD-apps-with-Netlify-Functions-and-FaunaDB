import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Grid, Button } from "@material-ui/core";
import Styles from './add.module.css';


type initialValueTye = {
  name: string;
  number: string;
};

const initialValue: initialValueTye = {
  name: "",
  number: "",
};

type Props = {
  setAddContact: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = Yup.object({
  name: Yup.string().optional(),
  number: Yup.string().required("Number is required"),
});

const AddContact: FC<Props> = ({ setAddContact }) => {
  return (
    <div className="Form">
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={(values: initialValueTye, onSubmitProps: any) => {
          fetch(`/.netlify/functions/create`, {
            method: "post",
            body: JSON.stringify({ name: values.name, number: values.number }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Contact created successfully", data);
              setAddContact((val) => !val);
              onSubmitProps.resetForm();
            })
            .catch((e) => {
              console.log("Failed to create this contact");
              console.log("Error : ", e);
            });
        }}
      >
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Form className="TextInput">
            <div className={Styles.input_div}>
            <Grid item md={4} sm={6} xs={10}>
              <Field
                as={TextField}
                name="name"
                variant="outlined"
                label="Name"
                helperText={<ErrorMessage name="name"  />}
                fullWidth
              />
            </Grid>
            <Grid item md={4} sm={6} xs={10}>
              <Field
                as={TextField}
                name="number"
                variant="outlined"
                label="Number"
                helperText={
                  <ErrorMessage name="number"  />
                }
                fullWidth
              />
            </Grid>
            </div>
            <div className={Styles.btn_div}>
            <Grid item md={6} sm={6} xs={10}>
              <Button variant="contained" color="secondary" type="submit" >
                ADD
              </Button>
            </Grid>
            </div>
          </Form>
        </Grid>
      </Formik>
    </div>
  );
};

export default AddContact;
