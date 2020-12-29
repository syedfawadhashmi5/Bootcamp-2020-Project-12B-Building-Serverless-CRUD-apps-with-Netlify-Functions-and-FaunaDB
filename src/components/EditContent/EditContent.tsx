import React, { FC } from "react";
import { Grid, TextField, Modal } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

type ContactData = {
  name: string;
  number: string;
  Ref: any;
};

type Props = {
  name: string;
  number: string;
  Ref: any;
  setAddContact: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = Yup.object({
  name: Yup.string().optional(),
  number: Yup.string().required("Number is required"),
});

const EditContent: FC<Props> = ({
  name,
  number,
  Ref,
  setAddContact,
  open,
  setOpen,
}) => {
  const initialValue: ContactData = {
    name: name,
    number: number,
    Ref: Ref,
  };

  const handleClose = () => {
    setOpen(false);
};
  
  return (
    <div className='main_div'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values, onSubmitProps: any) => {
            fetch(`/.netlify/functions/update`, {
              method: "post",
              body: JSON.stringify({
                name: values.name,
                number: values.number,
                id: Ref["@ref"].id,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Contact created successfully", data);
                setAddContact((val) => !val);
                onSubmitProps.resetForm();
                setOpen(false);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "A todo is update",
                  showConfirmButton: false,
                  timer: 1500,
                });
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
            // direction="column"
            // justify="center"
            // alignItems="center"
          >
            <Form>
              <Grid item xs={10}>
                <Field
                  defaultValue={name}
                  as={TextField}
                  name="name"
                  variant="outlined"
                  label="Name"
                  helperText={<ErrorMessage name="name" />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={10}>
                <Field
                  defaultValue={number}
                  as={TextField}
                  name="number"
                  variant="outlined"
                  label="Number"
                  helperText={<ErrorMessage name="number" />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" type="submit">
                  UPDATE
                </Button>
              </Grid>
            </Form>
          </Grid>
        </Formik>
      </Modal>
    </div>
  );
};

export default EditContent;
