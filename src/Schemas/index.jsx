import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const adminSchema = Yup.object({
  title: Yup.string()
    .min(2, "must have 2 word")
    .max(15, "max have 15 word")
    .required("Enter a Title"),
  email: Yup.string().email().required("Enter a Valid Email"),
  phoneNo: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, " must contain 10 words")
    .max(10, " can contain 10 words"),
  description: Yup.string()
    .min(15, "must contain 15 words")
    .max(200, "max contain 200 words")
    .required("Enter Description"),
  company: Yup.string()
    .min(2, "must have 2 word")
    .max(35, "max have 35 word")
    .required("Enter a Company"),
});

export const introSchema = Yup.object({
  name: Yup.string()
    .min(2, "must contain 2 words")
    .max(15, "max contain 15 words")
    .required("Enter Name"),
  profession: Yup.string()
    .min(2, "must contain 2 words")
    .max(15, "max contain 15 words")
    .required("Enter Profession"),
  description: Yup.string()
    .min(15, "must contain 15 words")
    .max(200, "max contain 200 words")
    .required("Enter Description"),
  followers: Yup.number().min(1,"number should greater then 0").required("Enter Followers"),
  projects: Yup.number().min(1,"number should greater then 0").required("Enter Projects"),
  clients: Yup.number().min(1,"number should greater then 0").required("Enter Clients"),
  experience: Yup.number().min(1,"number should greater then 0").required("Enter Experience"),
});
