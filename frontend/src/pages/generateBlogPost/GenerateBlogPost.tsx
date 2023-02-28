import { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../../api/api";
import "./generateBlogPost.scss";
interface FormValues {
  inputData: string;
}

const GenerateBlogPost: FC = () => {
  const validationSchema = Yup.object().shape({
    inputData: Yup.string().required("inputData is required"),
  });

  const [loadedResponse, setLoadedResponse] = useState();

  return (
    <div className="newBlogForm">
      <div className="top">
        <h1>Generate Blog Post</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <Formik
            initialValues={{ inputData: "" }}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues) => {
              const url = "/ai/writing/intro";

              const postData = {
                title: "Blog Post",
                audience: "travelers, bloggers",
                desc: values.inputData,
                currentPrompt: values.inputData,
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
                  <h2>Title</h2>

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

export default GenerateBlogPost;
