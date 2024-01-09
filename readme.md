
# validator-helper

>The `validator-helper` is a lightweight JavaScript library designed to simplify data interaction and validation. It streamlines the validation processes and provides essential helper functions to enhance efficiency in your projects.

```bash
npm i validator-helper
``` 
### OR

```bash
npm i @krishnapawar/validator-helper
```

## Usage
This package provides a lightweight JavaScript library for validating your JavaScript projects. It can be utilized in Node.js projects, as well as Vue.js and React.js projects, by installing it and incorporating a simple middleware.

### `validator-helper` All methods.
```JavaScript
const {
    validater,
    isObject,
    isNotObject,
    isNotEmpty,
    isEmpty
} = require("validator-helper");
```

#### validater Method:
*Simple validation example*
```JavaScript
    const valid = validater(req,{
        name:"required",
        date:"required",
        email:"required",
        mobile:"required"
    });

  if(valid){
    return res.json(valid);
  }
  //output you get
  {
      "status_code": "400",
      "status": false,
      "message": "mobile is required!"
  }
```
**we can manuplate `status_code` , `status` and `message` as well**

*For Example*
###
```JavaScript
    const valid = validater(req,{
        name:"required",
        date:"required",
        email:"required",
        mobile:"required"
    },{
        statusCode:404,
        status: "error",
        message:{
          name:'User name is required',
          date:'Invalid O black date field',
        }
    });
  //output you get
  {
      "status_code": "404",
      "status": "error",
      "message": "User name is required"
  }
```

**we can gat all error in single array by using `errors:true`**

*For Example*
###
```JavaScript
    const valid = validater(req,{
        name:"required",
        date:"required",
        email:"required",
        mobile:"required"
    },{
        errors:true,
        message:{
          name:'User name is required',
          date:'Invalid date field',
        }
    });
  //output you get like this
  [
    "User name is required",
    "Invalid date field",
    "email is required!",
    "mobile is required!"
  ]
```
**we can set Minimum and Maximum length by using `min:1` and `min:10`**

*For Example*
###
```JavaScript
    const valid = validater(req,{
        name:"required",
        date:"required",
        email:"required",
        mobile:{
          require:true,
          min:10,
          max:12
        }
    },{
        errors:true,
        message:{
          name:'User name is required',
          date:'Invalid date field',
        }
    });
  //output you get like this
  [
    "User name is required",
    "Invalid date field",
    "email is required!",
    "mobile is required!"
  ]

  //OR
 
  [
    ...
    "Minimum Length 10."
  ]

  //OR

  [
    ...
    "Maximum Length 12."
  ]
```

**we can also manipulate thes message accourding to us like this**

*For Example*
###
```JavaScript
    const valid = validater(req,{
        name:"required",
        date:"required",
        email:"required",
        mobile:{
          require:true,
          min:10,
          max:12
        }
    },{
        errors:true,
        message:{
          name:'User name is required',
          date:'Invalid date field',
          mobile:{
            require:"Mobile NO is required",
            min:"Mobile No Minimum length 10 digit",
            max:"Mobile No Maximum length 12 digit"
          }
        }
    });
  //output you get like this
  [
    "User name is required",
    "Invalid date field",
    "email is required!",
    "Mobile NO is required"
  ]

  //OR
 
  [
    ...
    "obile No Minimum length 10 digit"
  ]

  //OR

  [
    ...
    "Mobile No Maximum length 12 digit"
  ]
```
## More Examples

**Email validate**

*For Example*
###

```JavaScript
    const valid = validater(req,{
        description:{
          required:true,
          email:true
        }
    });
```
**Mobile No or Phone validation**

*For Example*
###
```JavaScript
    const valid = validater(req,{
        mobile:{
        phone:true,
      },
    });
```
**Data type validation**

*For Example*
###
###
```JavaScript
    const valid = validater(req,{
        mobile:{
        phone:true,
        type:"number"
      },
    });

    //OR 
    const valid = validater(req,{
        mobile:{
        phone:true,
        type:"string"
      },
    });

  //like we can use 
```

**Date validation**

*For Example*
###
###
```JavaScript
    const valid = validater(req,{
        dob:{
          required:true
          date:true
        }
    });
```
**Custome validate by regex**

*For Example*
###
```JavaScript
    const valid = validater(req,{
        description:{
          required:true,
          regex:/^.{25}$/
        }
    });
```

## Features

- **Required Field Validation:** Ensure mandatory fields are filled.
- **Email Validation:** Verify the correctness of email formats.
- **Phone Number Validation:** Validate and format phone numbers.
- **Min/Max Length or Digit Validation:** Define minimum and maximum length or digit constraints.
- **Data Type Validation:** Check if data types meet specified criteria.
- **Custom Validation with Regex:** Create custom validation using regular expressions.
- **Date Validation:** Validate dates, ensuring they meet specified criteria (e.g., format, range).
- **Additional Methods:**
  - `isObject`: Check if a variable is an object.
  - `isNotObject`: Verify if a variable is not an object.
  - `isNotEmpty`: Confirm that a variable is not empty.
  - `isEmpty`: Check if a variable is empty.

## License
This software is released under the MIT License.
[MIT](https://choosealicense.com/licenses/mit/)

# My Social Media Profiles

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=LinkedIn&logoColor=white)](https://in.linkedin.com/in/krishna-pawar-6250ab180)

[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?&style=flat-square&logo=GitHub&logoColor=white)](https://github.com/krishnapawar)

[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?&style=flat-square&logo=Instagram&logoColor=white)](https://www.instagram.com/krishna_p_15)

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?&style=flat-square&logo=Twitter&logoColor=white)](https://twitter.com/YourTwitterHandle)
