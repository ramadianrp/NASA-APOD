const errHandler = (err, req, res, next) => {
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
      case "SequelizeValidationError":
        res.status(400).json({ message: err.errors[0].message });
        break;
  
      case "EmailIsEmpty":
        res.status(400).json({ message: "Email cannot be Empty" });
        break;
  
      case "PasswordIsEmpty":
        res.status(400).json({ message: "Password cannot be Empty" });
        break;
  
      case "InvalidLogin":
        res.status(401).json({ message: "Invalid Email/Password" });
        break;
  
      case "InvalidToken":
        res.status(401).json({ message: "Invalid Token" });
        break;
  
      case "JsonWebTokenError":
        res.status(401).json({ message: "Invalid Token" });
        break;
  
      case "Forbidden":
        res.status(403).json({ message: "Forbidden" });
        break;
  
      case "NotFound":
        res.status(404).json({ message: "Data Not Found" });
        break;
  
      case "ImageIsRequired":
        res.status(401).json({ message: "Image Not Found" });
        break;
  
      default:
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  };
  
  module.exports = errHandler;
  