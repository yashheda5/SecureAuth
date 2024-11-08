export const userRegistratrionFormControls = [
    {
      name: 'userName',
      label: 'User Name',
      placeholder: 'Enter your user name',
      ComponentType: 'input',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      ComponentType: 'input',
      type: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      ComponentType: 'input',
      type: 'password',
    },
  ];
  export const userLoginFormControls = [
    {
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      ComponentType: 'input',
      type: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      ComponentType: 'input',
      type: 'password',
    },
  ]
  export const intialSignUpFormData = {
    userName: '',
    email: '',
    password: '',
  };
  export const initialLoginFormData={
    email: '',
    password: '',
  }