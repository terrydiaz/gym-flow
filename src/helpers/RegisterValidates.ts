import * as Yup from 'yup';

export const RegisterValidates = Yup.object().shape({
  nameAndLastName: Yup.string()
    .matches(/^\S+\s+\S+/, 'Debes ingresar nombre y apellido')
    .required('Campo requerido'),

  email: Yup.string().email('Correo inválido').required('Campo requerido'),

  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener una mayúscula')
    .matches(/[a-z]/, 'Debe contener una minúscula')
    .matches(/[!@#$%^&*]/, 'Debe contener un carácter especial')
    .required('Campo requerido'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Campo requerido'),

  phone: Yup.string()
    .matches(/^\+\d{12}$/, 'Debe comenzar con "+" y tener 13 dígitos en total')
    .required('Campo requerido'),

  address: Yup.string().required('Campo requerido'),

  birthdate: Yup.date()
    .nullable()
    .required('Campo requerido')
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 12)),
      'Debes ser mayor de 12 años'
    ),

  // nDni: Yup.string()
  //   .matches(/^\d+$/, 'Solo se permiten números')
  //   .min(7, 'Debe tener al menos 7 caracteres')
  //   .required('Campo requerido'),
});

export default RegisterValidates;
