/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);
var image;
var localStorage;
function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  //   document.getElementById("deviceready").classList.add("ready");
  localStorage = window.localStorage;
  document
    .getElementById("cameraTakePicture")
    .addEventListener("click", cameraTakePicture);
  document.getElementById("saveButton").addEventListener("click", saveImage);

  setItemsDisplay();
}

function setItemsDisplay() {
  let text = "";
  for (let i = 0; i < localStorage.length; i++) {
    let remark = localStorage.key(i);
    console.log(remark);
    text =
      text +
      "<div><img src=" +
      localStorage.getItem(remark) +
      " style='height:50px; width:50px'> " +
      remark +
      "</div>";
  }
  document.getElementById("itemListId").innerHTML=(text);
}

function saveImage() {
  let remark = document.getElementById("myInput").value;
  console.log("saving ========" + remark);

  localStorage.setItem(remark, image.src);
  setItemsDisplay();
  modal.style.display = "none";
}

function cameraTakePicture() {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  });

  function onSuccess(imageData) {
    image = document.getElementById("myImage");
    image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(message) {
    alert("Failed because: " + message);
  }
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
