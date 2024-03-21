# Individual Project

# Endpoints

_Authentication_

- **POST /login**
- **POST /add-user**

_Asset_

- **GET /asset**
- **POST /asset**
- **PUT /asset/:id**
- **DELETE /asset/:id**

---

# POST /login

_Information_

This endpoint is used for user authentication, providing an access token upon successful login.

> ### **Request**

- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "message": "login success",
  "token": "string"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Email is required"
}
"OR"
{
  "message": "Password is required"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

---

# POST /add-user

_Information_

This endpoint is used to register a new user.

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`



- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string",
}
```

Response: (201 - Created)

```json
{
  "newUser": {
    "email": "string",
    "role": "string"
  }
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Username cannot be empty"
}
```

```json
{
  "message": "Email cannot be empty"
}
"OR"
{
  "message": "Must be an email format"
}
"OR"
{
  "message": "Email already registered"
}
```

```json
{
  "message": "Password cannot be empty"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

---

# GET /asset

_Information_

This endpoint retrieves asset list

> ### **Request**

- **Header:**
  - `Authentication`

## Response

Response: (200 - OK)

```json
{
    {
      "id": "number",
      "name": "string",
      "desc": "string",
      "dateFound": "string",
      "userId": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
}
```

---

# POST /asset

_Information_

This endpoint post asset

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (201 - OK)

```json
{
    {
      "id": "number",
      "name": "string",
      "desc": "string",
      "dateFound": "string",
      "userId": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
}
```

---

# PUT /asset/:id

_Information_

This endpoint update asset

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Response

Response: (200 - OK)

```json
{
    {
      "id": "number",
      "name": "string",
      "desc": "string",
      "dateFound": "string",
      "userId": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
}
```

---

# DELETE /asset/:id

_Information:_

- To delete asset by id

> ### **Request**

- **Header:**
  - `Authentication`
  - `Authorization`

## Responses

Response: (200 - OK)

```json
{
  "message": "Asset deleted"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "Forbidden"
}
```

---

