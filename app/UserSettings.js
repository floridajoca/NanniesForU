"use strict";
import { db } from "../firebase.js";
import {doc, collection, getDocs, updateDoc} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

async function updateFields(userId) {
      const user = doc(db, "user", "b6bFxiYB17pYYm654skT");
      await updateDoc(user, {
            full_name: "James"
      }).then( () => {
            console.log("updated");
      });

      const getUser = collection(db, "user");
      await getDocs(getUser).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                  console.log( doc.id + "=>" +JSON.stringify(doc.data()));
            });
      });
}

function passwordChanged() {
      return true;
      console.log("password changed");
}

const update = document.querySelector("#btn-update");

update.addEventListener("click", () => {
      const userId = sessionStorage.getItem("UserID");
      updateFields(userId);
      passwordChanged()
});
