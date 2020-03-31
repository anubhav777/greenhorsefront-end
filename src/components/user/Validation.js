import * as Yup from 'yup'

const ValidationSchema = Yup.object().shape({

    email:Yup.string()
    .email("please provide valid email")
    .required("please enter your email"),

    password:Yup.string()
    .required("please enter a password")
    .matches(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/,
    "Must Contain 8 Characters,should start with alphabet and contain One Number and One special case Character"),

   
    
})

export default ValidationSchema;