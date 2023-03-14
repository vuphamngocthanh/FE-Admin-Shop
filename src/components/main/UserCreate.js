

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateForm from "../common/UserCreateForm";


function UserCreate() {

  return (
    <div style={{marginTop: 0}}> 
      <CreateForm />
    </div>
  );
}

export default UserCreate;