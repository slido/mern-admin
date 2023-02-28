import React, { ReactElement, FC, useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../../api/api";
import "./ask.scss";
interface FormValues {
  inputData: string;
}

const Ask: FC = () => {
  const validationSchema = Yup.object().shape({
    inputData: Yup.string().required("inputData is required"),
  });

  const [loadedResponse, setLoadedResponse] = useState();

  return (
    <div className="newBlogForm">
      <div className="top">
        <h1>Ask a question</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <Formik
            initialValues={{ inputData: "" }}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues) => {
              const url = "/ai/example";

              const postData = {
                content: values.inputData,
              };

              try {
                post(url, postData).then((response) => {
                  setLoadedResponse(response.data.output);
                });
              } catch {
                console.log("error");
              }
            }}
          >
            {() => (
              <Form>
                <div className="formInput" key={12}>
                  <h2>Question</h2>

                  <Field
                    className="inputForm"
                    as={TextField}
                    type="text"
                    name="inputData"
                    placeholder="Enter a title of a blog posst"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows="4"
                  />
                  <ErrorMessage name="name" component="div" />
                </div>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="right">
          <h2>Results</h2>
          <p> {loadedResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default Ask;
