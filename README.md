
##Signup Route

url:
https://winter2022-comp307-group8.cs.mcgill.ca/signup

@params: {
    studentID: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

@return: {
    uuid: string,
    studentID: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token: string
}

Succesful signup: status = 200
Bad signup: any other status

##Login Route

url:
https://winter2022-comp307-group8.cs.mcgill.ca/login

```typescript
@params: {
    email: string,
    password: string,
}


@return {
    uuid: string,
    studentID: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token: string
}
```

Succesful signup: status = 200
Bad signup: any other status