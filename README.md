
<h1>Signup Route</h1>

POST:
https://winter2022-comp307-group8.cs.mcgill.ca/signup

```typescript
//@params
const req.body = {
    studentID: string
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

// @return
const studentReturnData = {
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

<h2>Login Route</h2>
POST:
https://winter2022-comp307-group8.cs.mcgill.ca/login

```typescript
//@params
const req.body = {
    email: string,
    password: string,
}

// @return
const return_data = {
    uuid: string,
    studentID: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token: string
}
```

Succesful signup: status = 200
Bad signup: any other status

<h2>Add Prof Route</h2>
POST:
https://winter2022-comp307-group8.cs.mcgill.ca/prof/add

```typescript
//@params
const req.body = {
    email: string,
    faculty: string,
    department: string
}

// @return
const return_data = {
    email: string,
    faculty: string,
    department: string   
}
```
Succesful signup: status = 200
Bad signup: any other status

<h2>Delete Prof Route</h2>
DELETE: (put email at end of url)
https://winter2022-comp307-group8.cs.mcgill.ca/prof/delete/:email

```typescript
//@params
const req.body = {
    email: string
}

// @return
const return_data = {
    email: string,
    faculty: string,
    department: string   
}
```
Succesful signup: status = 200
Bad signup: any other status

<h2>Get All Profs</h2>
GET:
https://winter2022-comp307-group8.cs.mcgill.ca/prof/all

```typescript
//@params
const req.body = {
    
}

// @return
const return_data = {
    // Returns list of type Professor
    profs: Professor[{
        uuid: string,
        firstName: string,
        lastName: string,
        email: string,
        faculty: string,
        department: string

    }]
}
```
Succesful signup: status = 200
Bad signup: any other status

